const Tag = {
  WHITESPACE: 0,
  NUMBER: 1,
  IDENTIFIER: 2,
  OPERATOR: 3,
  ASSIGN: 4,
  TERMINATOR: 5,
  PRINT: 6,
}

const MetaTag = {
  EXPRESSION: "A",	
}

const Rule = {
  ASSIGN_IDENTIFIER: 0,
  ASSIGN_NUMBER: 1,
  ASSIGN_EXPRESSION: 2,
  PRINT_IDENTIFIER: 3,
  PRINT_NUMBER: 4,
  PRINT_EXPRESSION: 5,
}

const Operation = {
	"+": (operandOne, operandTwo) => operandOne + operandTwo,
	"-": (operandOne, operandTwo) => operandOne - operandTwo,
	"*": (operandOne, operandTwo) => operandOne * operandTwo,
	"/": (operandOne, operandTwo) => Math.floor(operandOne / operandTwo),
};

const Syntax = {};
Syntax[Tag.WHITESPACE] = new RegExp("\\s");
Syntax[Tag.NUMBER] = new RegExp("[0-9]");
Syntax[Tag.IDENTIFIER] = new RegExp("[a-zA-Z]");
Syntax[Tag.OPERATOR] = new RegExp("[+*/-]");
Syntax[Tag.ASSIGN] = new RegExp("=");
Syntax[Tag.TERMINATOR] = new RegExp(";");
Syntax[Tag.PRINT] = new RegExp(">");

const Grammar = {};
Grammar[Rule.ASSIGN_IDENTIFIER] = [Tag.IDENTIFIER, Tag.ASSIGN, Tag.IDENTIFIER, Tag.TERMINATOR];
Grammar[Rule.ASSIGN_NUMBER] = [Tag.IDENTIFIER, Tag.ASSIGN, Tag.NUMBER, Tag.TERMINATOR];
Grammar[Rule.ASSIGN_EXPRESSION] = [Tag.IDENTIFIER, Tag.ASSIGN, MetaTag.EXPRESSION, Tag.TERMINATOR];
Grammar[Rule.PRINT_IDENTIFIER] = [Tag.PRINT, Tag.IDENTIFIER, Tag.TERMINATOR];
Grammar[Rule.PRINT_NUMBER] = [Tag.PRINT, Tag.NUMBER, Tag.TERMINATOR];
Grammar[Rule.PRINT_EXPRESSION] = [Tag.PRINT, MetaTag.EXPRESSION, Tag.TERMINATOR];

module.exports = {
	Tag: Tag,
	MetaTag: MetaTag,
	Rule: Rule,
	Operation: Operation,
	Syntax: Syntax,
	Grammar: Grammar,
}