const lang = require("../modules/language");
const parser = require("../modules/parser");

test('parsing assigment of identifier outputs "assign identifier" instruction', () => {
  const sampleWords = ["varOne", "=", "varTwo", ";"];
  const sampleTags = [lang.Tag.IDENTIFIER, lang.Tag.ASSIGN, lang.Tag.IDENTIFIER, lang.Tag.TERMINATOR];
  const lexedInput = {words: sampleWords, tags: sampleTags};
  const expectedInstruction = {"grammarRule": lang.Rule.ASSIGN_IDENTIFIER, "leftIdentifier": "varOne", "rightIdentifier": "varTwo"};
  const instruction = parser(lexedInput)[0];
  expect(instruction).toEqual(expectedInstruction); 
});

test('parsing assigment of number outputs "assign number" instruction', () => {
  const sampleWords = ["varOne", "=", "22", ";"];
  const sampleTags = [lang.Tag.IDENTIFIER, lang.Tag.ASSIGN, lang.Tag.NUMBER, lang.Tag.TERMINATOR];
  const lexedInput = {words: sampleWords, tags: sampleTags};
  const expectedInstruction = {"grammarRule": lang.Rule.ASSIGN_NUMBER, "leftIdentifier": "varOne", "number": "22"};
  const instruction = parser(lexedInput)[0];
  expect(instruction).toEqual(expectedInstruction); 
});

test('parsing assigment of expression outputs "assign expression" instruction', () => {
  const sampleWords = ["varOne", "=", "22+44", ";"];
  const sampleTags = [lang.Tag.IDENTIFIER, lang.Tag.ASSIGN, lang.MetaTag.EXPRESSION, lang.Tag.TERMINATOR];
  const lexedInput = {words: sampleWords, tags: sampleTags};
  const expectedInstruction = {"grammarRule": lang.Rule.ASSIGN_EXPRESSION, "leftIdentifier": "varOne", "expression": "22+44"};
  const instruction = parser(lexedInput)[0];
  expect(instruction).toEqual(expectedInstruction); 
});


test('parsing printing of identifier outputs "print identifier" instruction', () => {
  const sampleWords = [">", "varOne", ";"];
  const sampleTags = [lang.Tag.PRINT, lang.Tag.IDENTIFIER, lang.Tag.TERMINATOR];
  const lexedInput = {words: sampleWords, tags: sampleTags};
  const expectedInstruction = {"grammarRule": lang.Rule.PRINT_IDENTIFIER, "identifier": "varOne"};
  const instruction = parser(lexedInput)[0];
  expect(instruction).toEqual(expectedInstruction); 
});

test('parsing printing of number outputs "print number" instruction', () => {
  const sampleWords = [">", "22", ";"];
  const sampleTags = [lang.Tag.PRINT, lang.Tag.NUMBER, lang.Tag.TERMINATOR];
  const lexedInput = {words: sampleWords, tags: sampleTags};
  const expectedInstruction = {"grammarRule": lang.Rule.PRINT_NUMBER, "number": "22"};
  const instruction = parser(lexedInput)[0];
  expect(instruction).toEqual(expectedInstruction); 
});

test('parsing printing of expression outputs "print expression" instruction', () => {
  const sampleWords = [">", "varTwo+22", ";"];
  const sampleTags = [lang.Tag.PRINT, lang.MetaTag.EXPRESSION, lang.Tag.TERMINATOR];
  const lexedInput = {words: sampleWords, tags: sampleTags};
  const expectedInstruction = {"grammarRule": lang.Rule.PRINT_EXPRESSION, "expression": "varTwo+22"};
  const instruction = parser(lexedInput)[0];
  expect(instruction).toEqual(expectedInstruction); 
});
