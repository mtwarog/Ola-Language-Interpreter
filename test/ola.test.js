const olaLang = require('../ola.js');

test('evaluation of program with syntax error in variable assigment throws error', () => {
  const sampleInput = "var = a5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  const evaluationOfIncorrectProgram = () => olaLang.evaluate(sampleInput, outputChannel);
  expect(evaluationOfIncorrectProgram).toThrow("Syntax error");
});

test('evaluation of program with syntax error in variable name throws error', () => {
  const sampleInput = "var12 = 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  const evaluationOfIncorrectProgram = () => olaLang.evaluate(sampleInput, outputChannel);
  expect(evaluationOfIncorrectProgram).toThrow("Syntax error");
});

test('evaluation of program with syntax error in assigment of expression throws error', () => {
  const sampleInput = "var = 5 + 5 + 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  const evaluationOfIncorrectProgram = () => olaLang.evaluate(sampleInput, outputChannel);
  expect(evaluationOfIncorrectProgram).toThrow("Syntax error");
});

test('evaluation of program with syntax error caused by missing terminator throws error', () => {
  const sampleInput = "var = 5\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  const evaluationOfIncorrectProgram = () => olaLang.evaluate(sampleInput, outputChannel);
  expect(evaluationOfIncorrectProgram).toThrow("Syntax error");
});

test('evaluation of program with syntax error caused by assignment to number throws error', () => {
  const sampleInput = "5 = var;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  const evaluationOfIncorrectProgram = () => olaLang.evaluate(sampleInput, outputChannel);
  expect(evaluationOfIncorrectProgram).toThrow("Syntax error");
});

test('evaluation of program with syntax error caused by missing argument throws error', () => {
  const sampleInput = "5 = var;\n> ;";
  let output = "";
  const outputChannel = (out) => {output = out};
  const evaluationOfIncorrectProgram = () => olaLang.evaluate(sampleInput, outputChannel);
  expect(evaluationOfIncorrectProgram).toThrow("Syntax error");
});

test('evaluation of number assigment(single-character number) outputs assigned value', () => {
  const sampleInput = "var = 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(5);
});

test('evaluation of number assigment(multi-character number) outputs assigned value', () => {
  const sampleInput = "var = 555;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(555);
});

test('evaluation of identifier assigment outputs assigned value', () => {
  const sampleInput = "varOne = 5;\n varTwo = varOne;\n> varTwo;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(5);
});

test('evaluation of expression assigment outputs expression value', () => {
  const sampleInput = "var = 5 * 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(25);
});

test('evaluation of addition expression outputs expression value', () => {
  const sampleInput = "var = 5 + 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(10);
});

test('evaluation of subtraction expression outputs expression value', () => {
  const sampleInput = "var = 5 - 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(0);
});

test('evaluation of multiplication expression outputs expression value', () => {
  const sampleInput = "var = 5 * 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(25);
});

test('evaluation of division expression (reminder equal 0) outputs expression value', () => {
  const sampleInput = "var = 5 / 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(1);
});

test('evaluation of division expression (non-zero reminder) outputs expression value', () => {
  const sampleInput = "var = 6 / 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(1);
});

test('evaluation of assigment of variable to itself (as first operand) outputs assigned value', () => {
  const sampleInput = "var = 5;\nvar = var + 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(10);
});

test('evaluation of assigment of variable to itself (as second operand) outputs assigned value', () => {
  const sampleInput = "var = 5;\nvar = 5 + var;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(10);
});

test('evaluation of assigment of variable to itself (as both operands) outputs assigned value', () => {
  const sampleInput = "var = 5;\nvar = var + var;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(10);
});

test('evaluation of print number statement outputs number', () => {
  const sampleInput = "> 5;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(5);
});

test('evaluation of print identifier statement outputs value binded to identifier', () => {
  const sampleInput = "var = 5;\n> var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(5);
});

test('evaluation of print expression (numbers-only) statement outputs expression value', () => {
  const sampleInput = "> 5 + 5;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(10);
});

test('evaluation of print expression (identfier as first operand) statement outputs expression value', () => {
  const sampleInput = "var = 5;\n> var + 5;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(10);
});

test('evaluation of print expression (identfier as second operand) statement outputs expression value', () => {
  const sampleInput = "var = 5;\n> 5 + var;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(10);
});

test('evaluation of print expression (identfiers as both operands) statement outputs expression value', () => {
  const sampleInput = "varOne = 5;\nvarTwo = 5;\n> varOne + varTwo;";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(10);
});

test('evaluation of statements with a lot of whitespaces outputs printed value', () => {
  const sampleInput = "var   	=		5;\n\n\n\n 	>	\n5		\n+		\nvar;\n\n\n   ";
  let output = "";
  const outputChannel = (out) => {output = out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe(10);
});

test('evaluation of multi-statement program outputs printed values', () => {
  const sampleInput = "bread = 2;\nbuns = 10;\ntomato = 1;\npotato = 5;\npastries = bread + buns;\nvegetables = tomato + potato;\nsum = pastries + vegetables;\ndiscount = 2;\nsum = sum - discount;\n> sum;\ntax = 4;\nsum = sum + tax;\n> sum;\ndoubleSum = sum * 2;\n> doubleSum;\nhalfSum = sum / 2;\n> halfSum;";
  let output = "";
  const outputChannel = (out) => {output += out};
  olaLang.evaluate(sampleInput, outputChannel)
  expect(output).toBe("16204010");
});

const sampleInputForEvaluationOfThousandLinesTest = prepareThousandLineInput();

test('evaluation of 1000 lines program outputs printed values in under 1 second', () => {
  let output = "";
  const outputChannel = (out) => {output += out};
  ({thousandLineProgram, thousandLineProgramOutput} = sampleInputForEvaluationOfThousandLinesTest);
  const startTime = new Date();
  olaLang.evaluate(thousandLineProgram, outputChannel);
  expect(new Date() - startTime).toBeLessThan(1000);
  expect(output).toBe(thousandLineProgramOutput);
});

function prepareThousandLineInput() {
  const atomicProgram =`
  itemOne = 0;
  itemTwo = 1;
  itemThree = 2;
  bread = 2;
  buns = 10;
  tomato = 1;
  potato = 5;
  pastries = bread + buns;
  vegetables = tomato + potato;
  sum = pastries + vegetables;
  discount = 2;
  sum = sum - discount;
  > sum;
  tax = 4;
  sum = sum + tax;
  > sum;
  doubleSum = sum * 2;
  > doubleSum;
  halfSum = sum / 2;
  > halfSum;`;
  const atomicProgramOutput = "16204010";
  let thousandLineProgram = "";
  let thousandLineProgramOutput = "";
  for (let i = 0; i < 50; i++) {
	thousandLineProgram += atomicProgram;
	thousandLineProgramOutput += atomicProgramOutput;
  }
  return {thousandLineProgram, thousandLineProgramOutput};
}
