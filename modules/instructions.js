const utils = require("./utils.js");
const lang = require("./language.js");

const InstructionDecorator = {};
InstructionDecorator[lang.Rule.ASSIGN_IDENTIFIER] = (instruction, words) => {
	instruction.leftIdentifier = words[0];
	instruction.rightIdentifier = words[2];
};
InstructionDecorator[lang.Rule.ASSIGN_NUMBER] = (instruction, words) => {
    instruction.leftIdentifier = words[0];
	instruction.number = words[2];
};
InstructionDecorator[lang.Rule.ASSIGN_EXPRESSION] = (instruction, words) => {
    instruction.leftIdentifier = words[0];
	instruction.expression = words[2];
};
InstructionDecorator[lang.Rule.PRINT_IDENTIFIER] = (instruction, words) => {
	instruction.identifier = words[1];
};
InstructionDecorator[lang.Rule.PRINT_NUMBER] = (instruction, words) => {
	instruction.number = words[1];
};
InstructionDecorator[lang.Rule.PRINT_EXPRESSION] = (instruction, words) => {
	instruction.expression = words[1];
};

const InstructionExecutor = {};
InstructionExecutor[lang.Rule.ASSIGN_IDENTIFIER] = (memory, instruction) => {
    if (!memory[instruction.rightIdentifier]) {
      throw new Error("Unknown identifier: " + instruction.rightIdentifier);
    }
    memory[instruction.leftIdentifier] = memory[instruction.rightIdentifier];
};
InstructionExecutor[lang.Rule.ASSIGN_NUMBER] = (memory, instruction) => {
    memory[instruction.leftIdentifier] = Number(instruction.number);
};
InstructionExecutor[lang.Rule.ASSIGN_EXPRESSION] = (memory, instruction) => {
    memory[instruction.leftIdentifier] = utils.evaluateExpression(memory, instruction.expression);
};  
InstructionExecutor[lang.Rule.PRINT_IDENTIFIER] = (memory, instruction, outputChannel) => {
    if (memory[instruction.identifier] === undefined) {
      throw new Error("Identifier not initialized: " + instruction.identifier);
    }
    outputChannel(memory[instruction.identifier]);
};  
InstructionExecutor[lang.Rule.PRINT_NUMBER] = (memory, instruction, outputChannel) => {
    outputChannel(Number(instruction.number));
};    
InstructionExecutor[lang.Rule.PRINT_EXPRESSION] = (memory, instruction, outputChannel) => {
    outputChannel(utils.evaluateExpression(memory, instruction.expression));
};    
  
function createInstruction (words, grammarRule) {
	const instruction = {};
	instruction.grammarRule = grammarRule;
	decorator = InstructionDecorator[grammarRule];
	decorator(instruction, words);
	return instruction;
};

module.exports = {
	InstructionExecutor: InstructionExecutor,
	createInstruction: createInstruction,
}