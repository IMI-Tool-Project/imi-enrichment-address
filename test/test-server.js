const expect = require('chai').expect;
const spawn = require('child_process').spawn;
const fetch = require("node-fetch");

const fs = require("fs");
const spec = __dirname + "/../spec";

const PORT = "37564";
const ENDPOINT = `http://localhost:${PORT}`;

describe('imi-enrichment-address#server', () => {

  let server = null;

  before((done) => {
    server = spawn("node", ["bin/server.js", PORT]);
    let initialized = false;
    server.stdout.on('data', (data) => {
      if (!initialized) {
        initialized = true;
        done();
      }
    });
  });

  after(() => {
    server.kill();
  });

  describe('server', () => {
    it("GET リクエストに対して 200 OK を返すこと", (done) => {
      try {
        fetch(ENDPOINT).then(res => {
          try {
            expect(res.status).to.equal(200);
            expect(res.headers.get("Access-Control-Allow-Origin")).to.equal("*");
            done();
          } catch (e) {
            done(e);
          }
        }).catch(e => {
          done(e);
        });
      } catch (e) {
        done(e);
      }
    });

    it("HEAD リクエストを 405 Request Not Allowed でリジェクトすること", (done) => {
      try {
        fetch(ENDPOINT, {
          method: "HEAD"
        }).then(res => {
          try {
            expect(res.status).to.equal(405);
            expect(res.headers.get("Access-Control-Allow-Origin")).to.equal("*");
            done();
          } catch (e) {
            done(e);
          }
        }).catch(e => {
          done(e);
        });
      } catch (e) {
        done(e);
      }
    });

    it("JSON でないリクエストを 400 Bad Request でリジェクトすること", (done) => {
      fetch(ENDPOINT, {
        method: "POST",
        body: "hello, world",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        try {
          expect(res.status).to.equal(400);
          expect(res.headers.get("Access-Control-Allow-Origin")).to.equal("*");
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it("正常なクエストに 200 OK を返すこと", (done) => {
      fetch(ENDPOINT, {
        method: "POST",
        body: "{}",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        try {
          expect(res.status).to.equal(200);
          expect(res.headers.get("Access-Control-Allow-Origin")).to.equal("*");
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });

  describe("spec", function() {
    fs.readdirSync(spec).filter(file => file.match(/json$/)).forEach(file => {
      describe(file, function() {
        const json = JSON.parse(fs.readFileSync(`${spec}/${file}`, "UTF-8"));
        json.forEach(a => {
          it(a.name, done => {
            const body = typeof a.input === 'object' ? JSON.stringify(a.input) : a.input;

            fetch(ENDPOINT, {
              method: "POST",
              body: body,
              headers: {
                'Accept': 'application/json',
                'Content-Type': typeof a.input === 'object' ? 'application/json' : 'text/plain'
              }
            }).then(res => res.json()).then(json => {
              try {
                expect(json).deep.equal(a.output);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });
      });
    });
  });

});
