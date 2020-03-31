const lang = require("../modules/language");
const lexer = require("../modules/lexer");

function compareArrays(arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return false;
	}
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}
	return true;
}

// TODO: Compare arrays using Jest matchers (it will provide more verbose logging
test('lexing of code outputs words', () => {
  const sampleInput = "> 15 + 5;";	
  const expectedWords = [">", "15+5", ";"];
  const lexedInput = lexer(sampleInput);
  const areWordsAsExpected = compareArrays(lexedInput.words, expectedWords);
  expect(areWordsAsExpected).toBe(true);
});

test('lexing of code outputs tags', () => {
  const sampleInput = "> 15 + 5;";	
  const expectedTags = [lang.Tag.PRINT, lang.MetaTag.EXPRESSION, lang.Tag.TERMINATOR];
  const lexedInput = lexer(sampleInput);
  const areTagsAsExpected = compareArrays(lexedInput.tags, expectedTags);
  expect(areTagsAsExpected).toBe(true);
});

test('lexing of code removes whitespaces', () => {
  const sampleInput = "varOne = 15 + 5;";	
  const lexedTags = lexer(sampleInput).tags;
  expect(lexedTags.includes(lang.Tag.WHITESPACE)).toBe(false);
});

test('lexing groups words into expressions', () => {
  const sampleInput = "15 + 5";	
  const expectedWords = ["15+5"];
  const lexedInput = lexer(sampleInput);
  const areWordsAsExpected = compareArrays(lexedInput.words, expectedWords);
  expect(areWordsAsExpected).toBe(true);
});