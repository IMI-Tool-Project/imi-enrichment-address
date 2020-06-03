const readline = require('readline');
const fs = require('fs');

const levelup = require('levelup');
const leveldown = require('leveldown');
const db = levelup(leveldown(__dirname + "/../db"));
const promises = [];

const chome = [
  "〇", "一", "二", "三", "四", "五", "六", "七", "八", "九",
  "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九",
  "二十", "二十一", "二十二", "二十三", "二十四", "二十五", "二十六", "二十七", "二十八", "二十九",
  "三十", "三十一", "三十二", "三十三", "三十四", "三十五", "三十六", "三十七", "三十八", "三十九",
  "四十", "四十一", "四十二", "四十三", "四十四", "四十五", "四十六", "四十七", "四十八", "四十九",
  "五十", "五十一", "五十二", "五十三", "五十四", "五十五", "五十六", "五十七", "五十八", "五十九",
  "六十", "六十一", "六十二", "六十三", "六十四", "六十五", "六十六", "六十七", "六十八", "六十九",
  "七十", "七十一", "七十二", "七十三", "七十四", "七十五", "七十六", "七十七", "七十八", "七十九",
  "八十", "八十一", "八十二", "八十三", "八十四", "八十五", "八十六", "八十七", "八十八", "八十九",
  "九十", "九十一", "九十二", "九十三", "九十四", "九十五", "九十六", "九十七", "九十八", "九十九"
];

const latests = {};

(function() {

  const map = {};

  // 基本情報の付与
  JSON.parse(fs.readFileSync(process.argv[2], "UTF-8")).results.bindings.forEach(e => {
    const f = {
      id: e.id.value,
      label: e.label.value,
      parent: [],
      children: [],
      next: [],
      prev: [],
      visible: !!(e.label.value.match(/[都道府県市区町村]$/)),
      code: e.id.value.replace("http://data.e-stat.go.jp/lod/sac/C", "").split("-")[0]
    };
    map[f.id] = f;
  });

  // 上下関係の接続
  JSON.parse(fs.readFileSync(process.argv[3], "UTF-8")).results.bindings.forEach(e => {
    const child = map[e.id.value];
    const parent = map[e.parent.value];
    if (child && parent) {
      if (child.parent.indexOf(parent) === -1) child.parent.push(parent);
      if (parent.children.indexOf(child) === -1) parent.children.push(child);
    } else {
      console.error("Invalid parent/child", e.id.value, e.parent.value);
    }
  });

  // 前後関係の接続
  JSON.parse(fs.readFileSync(process.argv[4], "UTF-8")).results.bindings.forEach(e => {
    const prev = map[e.id.value];
    const next = map[e.next.value];
    if (next && prev) {
      if (prev.next.indexOf(next) === -1) prev.next.push(next);
      if (next.prev.indexOf(prev) === -1) next.prev.push(prev);
    } else {
      console.error("Invalid prev/next", e.id.value, e.next.value);
    }
  });

  // 5桁コードごとにとりまとめる
  const code = {};
  Object.values(map).filter(e => e.visible).forEach(e => {
    if (code[e.code] === undefined) code[e.code] = [];
    code[e.code].push(e);
  });

  // 施行が古いものが先頭になるようにソート
  Object.keys(code).forEach(key => {
    code[key].sort((a, b) => a.id < b.id ? -1 : 1);
  });

  // 5桁コードごとにエンコード
  Object.keys(code).forEach(key => {

    let graph = code[key].map(e => {

      const id2date = (id) => `${id.substring(40,44)}-${id.substring(44,46)}-${id.substring(46,48)}`;

      const dig = function(e) {
        const a = [];
        if (e.next.length === 0) {
          a.push(e);
        } else {
          e.next.forEach(f => {
            dig(f).forEach(x => {
              if (a.indexOf(x) === -1) a.push(x);
            });
          });
        }
        return a;
      };

      const j = {
        "@type": "住所型",
        "表記": "",
        "都道府県": null,
        "都道府県コード": null,
        "市区町村": null,
        "区": null,
        "市区町村コード": null,
        "メタデータ": {
          "@type": "文書型",
          "日付": [{
            "@type": "日付型",
            "種別": "施行",
            "標準型日付": id2date(e.id)
          }, {
            "@type": "日付型",
            "種別": "廃止",
            "標準型日付": null
          }],
          "参照": {
            "@type": "参照型",
            "種別": "継承先市区町村コード",
            "参照先": []
          }
        }
      };

      if (e.next.length > 0) {
        const n = e.next[0];
        j["メタデータ"]["日付"][1]["標準型日付"] = id2date(n.id);
        dig(e).forEach(a => {
          if (a.code === e.code) return;
          const u = `http://data.e-stat.go.jp/lod/sac/C${a.code}`;
          if (j["メタデータ"]["参照"]["参照先"].indexOf(u) === -1)
            j["メタデータ"]["参照"]["参照先"].push(u);
        });
      }

      for (let f = e; f; f = f.parent ? f.parent[0] : null) {
        if (f.visible) {
          j["表記"] = f.label + j["表記"];
          if (f.label.match(/[都道府県]$/)) {
            j["都道府県"] = f.label;
            j["都道府県コード"] = `http://data.e-stat.go.jp/lod/sac/C${f.code}`;
          } else if (f.label.match(/区$/) && f.code.indexOf("131") !== 0) {
            j["区"] = f.label;
            j["市区町村コード"] = `http://data.e-stat.go.jp/lod/sac/C${f.code}`;
          } else {
            j["市区町村"] = f.label;
            if (j["市区町村コード"] === null)
              j["市区町村コード"] = `http://data.e-stat.go.jp/lod/sac/C${f.code}`;
          }
        }
      }

      return j;
    });

    graph = (function() {
      const stay = [graph.shift()];
      graph.forEach(next => {
        const prev = stay[stay.length - 1];
        if (prev["表記"] !== next["表記"]) {
          stay.push(next);
          return;
        }
        prev["メタデータ"]["日付"][1]["標準型日付"] = next["メタデータ"]["日付"][1]["標準型日付"];
        next["メタデータ"]["参照"]["参照先"].forEach(x => {
          if (prev["メタデータ"]["参照"]["参照先"].indexOf(x) === -1)
            prev["メタデータ"]["参照"]["参照先"].push(x);
        });
      });
      return stay;
    })();

    graph.forEach(e => {
      Object.keys(e).filter(k => e[k] === null).forEach(k => {
        delete e[k];
      });
      const m = e["メタデータ"];
      if (m["日付"][1]["標準型日付"] === null)
        m["日付"] = m["日付"][0];
      if (m["参照"]["参照先"].length === 0) delete m["参照"];
      else if (m["参照"]["参照先"].length === 1) m["参照"]["参照先"] = m["参照"]["参照先"][0];
    });

    const json = {
      "@context": "https://imi.go.jp/ns/core/context.jsonld",
      "@graph": graph
    };

    promises.push(db.put(key, JSON.stringify(json)));
    latests[key] = graph[graph.length - 1];
  });

})();

readline.createInterface({
  input: process.stdin
}).on('line', (line) => {
  const col = line.trim().replace(/"/g, "").split(",");
  if (col.length !== 10) return;
  if (col[0] === '都道府県コード') return;

  const pref_code = col[0];
  const city_code = col[2];
  const name_code = col[4];
  const pref = col[1];
  const city = col[3];
  const name = col[5];

  const latest = latests[city_code];
  if (!latest) {
    console.error("parent not found", city_code);
    return;
  }

  const json = {
    "@context": "https://imi.go.jp/ns/core/context.jsonld",
    "@type": "場所型",
    "@id": name_code,
    "住所": {},
    "地理座標": {
      "@type": "座標型",
      "緯度": col[6],
      "経度": col[7]
    }
  };

  Object.keys(latest).forEach(key => {
    if (key !== "メタデータ") json["住所"][key] = latest[key];
  });

  json["住所"]["表記"] += name;

  if (!name_code.match(/000$/)) {
    const n = parseInt(name_code) % 100;
    json["住所"]["町名"] = name.replace(chome[n] + "丁目", "");
    json["住所"]["丁目"] = n.toString();
  } else {
    json["住所"]["町名"] = name;
  }

  promises.push(db.put(name_code, JSON.stringify(json)));

}).on('close', () => {

  Promise.all(promises).then(() => {
    console.error("done");
    db.close().then(a => {
      console.log("database closed");
    });
  });
});
