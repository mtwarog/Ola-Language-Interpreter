const utils = require("./utils.js");
const lang = require("./language.js");

function divideInputAndTagIt(words, tags, input) {
	  while (input.length > 0) {
    const nextTag = utils.recognizeTag(input[0]);
    const nextTagEnd = utils.findTagEnd(input);
    const nextWord = input.slice(0, nextTagEnd + 1);
    words.push(nextWord);
    tags.push(nextTag);
    input = input.slice(nextTagEnd + 1);
  }
}

function removeWhitespaces(words, tags) {
  for (let i = 0; i < words.length; i++) {
    if (tags[i] === lang.Tag.WHITESPACE) {
      words.splice(i, 1);
      tags.splice(i, 1);
      i = i - 1;
    }
  }
}

function groupIntoExpressions(words, tags) {
  for (let i = 0; i < tags.length - 2; i++) {
    const expressionCandidate = tags.slice(i, i + 3);
    if (utils.isExpression(expressionCandidate)) {
      const expression = words[i] + words[i+1] + words[i+2];
      words.splice(i, 3, expression);
      tags.splice(i, 3, lang.MetaTag.EXPRESSION);
    }
  }
}

function lexer(input) {
  const words = [];
  const tags = [];

  divideInputAndTagIt(words, tags, input);
  removeWhitespaces(words, tags);
  groupIntoExpressions(words, tags)

  return {
    "words": words,
    "tags": tags,
  }
}

module.exports = lexer;