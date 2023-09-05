const chalk = require("chalk");
const inquirer = require("inquirer");

const { runCommands, createDirectories, createFiles } = require("./utils");
const {
  setAndGetRootDir,
  getDirs,
  getFiles,
  modifyPackageJson,
  getCommands,
  getQuestions,
} = require("./lib");

const init = async (folderName) => {
  const { projectName, projectPath } = setAndGetRootDir(folderName);

  const answers = await inquirer.prompt(getQuestions());

  const commands = getCommands(answers);
  const dirs = getDirs(projectPath);
  const files = getFiles(projectPath, answers);

  console.log(chalk.green("\nDownloading files and packages...\n"));

  await Promise.all([
    runCommands(commands),
    createDirectories(dirs),
    createFiles(files),
    modifyPackageJson(projectName),
  ]);

  console.log(chalk.green("Your App is ready!"));
};

module.exports = init;
