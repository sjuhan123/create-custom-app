const fs = require("fs");
const path = require("path");

const chalk = require("chalk");
const inquirer = require("inquirer");
const questions = require("./questions");

const createApp = require("./createApp");
const { runCommands, createDirectories, createFiles } = require("./utils");
const changePackageJsonDetail = require("./lib/changePackageJson");

const init = async (folderName) => {
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

  const answers = await inquirer.prompt(questions);

  const { commands, directories, files } = createApp(projectPath, answers);

  console.log(chalk.green("Downloading files and packages..."));

  await Promise.all([
    runCommands(commands),
    createDirectories(directories),
    createFiles(files),
  ]);

  changePackageJsonDetail(projectName);

  console.log(chalk.green("Your App is ready!"));
};

module.exports = init;
