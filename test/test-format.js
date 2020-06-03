const expect = require('chai').expect;
const levelup = require('levelup');
const leveldown = require('leveldown');

describe('imi-enrichment-address#format', function() {

  let db;

  before(() => {
    db = levelup(leveldown(__dirname + "/../db"));
  });

  after(() => {
    db.close().then(() => {
      console.error("data base closed.");
    });
  });

  it("都道府県", (done) => {

    db.get("28000", {
      asBuffer: false
    }).then(str => {
      try {
        expect(JSON.parse(str)).deep.equal({
          "@context": "https://imi.go.jp/ns/core/context.jsonld",
          "@graph": [{
            "@type": "住所型",
            "メタデータ": {
              "@type": "文書型",
              "日付": {
                "@type": "日付型",
                "標準型日付": "1970-04-01",
                "種別": "施行",
              }
            },
            "表記": "兵庫県",
            "都道府県": "兵庫県",
            "都道府県コード": "http://data.e-stat.go.jp/lod/sac/C28000"
          }]
        });
        done();
      } catch (e) {
        done(e);
      }
    }).catch(e => {
      done(e);
    });
  });

  it("改名自治体(丹波篠山市)", (done) => {

    db.get("28221", {
      asBuffer: false
    }).then(str => {
      try {
        expect(JSON.parse(str)).deep.equal({
          "@context": "https://imi.go.jp/ns/core/context.jsonld",
          "@graph": [{
              "@type": "住所型",
              "メタデータ": {
                "@type": "文書型",
                "日付": [{
                    "@type": "日付型",
                    "標準型日付": "1999-04-01",
                    "種別": "施行"
                  },
                  {
                    "@type": "日付型",
                    "標準型日付": "2019-05-01",
                    "種別": "廃止"
                  }
                ]
              },
              "市区町村": "篠山市",
              "市区町村コード": "http://data.e-stat.go.jp/lod/sac/C28221",
              "表記": "兵庫県篠山市",
              "都道府県": "兵庫県",
              "都道府県コード": "http://data.e-stat.go.jp/lod/sac/C28000"
            },
            {
              "@type": "住所型",
              "メタデータ": {
                "@type": "文書型",
                "日付": {
                  "@type": "日付型",
                  "標準型日付": "2019-05-01",
                  "種別": "施行"
                },
              },
              "市区町村": "丹波篠山市",
              "市区町村コード": "http://data.e-stat.go.jp/lod/sac/C28221",
              "表記": "兵庫県丹波篠山市",
              "都道府県": "兵庫県",
              "都道府県コード": "http://data.e-stat.go.jp/lod/sac/C28000"
            }
          ]
        });
        done();
      } catch (e) {
        done(e);
      }
    }).catch(e => {
      done(e);
    });
  });

  it("消滅自治体(浦和市、継承先のさいたま市がのちに政令指定市に)", (done) => {

    db.get("11204", {
      asBuffer: false
    }).then(str => {
      try {
        expect(JSON.parse(str)).deep.equal({
          "@context": "https://imi.go.jp/ns/core/context.jsonld",
          "@graph": [{
            "@type": "住所型",
            "メタデータ": {
              "@type": "文書型",
              "日付": [{
                  "@type": "日付型",
                  "種別": "施行",
                  "標準型日付": "1970-04-01"
                },
                {
                  "@type": "日付型",
                  "種別": "廃止",
                  "標準型日付": "2001-05-01"
                }
              ],
              "参照": {
                "@type": "参照型",
                "種別": "継承先市区町村コード",
                "参照先": "http://data.e-stat.go.jp/lod/sac/C11100"
              }
            },
            "市区町村": "浦和市",
            "市区町村コード": "http://data.e-stat.go.jp/lod/sac/C11204",
            "表記": "埼玉県浦和市",
            "都道府県": "埼玉県",
            "都道府県コード": "http://data.e-stat.go.jp/lod/sac/C11000"
          }]
        });
        done();
      } catch (e) {
        done(e);
      }
    }).catch(e => {
      done(e);
    });
  });

  it("分割自治体(上九一色村)", (done) => {

    db.get("19341", {
      asBuffer: false
    }).then(str => {
      try {
        expect(JSON.parse(str)).deep.equal({
          "@context": "https://imi.go.jp/ns/core/context.jsonld",
          "@graph": [{
            "@type": "住所型",
            "メタデータ": {
              "@type": "文書型",
              "日付": [{
                  "@type": "日付型",
                  "種別": "施行",
                  "標準型日付": "1970-04-01"
                },
                {
                  "@type": "日付型",
                  "種別": "廃止",
                  "標準型日付": "2006-03-01"
                }
              ],
              "参照": {
                "@type": "参照型",
                "種別": "継承先市区町村コード",
                "参照先": [
                  "http://data.e-stat.go.jp/lod/sac/C19201",
                  "http://data.e-stat.go.jp/lod/sac/C19430"
                ]
              }
            },
            "市区町村": "上九一色村",
            "市区町村コード": "http://data.e-stat.go.jp/lod/sac/C19341",
            "表記": "山梨県上九一色村",
            "都道府県": "山梨県",
            "都道府県コード": "http://data.e-stat.go.jp/lod/sac/C19000"
          }]
        });
        done();
      } catch (e) {
        done(e);
      }
    }).catch(e => {
      done(e);
    });
  });



  it("消滅自治体(田無市、継承先が現存)", (done) => {

    db.get("13216", {
      asBuffer: false
    }).then(str => {
      try {
        expect(JSON.parse(str)).deep.equal({
          "@context": "https://imi.go.jp/ns/core/context.jsonld",
          "@graph": [{
            "@type": "住所型",
            "メタデータ": {
              "@type": "文書型",
              "日付": [{
                  "@type": "日付型",
                  "種別": "施行",
                  "標準型日付": "1970-04-01"
                },
                {
                  "@type": "日付型",
                  "種別": "廃止",
                  "標準型日付": "2001-01-21"
                }
              ],
              "参照": {
                "@type": "参照型",
                "種別": "継承先市区町村コード",
                "参照先": "http://data.e-stat.go.jp/lod/sac/C13229"
              }
            },
            "市区町村": "田無市",
            "市区町村コード": "http://data.e-stat.go.jp/lod/sac/C13216",
            "表記": "東京都田無市",
            "都道府県": "東京都",
            "都道府県コード": "http://data.e-stat.go.jp/lod/sac/C13000"
          }]
        });
        done();
      } catch (e) {
        done(e);
      }
    }).catch(e => {
      done(e);
    });
  });





});
