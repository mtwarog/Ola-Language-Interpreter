const lang = require("../modules/language");
const utils = require("../modules/utils");

test('compareGrammar test given equal grammars', () => {
  const grammarOne = [lang.Tag.PRINT, lang.Tag.NUMBER, lang.Tag.NUMBER, lang.Tag.OPERATOR];	
  const grammarTwo = [lang.Tag.PRINT, lang.Tag.NUMBER, lang.Tag.NUMBER, lang.Tag.OPERATOR];
  const areGrammarsEqual = utils.compareGrammars(grammarOne, grammarTwo)
  expect(areGrammarsEqual).toBe(true);
});

test('compareGrammar test given different grammars', () => {
  const grammarOne = [lang.Tag.PRINT, lang.Tag.NUMBER, lang.Tag.NUMBER, lang.Tag.OPERATOR];	
  const grammarTwo = [lang.Tag.PRINT, lang.Tag.ASSIGN, lang.Tag.NUMBER, lang.Tag.OPERATOR];
  const areGrammarsEqual = utils.compareGrammars(grammarOne, grammarTwo)
  expect(areGrammarsEqual).toBe(false);
});

test('compareGrammar test given different length grammars', () => {
  const grammarOne = [lang.Tag.PRINT, lang.Tag.NUMBER, lang.Tag.NUMBER, lang.Tag.OPERATOR, lang.Tag.OPERATOR];	
  const grammarTwo = [lang.Tag.PRINT, lang.Tag.NUMBER, lang.Tag.NUMBER, lang.Tag.OPERATOR];
  const areGrammarsEqual = utils.compareGrammars(grammarOne, grammarTwo)
  expect(areGrammarsEqual).toBe(false);
});

test('compareGrammar test given empty grammars', () => {
  const grammarOne = [];	
  const grammarTwo = [];
  const areGrammarsEqual = utils.compareGrammars(grammarOne, grammarTwo)
  expect(areGrammarsEqual).toBe(true);
});

// TODO: make below test one parameteric (data-driven) test
test('recognizeTag test given space character (WHITESPACE tag)', () => {	
  const character = " ";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.WHITESPACE);
});

test('recognizeTag test given "0" character (NUMBER tag)', () => {	
  const character = "0";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.NUMBER);
});

test('recognizeTag test given "a" character (IDENTIFIER tag)', () => {	
  const character = "a";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.IDENTIFIER);
});

test('recognizeTag test given "+" character (OPERATOR tag)', () => {	
  const character = "+";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.OPERATOR);
});

test('recognizeTag test given ";" character (TERMINATOR tag)', () => {	
  const character = ";";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.TERMINATOR);
});

test('recognizeTag test given ">" character (TERMINATOR tag)', () => {	
  const character = ">";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.PRINT);
});

test('recognizeTag test given throw error on unrecognized character', () => {	
  const character = "#";
  expect(utils.recognizeTag.bind(this, character)).toThrow();
});

test('findTagEnd test given only one tag in input', () => {	
  const input = "asdas";
  const found = utils.findTagEnd(input)
  expect(found).toBe(4);
});

test('findTagEnd test given only two tags in input', () => {	
  const input = "asdas123";
  const found = utils.findTagEnd(input)
  expect(found).toBe(4);
});

test('findTagEnd test given one character input', () => {	
  const input = ">";
  const found = utils.findTagEnd(input)
  expect(found).toBe(0);
});

test('findTagEnd test given empty input', () => {	
  const input = "";
  const found = utils.findTagEnd(input)
  expect(found).toBe(-1);
});

test('isExpression test given expression', () => {	
  const input = [lang.Tag.NUMBER, lang.Tag.OPERATOR, lang.Tag.IDENTIFIER];
  expect(utils.isExpression(input)).toBe(true);
});

test('isExpression test given non-expression', () => {	
  const input = [lang.Tag.NUMBER, lang.Tag.OPERATOR, lang.Tag.OPERATOR];
  expect(utils.isExpression(input)).toBe(false);
});

test('evaluateExpression test given numbers-only expression', () => {	
  const memory = {};
  const expression = "22+44";
  expect(utils.evaluateExpression(memory, expression)).toBe(66);
});

test('evaluateExpression test given number and identifier expression', () => {	
  const memory = {"variable": 44};
  const expression = "22+variable";
  expect(utils.evaluateExpression(memory, expression)).toBe(66);
});

test('evaluateExpression test given identifiers-only expression', () => {	
  const memory = {"varOne": 44, "varTwo": 22};
  const expression = "varOne+varTwo";
  expect(utils.evaluateExpression(memory, expression)).toBe(66);
});