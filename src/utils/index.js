const fs = require("fs");
const shell = require("shelljs");

const runCommands = async (commands) => {
  await Promise.all(
    commands.map((command) => {
      shell.exec(command);
    })
  );
};

const createDirectories = async (directories) => {
  const promises = directories.map(async (directory) => {
    try {
      await fs.promises.mkdir(directory, { recursive: true });
    } catch (error) {
      if (error.code !== "EEXIST") {
        throw error;
      }
    }
  });

  await Promise.all(promises);
};

const createFiles = async (files) => {
  await Promise.all(
    files.map(({ filePath, content }) => {
      return fs.promises.writeFile(filePath, content);
    })
  );
};

module.exports = {
  runCommands,
  createDirectories,
  createFiles,
};
