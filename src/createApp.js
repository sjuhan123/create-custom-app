const path = require("path");
const chalk = require("chalk");

const publicIndexHtmlTemplate = require("./templates/public/publicIndexHtml");
const manifestJsonTemplate = require("./templates/public/manifestJson");
const robotsTxTTemplate = require("./templates/public/robotsTxt");

const tsconfig = require("./configs/tsConfig");
const eslintrc = require("./configs/eslintRc");
const prettierrc = require("./configs/prettierrc");

const indexHtmlTemplate = require("./templates/src/indexHtml");
const appJsTemplate = require("./templates/src/appJs");

const gitIgnore = require("./extra/gitignore");

const createApp = (projectPath, answers) => {
  const {
    reactEnvironment,
    useReactRouterDom,
    styleLibrary,
    usePrettierEslint,
  } = answers;

  // 필요한 패키지 확인
  const installPackages = ["react", "react-dom", "react-scripts"];
  const devPackages = ["@babel/plugin-proposal-private-property-in-object"];

  if (reactEnvironment === "React + TypeScript") {
    installPackages.push("typescript");
    devPackages.push("@types/react", "@types/react-dom");
  }

  if (styleLibrary !== "None") {
    installPackages.push(styleLibrary);

    if (
      styleLibrary === "styled-components" &&
      reactEnvironment === "React + TypeScript"
    ) {
      devPackages.push("@types/styled-components");
    }
  }

  if (useReactRouterDom === "Yes") {
    installPackages.push("react-router-dom");
  }

  if (usePrettierEslint) {
    devPackages.push(
      "prettier",
      "eslint",
      "eslint-plugin-react",
      "eslint-plugin-react-hooks",
      "eslint-plugin-import",
      "eslint-config-prettier",
      "eslint-plugin-prettier",
      "eslint-import-resolver-typescript"
    );

    if (reactEnvironment === "React + TypeScript") {
      devPackages.push(
        "@typescript-eslint/eslint-plugin@^5.0.0",
        "@typescript-eslint/parser@^5.0.0"
      );
    }
  }

  const commands = [
    `npm init -y`,
    `npm install ${installPackages.join(" ")}`,
    `npm install ${devPackages.join(" ")} --save-dev`,
  ];

  const directories = [
    path.join(projectPath, "public"),
    path.join(projectPath, "src"),
    path.join(projectPath, "src/components"),
    path.join(projectPath, "src/pages"),
    path.join(projectPath, "src/hooks"),
    path.join(projectPath, "src/utils"),
    path.join(projectPath, "src/types"),
    path.join(projectPath, "src/constants"),
    path.join(projectPath, "src/context"),
    path.join(projectPath, "src/styles"),
  ];

  const files = [
    {
      filePath: path.join(projectPath, "public", "index.html"),
      content: publicIndexHtmlTemplate,
    },
    {
      filePath: path.join(projectPath, "public", "manifest.json"),
      content: manifestJsonTemplate,
    },
    {
      filePath: path.join(projectPath, "public", "robots.txt"),
      content: robotsTxTTemplate,
    },
    { filePath: ".gitignore", content: gitIgnore },
  ];

  // 사용자가 입력한 값에 따라 config 파일 생성
  if (reactEnvironment === "React + TypeScript") {
    files.push({
      filePath: path.join(projectPath, "tsconfig.json"),
      content: JSON.stringify(tsconfig, null, 2),
    });
  }

  if (usePrettierEslint) {
    files.push({
      filePath: path.join(projectPath, ".eslintrc.json"),
      content: JSON.stringify(eslintrc, null, 2),
    });
    files.push({
      filePath: path.join(projectPath, ".prettierrc"),
      content: JSON.stringify(prettierrc, null, 2),
    });
  }

  if (
    reactEnvironment === "React + JavaScript" ||
    reactEnvironment === "React + TypeScript"
  ) {
    const indexFilePath =
      reactEnvironment === "React + JavaScript"
        ? "src/index.jsx"
        : "src/index.tsx";
    const appFilePath =
      reactEnvironment === "React + JavaScript" ? "src/App.jsx" : "src/App.tsx";

    files.push({
      filePath: path.join(projectPath, indexFilePath),
      content: indexHtmlTemplate,
    });
    files.push({
      filePath: path.join(projectPath, appFilePath),
      content: appJsTemplate,
    });
  }

  return {
    commands,
    directories,
    files,
  };
};

module.exports = createApp;
