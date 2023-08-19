#!/usr/bin/env node

const { Command } = require("commander");
const packageJson = require("../package.json");
const init = require("../src/index");

const program = new Command();

program
  .description(packageJson.name)
  .version(packageJson.version)
  .arguments("[folderName]")
  .action((folderName = ".") => {
    init(folderName);
  });

program.parse(process.argv);
