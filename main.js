const fs = require("fs");
const find = require("./lib/find");
const bangou = require("./lib/bangou");

const util = require("./lib/util");

const levelup = require('levelup');
const leveldown = require('leveldown');

// 住所から緯度経度付き場所型を返す
module.exports = function(src) {

  const dst = typeof src === 'string' ? {
    "@context": "https://imi.go.jp/ns/core/context.jsonld",
    "@type": "場所型",
    "住所": {
      "@type": "住所型",
      "表記": src
    }
  } : JSON.parse(JSON.stringify(src));

  const targets = [];

  const dig = function(focus, parent) {
    if (Array.isArray(focus)) {
      focus.forEach(a => dig(a));
    } else if (typeof focus === 'object') {
      if (focus["@type"] === "住所型" && focus["表記"]) {
        targets.push(parent && parent["@type"] === "場所型" ? parent : focus);
      }
      Object.keys(focus).forEach(key => {
        dig(focus[key], focus);
      });
    }
  };

  dig(dst, null);

  if (targets.length === 0) {
    return Promise.resolve(dst);
  }

  const db = levelup(leveldown(__dirname + "/db"));
  const promises = targets.map(target => {
    const address = target["住所"] || target;
    const response = find(address["表記"]);

    if (!response) {
      util.put(target, "メタデータ", {
        "@type": "文書型",
        "説明": "該当する地名が見つかりません"
      });
      return Promise.resolve(target);
    }
    if (response.multipleChoice) {
      util.put(target, "メタデータ", {
        "@type": "文書型",
        "説明": "該当する地名が複数あります"
      });
      return Promise.resolve(target);
    }

    let code = response.code;
    if (response.expectedChome !== undefined) {
      let t = "" + response.expectedChome;
      while (t.length < 3) t = "0" + t;
      code = code + t;
    }

    return db.get(code, {
      asBuffer: false
    }).then(str => {
      let json = JSON.parse(str);

      if (code.length === 5) {
        const match = json["@graph"].filter(x => {
          if (address["表記"].indexOf(x["表記"]) === 0) {
            return true;
          } else if (x["区"] !== undefined) {
            if (address["表記"].indexOf(x["都道府県"] + x["市区町村"] + x["区"]) === 0) return true;
            if (address["表記"].indexOf(x["市区町村"] + x["区"]) === 0) return true;
            if (address["表記"].indexOf(x["区"]) === 0) return true;
          } else {
            if (address["表記"].indexOf(x["都道府県"] + x["市区町村"]) === 0) return true;
            if (address["表記"].indexOf(x["市区町村"]) === 0) return true;
          }
          return false;
        });

        const hit = match.length > 0;

        const latest = hit ? match.pop() : json["@graph"].pop();
        delete latest["表記"];
        let dates = latest["メタデータ"]["日付"];
        if (!Array.isArray(dates)) dates = [dates];

        if (latest["メタデータ"] && latest["メタデータ"]["参照"] === undefined && dates.length < 2) {
          delete latest["メタデータ"];
        }
        Object.keys(latest).forEach(key => {
          address[key] = latest[key];
        });


        if (response.tail.trim().length > 0) {
          if (code.match(/000$/)) {
            util.put(target, "メタデータ", {
              "@type": "文書型",
              "説明": "該当する市区町村名が見つかりません"
            });
          } else {
            util.put(target, "メタデータ", {
              "@type": "文書型",
              "説明": "該当する町名が見つかりません"
            });
          }
        }
        return true;
      }

      delete json["@context"];
      delete json["@id"];

      if (response.expectedChome !== undefined) {
        delete json["地理座標"];
        delete json["住所"]["丁目"];
        if (response.actualChome !== null)
          util.put(target, "メタデータ", {
            "@type": "文書型",
            "説明": "該当する丁目が見つかりません"
          });
      }

      if (target["@type"] === "場所型") {
        Object.keys(json).filter(key => key !== "住所").forEach(key => {
          util.put(target, key, json[key]);
        });
      }

      Object.keys(json["住所"]).filter(key => key !== "表記").forEach(key => {
        address[key] = json["住所"][key];
      });

      const tail = bangou(response.tail);
      Object.keys(tail).forEach(key => {
        address[key] = tail[key];
      });

      return true;
    }).catch(e => {
      util.put(target, "メタデータ", {
        "@type": "文書型",
        "説明": "地名コードに対応するインスタンスがありません"
      });
      return true;
    });
  });
  return Promise.all(promises).then(() => db.close()).then(() => dst);


};
