const bangou = require("../lib/bangou");
const expect = require('chai').expect;

const data = {
  "": {},
  "ビル名": {},
  "1-2": {
    "番地": "1",
    "号": "2"
  },
  "1-2": {
    "番地": "1",
    "号": "2"
  }
};

describe('imi-enrichment-address#bangou', function() {
  describe('番地・号なし', function() {
    it("空白", () => {
      expect(bangou("")).deep.equal({});
    });
    it("数字以外で始まる文字列", () => {
      expect(bangou("ビル名")).deep.equal({});
    });
  });
  describe('番地のみ', function() {
    it("半角", () => {
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
    it("全角", () => {
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
    it("漢数字", () => {
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
  describe('番地号', function() {
    it("半角", () => {
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
    it("全角", () => {
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
    it("漢数字", () => {
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
