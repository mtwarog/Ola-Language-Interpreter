const olaLanguage = require("./ola.js");
const fs = require('fs')

const myArgs = process.argv.slice(2);
if (myArgs.length === 0 || typeof myArgs[0] !== "string") {
	throw new Error("Invalid source file");
}
const sourceFile = myArgs[0];

fs.readFile(sourceFile, "utf8", (err, sourceCode) => {
  if (err) {
    console.error(err)
    return
  }
  olaLanguage.evaluate(sourceCode, console.log);
})
