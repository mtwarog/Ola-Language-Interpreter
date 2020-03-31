const instruct = require("./modules/instructions.js");
const lexer = require("./modules/lexer.js");
const parser = require("./modules/parser.js");

function evaluate(input, outputChannel) {
  const memory = {};
  const lexedInput = lexer(input);
  const instructions = parser(lexedInput);
  for (instruction of instructions) {
	const executor = instruct.InstructionExecutor[instruction.grammarRule];
	if (executor === undefined) {
		throw new Error("Instruction not recognized!");
	}
	executor(memory, instruction, outputChannel);
  }
}

module.exports = {
	evaluate: evaluate,
}