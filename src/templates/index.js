// src 하위 파일 내용
const appJsTemplate = require("./src/appJs");
const indexHtmlTemplate = require("./src/indexHtml");

// public 하위 파일 내용
const publicIndexHtmlTemplate = require("./public/publicIndexHtml");
const manifestJsonTemplate = require("./public/manifestJson");
const robotsTxTTemplate = require("./public/robotsTxT");

// config 파일 내용
const eslintrc = require("./configs/eslintrc");
const prettierrc = require("./configs/prettierrc");
const tsconfig = require("./configs/tsconfig");

const gitIgnore = require("./extra/gitIgnore");

module.exports = {
  appJsTemplate,
  eslintrc,
  gitIgnore,
  indexHtmlTemplate,
  manifestJsonTemplate,
  prettierrc,
  publicIndexHtmlTemplate,
  robotsTxTTemplate,
  tsconfig,
};
