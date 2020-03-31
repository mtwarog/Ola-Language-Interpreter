const utils = require("./utils.js");
const lang = require("./language.js");
const instr = require("./instructions.js");

function divideIntoStatements(lexedInput) {
  const statements = [];
  let currentStatement = {words: [], tags: []};
  for (let i = 0; i < lexedInput.tags.length; i++) {
	currentStatement.words.push(lexedInput.words[i]);
	currentStatement.tags.push(lexedInput.tags[i]);
    if (lexedInput.tags[i] === lang.Tag.TERMINATOR) {
		statements.push(currentStatement);
		currentStatement = {words: [], tags: []};
	}
  }
  return statements;
}

function generateInstructions(statements) {
  const instructions = [];
  for (statement of statements) {
	  // Check if statement is grammatically correct
	  let grammarRule;
	  for (ruleId in lang.Rule) { 
		  if (utils.compareGrammars(statement.tags, lang.Grammar[lang.Rule[ruleId]])) { 
			  grammarRule = lang.Rule[ruleId]; 
		  }
	  }
	  if (grammarRule === undefined) {
		  throw new Error("Syntax error");
	  }
	  const instruction = instr.createInstruction(statement.words, grammarRule);
	  instructions.push(instruction);
  }
  return instructions;
}

function parser(lexedInput) {
  const statements = divideIntoStatements(lexedInput);
  const instructions = generateInstructions(statements)

  return instructions;
}

module.exports = parser;