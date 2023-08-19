const fs = require("fs");
const path = require("path");

const shell = require("shelljs");
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

const createApp = (projectPath, projectName, answers) => {
  const {
    reactEnvironment,
    useReactRouterDom,
    styleLibrary,
    usePrettierEslint,
  } = answers;

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

  shell.exec(`npm init -y`);
  console.log(chalk.green("Downloading files and packages..."));
  shell.exec(`npm install ${installPackages.join(" ")}`);
  shell.exec(`npm install ${devPackages.join(" ")} --save-dev`);

  fs.mkdirSync(path.join(projectPath, "public"));

  fs.writeFileSync(
    path.join(projectPath, "public", "index.html"),
    publicIndexHtmlTemplate
  );

  fs.writeFileSync(
    path.join(projectPath, "public", "manifest.json"),
    manifestJsonTemplate
  );

  fs.writeFileSync(
    path.join(projectPath, "public", "robots.txt"),
    robotsTxTTemplate
  );

  // 사용자가 입력한 값에 따라 config 파일 생성
  if (reactEnvironment === "React + TypeScript") {
    fs.writeFileSync("tsconfig.json", JSON.stringify(tsconfig, null, 2));
  }

  if (usePrettierEslint) {
    fs.writeFileSync(".eslintrc.json", JSON.stringify(eslintrc, null, 2));
    fs.writeFileSync(".prettierrc", JSON.stringify(prettierrc, null, 2));
  }

  fs.writeFileSync(".gitignore", gitIgnore);

  fs.mkdirSync("src");
  fs.mkdirSync("src/components");
  fs.mkdirSync("src/pages");
  fs.mkdirSync("src/hooks");
  fs.mkdirSync("src/utils");
  fs.mkdirSync("src/types");
  fs.mkdirSync("src/constants");
  fs.mkdirSync("src/context");
  fs.mkdirSync("src/styles");

  if (
    reactEnvironment === "React + JavaScript" ||
    reactEnvironment === "React + TypeScript"
  ) {
    if (reactEnvironment === "React + JavaScript") {
      fs.writeFileSync("src/index.jsx", indexHtmlTemplate);
      fs.writeFileSync("src/App.jsx", appJsTemplate);
    } else {
      fs.writeFileSync("src/index.tsx", indexHtmlTemplate);
      fs.writeFileSync("src/App.tsx", appJsTemplate);
    }
  }

  const packageJsonPath = "package.json";
  const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonContent);

  packageJson.name = projectName;
  packageJson.scripts = {
    start: "react-scripts start",
    build: "react-scripts build",
    test: "react-scripts test",
    eject: "react-scripts eject",
  };
  packageJson.eslintConfig = {
    extends: ["react-app"],
  };
  packageJson.browserslist = {
    production: [">0.2%", "not dead", "not op_mini all"],
    development: [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version",
    ],
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(chalk.green("Your App is ready!"));
};

module.exports = createApp;
