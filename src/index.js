const fs = require("fs");
const path = require("path");

const chalk = require("chalk");
const inquirer = require("inquirer");
const questions = require("./questions");

const createApp = require("./createApp");

function init(folderName) {
  const projectName = folderName;
  const projectPath = path.join(process.cwd(), projectName);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  } else {
    console.log(
      `The folder ${chalk.red(
        folderName
      )} already exist in the current directory, please give it another name.`
    );
    process.exit(1);
  }

  process.chdir(projectPath);

  inquirer.prompt(questions).then((answers) => {
    createApp(projectPath, projectName, answers);
  });
}

module.exports = init;
