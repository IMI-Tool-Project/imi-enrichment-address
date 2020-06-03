const util = require("../lib/util");
const expect = require('chai').expect;

describe('util', function() {
  it('#z2h', () => {
    expect(util.z2h("０１２３４５６７８９０１２３４５６７８９")).to.equal("01234567890123456789");
  });
  it('#h2z', () => {
    expect(util.h2z("01234567890123456789")).to.equal("０１２３４５６７８９０１２３４５６７８９");
  });
  it('#k2h', () => {
    expect(util.k2h("〇一二三四五六七八九〇一二三四五六七八九")).to.equal("01234567890123456789");
  });

  it('#j2h', () => {
    expect(util.j2h("零")).to.equal("0");
    expect(util.j2h("一")).to.equal("1");
    expect(util.j2h("二")).to.equal("2");
    expect(util.j2h("十")).to.equal("10");
    expect(util.j2h("十一")).to.equal("11");
    expect(util.j2h("十二")).to.equal("12");
    expect(util.j2h("二十")).to.equal("20");
    expect(util.j2h("二十一")).to.equal("21");
    expect(util.j2h("二十二")).to.equal("22");
    expect(util.j2h("百")).to.equal("100");
    expect(util.j2h("百一")).to.equal("101");
    expect(util.j2h("百二")).to.equal("102");
    expect(util.j2h("百十")).to.equal("110");
    expect(util.j2h("百十一")).to.equal("111");
    expect(util.j2h("百十二")).to.equal("112");
    expect(util.j2h("百二十")).to.equal("120");
    expect(util.j2h("百二十一")).to.equal("121");
    expect(util.j2h("百二十二")).to.equal("122");
    expect(util.j2h("二百")).to.equal("200");
    expect(util.j2h("二百一")).to.equal("201");
    expect(util.j2h("二百二")).to.equal("202");
    expect(util.j2h("二百十")).to.equal("210");
    expect(util.j2h("二百十一")).to.equal("211");
    expect(util.j2h("二百十二")).to.equal("212");
    expect(util.j2h("二百二十")).to.equal("220");
    expect(util.j2h("二百二十一")).to.equal("221");
    expect(util.j2h("二百二十二")).to.equal("222");
    expect(util.j2h("千")).to.equal("1000");
    expect(util.j2h("千一")).to.equal("1001");
    expect(util.j2h("千二")).to.equal("1002");
    expect(util.j2h("千十")).to.equal("1010");
    expect(util.j2h("千十一")).to.equal("1011");
    expect(util.j2h("千十二")).to.equal("1012");
    expect(util.j2h("千二十")).to.equal("1020");
    expect(util.j2h("千二十一")).to.equal("1021");
    expect(util.j2h("千二十二")).to.equal("1022");
    expect(util.j2h("千百")).to.equal("1100");
    expect(util.j2h("千百一")).to.equal("1101");
    expect(util.j2h("千百二")).to.equal("1102");
    expect(util.j2h("千百十")).to.equal("1110");
    expect(util.j2h("千百十一")).to.equal("1111");
    expect(util.j2h("千百十二")).to.equal("1112");
    expect(util.j2h("千百二十")).to.equal("1120");
    expect(util.j2h("千百二十一")).to.equal("1121");
    expect(util.j2h("千百二十二")).to.equal("1122");
    expect(util.j2h("千二百")).to.equal("1200");
    expect(util.j2h("千二百一")).to.equal("1201");
    expect(util.j2h("千二百二")).to.equal("1202");
    expect(util.j2h("千二百十")).to.equal("1210");
    expect(util.j2h("千二百十一")).to.equal("1211");
    expect(util.j2h("千二百十二")).to.equal("1212");
    expect(util.j2h("千二百二十")).to.equal("1220");
    expect(util.j2h("千二百二十一")).to.equal("1221");
    expect(util.j2h("千二百二十二")).to.equal("1222");

    expect(util.j2h("二千")).to.equal("2000");
    expect(util.j2h("二千一")).to.equal("2001");
    expect(util.j2h("二千二")).to.equal("2002");
    expect(util.j2h("二千十")).to.equal("2010");
    expect(util.j2h("二千十一")).to.equal("2011");
    expect(util.j2h("二千十二")).to.equal("2012");
    expect(util.j2h("二千二十")).to.equal("2020");
    expect(util.j2h("二千二十一")).to.equal("2021");
    expect(util.j2h("二千二十二")).to.equal("2022");
    expect(util.j2h("二千百")).to.equal("2100");
    expect(util.j2h("二千百一")).to.equal("2101");
    expect(util.j2h("二千百二")).to.equal("2102");
    expect(util.j2h("二千百十")).to.equal("2110");
    expect(util.j2h("二千百十一")).to.equal("2111");
    expect(util.j2h("二千百十二")).to.equal("2112");
    expect(util.j2h("二千百二十")).to.equal("2120");
    expect(util.j2h("二千百二十一")).to.equal("2121");
    expect(util.j2h("二千百二十二")).to.equal("2122");
    expect(util.j2h("二千二百")).to.equal("2200");
    expect(util.j2h("二千二百一")).to.equal("2201");
    expect(util.j2h("二千二百二")).to.equal("2202");
    expect(util.j2h("二千二百十")).to.equal("2210");
    expect(util.j2h("二千二百十一")).to.equal("2211");
    expect(util.j2h("二千二百十二")).to.equal("2212");
    expect(util.j2h("二千二百二十")).to.equal("2220");
    expect(util.j2h("二千二百二十一")).to.equal("2221");
    expect(util.j2h("二千二百二十二")).to.equal("2222");


    expect(util.j2h("一万千百十一")).to.equal("11111");
    expect(util.j2h("二万二千二百二十二")).to.equal("22222");
    expect(util.j2h("一億千百十一万千百十一")).to.equal("111111111");
    expect(util.j2h("二億二千二百二十二万二千二百二十二")).to.equal("222222222");

    //
    expect(util.j2h("千五百")).to.equal("1500");
    expect(util.j2h("一千五百")).to.equal("1500");
  });

  it('#h2j', () => {
    expect(util.h2j("0")).to.equal("零");
    expect(util.h2j("1")).to.equal("一");
    expect(util.h2j("2")).to.equal("二");
    expect(util.h2j("10")).to.equal("十");
    expect(util.h2j("11")).to.equal("十一");
    expect(util.h2j("12")).to.equal("十二");
    expect(util.h2j("20")).to.equal("二十");
    expect(util.h2j("21")).to.equal("二十一");
    expect(util.h2j("22")).to.equal("二十二");
    expect(util.h2j("100")).to.equal("百");
    expect(util.h2j("101")).to.equal("百一");
    expect(util.h2j("102")).to.equal("百二");
    expect(util.h2j("110")).to.equal("百十");
    expect(util.h2j("111")).to.equal("百十一");
    expect(util.h2j("112")).to.equal("百十二");
    expect(util.h2j("120")).to.equal("百二十");
    expect(util.h2j("121")).to.equal("百二十一");
    expect(util.h2j("122")).to.equal("百二十二");
    expect(util.h2j("200")).to.equal("二百");
    expect(util.h2j("201")).to.equal("二百一");
    expect(util.h2j("202")).to.equal("二百二");
    expect(util.h2j("210")).to.equal("二百十");
    expect(util.h2j("211")).to.equal("二百十一");
    expect(util.h2j("212")).to.equal("二百十二");
    expect(util.h2j("220")).to.equal("二百二十");
    expect(util.h2j("221")).to.equal("二百二十一");
    expect(util.h2j("222")).to.equal("二百二十二");
    expect(util.h2j("1000")).to.equal("千");
    expect(util.h2j("1001")).to.equal("千一");
    expect(util.h2j("1002")).to.equal("千二");
    expect(util.h2j("1010")).to.equal("千十");
    expect(util.h2j("1011")).to.equal("千十一");
    expect(util.h2j("1012")).to.equal("千十二");
    expect(util.h2j("1020")).to.equal("千二十");
    expect(util.h2j("1021")).to.equal("千二十一");
    expect(util.h2j("1022")).to.equal("千二十二");
    expect(util.h2j("1100")).to.equal("千百");
    expect(util.h2j("1101")).to.equal("千百一");
    expect(util.h2j("1102")).to.equal("千百二");
    expect(util.h2j("1110")).to.equal("千百十");
    expect(util.h2j("1111")).to.equal("千百十一");
    expect(util.h2j("1112")).to.equal("千百十二");
    expect(util.h2j("1120")).to.equal("千百二十");
    expect(util.h2j("1121")).to.equal("千百二十一");
    expect(util.h2j("1122")).to.equal("千百二十二");
    expect(util.h2j("1200")).to.equal("千二百");
    expect(util.h2j("1201")).to.equal("千二百一");
    expect(util.h2j("1202")).to.equal("千二百二");
    expect(util.h2j("1210")).to.equal("千二百十");
    expect(util.h2j("1211")).to.equal("千二百十一");
    expect(util.h2j("1212")).to.equal("千二百十二");
    expect(util.h2j("1220")).to.equal("千二百二十");
    expect(util.h2j("1221")).to.equal("千二百二十一");
    expect(util.h2j("1222")).to.equal("千二百二十二");

    expect(util.h2j("2000")).to.equal("二千");
    expect(util.h2j("2001")).to.equal("二千一");
    expect(util.h2j("2002")).to.equal("二千二");
    expect(util.h2j("2010")).to.equal("二千十");
    expect(util.h2j("2011")).to.equal("二千十一");
    expect(util.h2j("2012")).to.equal("二千十二");
    expect(util.h2j("2020")).to.equal("二千二十");
    expect(util.h2j("2021")).to.equal("二千二十一");
    expect(util.h2j("2022")).to.equal("二千二十二");
    expect(util.h2j("2100")).to.equal("二千百");
    expect(util.h2j("2101")).to.equal("二千百一");
    expect(util.h2j("2102")).to.equal("二千百二");
    expect(util.h2j("2110")).to.equal("二千百十");
    expect(util.h2j("2111")).to.equal("二千百十一");
    expect(util.h2j("2112")).to.equal("二千百十二");
    expect(util.h2j("2120")).to.equal("二千百二十");
    expect(util.h2j("2121")).to.equal("二千百二十一");
    expect(util.h2j("2122")).to.equal("二千百二十二");
    expect(util.h2j("2200")).to.equal("二千二百");
    expect(util.h2j("2201")).to.equal("二千二百一");
    expect(util.h2j("2202")).to.equal("二千二百二");
    expect(util.h2j("2210")).to.equal("二千二百十");
    expect(util.h2j("2211")).to.equal("二千二百十一");
    expect(util.h2j("2212")).to.equal("二千二百十二");
    expect(util.h2j("2220")).to.equal("二千二百二十");
    expect(util.h2j("2221")).to.equal("二千二百二十一");
    expect(util.h2j("2222")).to.equal("二千二百二十二");


    expect(util.h2j("11111")).to.equal("一万千百十一");
    expect(util.h2j("22222")).to.equal("二万二千二百二十二");
    expect(util.h2j("111111111")).to.equal("一億千百十一万千百十一");
    expect(util.h2j("222222222")).to.equal("二億二千二百二十二万二千二百二十二");

  });

  it("deepStrictEqual", () => {
    expect(util.deepStrictEqual(0, 0)).to.be.true;
    expect(util.deepStrictEqual(1, 1)).to.be.true;
    expect(util.deepStrictEqual(true, true)).to.be.true;
    expect(util.deepStrictEqual(false, false)).to.be.true;
    expect(util.deepStrictEqual("hello", "hello")).to.be.true;
    expect(util.deepStrictEqual([0, "hello", true], [0, "hello", true])).to.be.true;
    expect(util.deepStrictEqual({
      a: 1,
      b: 2
    }, {
      b: 2,
      a: 1
    })).to.be.true;

    expect(util.deepStrictEqual("hello", "world")).to.be.false;
    expect(util.deepStrictEqual([0, "hello", true], [0, "hello", false])).to.be.false;
    expect(util.deepStrictEqual([0, "hello", true], [0, true, "hello"])).to.be.false;
    expect(util.deepStrictEqual({
      a: 1,
      b: 2
    }, {
      b: 2
    })).to.be.false;
  });

  it("put", () => {
    expect(util.put({}, "name", "Alice")).deep.equal({
      "name": "Alice"
    });
    expect(util.put({
      "name": "Alice"
    }, "name", "Alice")).deep.equal({
      "name": "Alice"
    });
    expect(util.put({
      "name": "Bob"
    }, "name", "Alice")).deep.equal({
      "name": ["Bob", "Alice"]
    });
    expect(util.put({
      "name": ["Bob", "Cate"],
    }, "name", "Alice")).deep.equal({
      "name": ["Bob", "Cate", "Alice"]
    });
    expect(util.put({}, "is", {
      "@type": "Cat"
    })).deep.equal({
      "is": {
        "@type": "Cat"
      }
    });
    expect(util.put({
      "is": {
        "@type": "Cat"
      }
    }, "is", {
      "@type": "Cat"
    })).deep.equal({
      "is": {
        "@type": "Cat"
      }
    });
    expect(util.put({
      "is": {
        "@type": "Dog"
      }
    }, "is", {
      "@type": "Cat"
    })).deep.equal({
      "is": [{
        "@type": "Dog"
      }, {
        "@type": "Cat"
      }]
    });
    expect(util.put({
      "is": [{
        "@type": "Dog"
      }, {
        "@type": "Animal"
      }]
    }, "is", {
      "@type": "Cat"
    })).deep.equal({
      "is": [{
        "@type": "Dog"
      }, {
        "@type": "Animal"
      }, {
        "@type": "Cat"
      }]
    });
  });


});
