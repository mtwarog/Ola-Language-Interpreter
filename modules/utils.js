const lang = require("./language.js");

const getOperandValue = (memory, operand) => {
	if (Util.recognizeTag(operand) === lang.Tag.IDENTIFIER) {
		if (memory[operand] !== undefined) {
			operand = memory[operand];
		} else {
			// TODO: Export errors to single object (per module?). Make it a module.
			throw new Error("Referenced uninitialized identifier: " + operand);
		}
    } else if (Util.recognizeTag(operand) === lang.Tag.NUMBER) {
        operand = Number(operand);
    }
	return operand;
};

const Util = {
  compareGrammars: (sentenceOne, sentenceTwo) => {
    if (sentenceOne.length != sentenceTwo.length) {
      return false;
    };
    for (let i = 0; i < sentenceOne.length; i++) {
      if (sentenceOne[i] != sentenceTwo[i]) {
        return false;
      }
    }
    return true;
  },
  recognizeTag: (character) => {
    for (const tagName in lang.Tag) {
      if (lang.Syntax[lang.Tag[tagName]].test(character)) {
        return lang.Tag[tagName];
      }
    }
    throw new Error("Syntax error! Tag not recognized.")
  },
  findTagEnd: (input) => {  
    const tagName = Util.recognizeTag(input[0]);
    for (let i = 1; i < input.length; i++) {
      const nextTagName = Util.recognizeTag(input[i]);
      if (tagName != nextTagName) {  
        return i - 1;
      }
    }
    return input.length - 1;
  },
  isExpression: (tags) => {  
    if (tags[0] !== lang.Tag.IDENTIFIER && tags[0] !== lang.Tag.NUMBER) {
      return false;
    }
    if (tags[1] !== lang.Tag.OPERATOR) {
      return false;
    }
    if (tags[2] !== lang.Tag.IDENTIFIER && tags[2] !== lang.Tag.NUMBER) {
      return false;
    }
    return true;
  },
  evaluateExpression: (memory, expression) => {
    let expressionValue;
    const matches = expression.match(lang.Syntax[lang.Tag.OPERATOR]);
    if (matches.length === 1) {
      const operatorIndex = expression.indexOf(matches[0]);
	  const operator = expression.slice(operatorIndex, operatorIndex + 1);
      let operandOne = expression.slice(0, operatorIndex);
      let operandTwo = expression.slice(operatorIndex + 1);
	  operandOne = getOperandValue(memory, operandOne);
	  operandTwo = getOperandValue(memory, operandTwo);
	  const operation = lang.Operation[operator];
	  expressionValue = operation(operandOne, operandTwo);
    } else {
      throw new Error("Not an expression");
    }
    return expressionValue;
  },
};

module.exports = Util;