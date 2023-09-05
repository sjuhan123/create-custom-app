// 같은 디렉토리에 있는 파일들 import 해서 export하기

const setAndGetRootDir = require("./setAndGetRootDir");
const getDirs = require("./getDirs");
const getFiles = require("./getFiles");
const getCommands = require("./getCommands");
const getQuestions = require("./getQuestions");
const modifyPackageJson = require("./modifyPackageJson");

module.exports = {
  setAndGetRootDir,
  getDirs,
  getFiles,
  getCommands,
  getQuestions,
  modifyPackageJson,
};
