const bangou = require("../lib/bangou");
const expect = require("chai").expect;

describe("imi-enrichment-address#bangou", () => {
  describe("番地、号を含まない文字列を変換するとき", () => {
    describe("空白の文字列を変換するとき", () => {
      it("空のオブジェクトを返す", () => {
        expect(bangou("")).deep.equal({});
      });
    });

    describe("数字以外で始まる文字列を変換するとき", () => {
      it("空のオブジェクトを返す", () => {
        expect(bangou("ビル名")).deep.equal({});
      });
    });
  });

  describe("番地のみを含む文字列を変換するとき", () => {
    describe("番地が半角数字で表されているとき", () => {
      it("番地を property にもち，値が半角数字の文字列であるオブジェクトを返す", () => {
        expect(bangou("12345")).deep.equal({
          "番地": "12345"
        });
        expect(bangou("12345番")).deep.equal({
          "番地": "12345"
        });
        expect(bangou("12345番地")).deep.equal({
          "番地": "12345"
        });
      });
    });

    describe("番地が全角数字で表されているとき", () => {
      it("番地を property にもち，値が半角数字の文字列であるオブジェクトを返す", () => {
        expect(bangou("１２３４５")).deep.equal({
          "番地": "12345"
        });
        expect(bangou("１２３４５番")).deep.equal({
          "番地": "12345"
        });
        expect(bangou("１２３４５番地")).deep.equal({
          "番地": "12345"
        });
      });
    });

    describe("番地が漢数字で表されているとき", () => {
      it("番地を property にもち，値が半角数字の文字列であるオブジェクトを返す", () => {
        expect(bangou("一〇三四五")).deep.equal({
          "番地": "10345"
        });
        expect(bangou("一〇三四五番")).deep.equal({
          "番地": "10345"
        });
        expect(bangou("一〇三四五番地")).deep.equal({
          "番地": "10345"
        });
      });
    });
  });

  describe("番地、号を含む文字列を変換するとき", () => {
    describe("番地、号が半角数字で表されているとき", () => {
      it("番地、号を property にもち，それぞれの値が半角数字の文字列であるオブジェクトを返す", () => {
        expect(bangou("103-45")).deep.equal({
          "番地": "103",
          "号": "45"
        });
        expect(bangou("103番45号")).deep.equal({
          "番地": "103",
          "号": "45"
        });
        expect(bangou("103番地45号")).deep.equal({
          "番地": "103",
          "号": "45"
        });
      });
    });

    describe("番地が全角数字で表されているとき", () => {
      it("番地、号を property にもち，それぞれの値が半角数字の文字列であるオブジェクトを返す", () => {
        expect(bangou("１０３－４５")).deep.equal({
          "番地": "103",
          "号": "45"
        });
        expect(bangou("１０３番４５号")).deep.equal({
          "番地": "103",
          "号": "45"
        });
        expect(bangou("１０３番地４５号")).deep.equal({
          "番地": "103",
          "号": "45"
        });
      });
    });

    describe("番地が漢数字で表されているとき", () => {
      it("番地、号を property にもち，それぞれの値が半角数字の文字列であるオブジェクトを返す", () => {
        expect(bangou("一〇三－四五")).deep.equal({
          "番地": "103",
          "号": "45"
        });
        expect(bangou("一〇三番四五号")).deep.equal({
          "番地": "103",
          "号": "45"
        });
        expect(bangou("一〇三番地四五号")).deep.equal({
          "番地": "103",
          "号": "45"
        });
      });
    });
  });
});
