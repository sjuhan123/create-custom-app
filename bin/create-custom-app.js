#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const shell = require("shelljs");
const { existsSync, mkdirSync, writeFileSync, readFileSync } = require("fs");
const { join } = require("path");
const inquirer = require("inquirer");

const packageJson = require("../package.json");

const program = new Command();

program
  .description(packageJson.name)
  .version(packageJson.version)
  .arguments("[folderName]")
  .usage(`${chalk.green("[folderName]")} [options]`)
  .action((folderName = ".") => {
    // 사용자가 입력한 폴더 이름 반영
    const projectName = folderName;
    const projectPath = join(process.cwd(), projectName);

    if (!existsSync(projectPath)) {
      mkdirSync(projectPath);
    } else {
      console.log(
        `The folder ${chalk.red(
          folderName
        )} already exist in the current directory, please give it another name.`
      );
      process.exit(1);
    }

    process.chdir(projectPath);

    inquirer
      .prompt([
        {
          type: "list",
          name: "reactEnvironment",
          message: "Select the react environment:",
          choices: ["React + JavaScript", "React + TypeScript"],
        },
        {
          type: "list",
          name: "useReactRouterDom",
          message: "Use React Router Dom?",
          choices: ["Yes", "No"],
        },
        {
          type: "list",
          name: "styleLibrary",
          message: "Select a style library:",
          choices: ["styled-components", "emotion", "none"],
        },
        {
          type: "list",
          name: "usePrettierEslint",
          message: "Use Prettier and ESLint?",
          choices: ["Yes", "No"],
        },
      ])
      .then((answers) => {
        // 사용자가 입력한 값에 따라 dependency 및 devDependency 설정
        const {
          reactEnvironment,
          useReactRouterDom,
          styleLibrary,
          usePrettierEslint,
        } = answers;

        const installPackages = ["react", "react-dom", "react-scripts"];
        const devPackages = [
          "@babel/plugin-proposal-private-property-in-object",
        ];

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

        if (!existsSync(join(projectPath, "public"))) {
          mkdirSync(join(projectPath, "public"));

          const indexHtmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="theme-color" content="#000000">
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
          <title>My App</title>
        </head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <div id="root"></div>
        </body>
        </html>`;

          writeFileSync(
            join(projectPath, "public", "index.html"),
            indexHtmlContent
          );

          const manifestJsonContent = `{
            "short_name": "My App",
            "name": "My App",
            "icons": [
              {
                "src": "%PUBLIC_URL%/favicon.ico",
                "sizes": "64x64 32x32 24x24 16x16",
                "type": "image/x-icon"
              }
            ],
            "start_url": ".",
            "display": "standalone",
            "theme_color": "#000000",
            "background_color": "#ffffff"
          }`;

          writeFileSync(
            join(projectPath, "public", "manifest.json"),
            manifestJsonContent
          );

          const robotsTxtContent = `User-agent: *
          Disallow: /`;

          writeFileSync(
            join(projectPath, "public", "robots.txt"),
            robotsTxtContent
          );
        }

        // 사용자가 입력한 값에 따라 config 파일 생성
        if (reactEnvironment === "React + TypeScript") {
          const tsconfig = {
            compilerOptions: {
              target: "ES6",
              lib: ["dom", "dom.iterable", "esnext"],
              allowJs: true,
              skipLibCheck: true,
              esModuleInterop: true,
              allowSyntheticDefaultImports: true,
              strict: true,
              forceConsistentCasingInFileNames: true,
              noFallthroughCasesInSwitch: true,
              module: "ESNext",
              moduleResolution: "node",
              resolveJsonModule: true,
              isolatedModules: true,
              noEmit: true,
              jsx: "react",
              outDir: "./dist",
            },
            include: ["src"],
          };
          writeFileSync("tsconfig.json", JSON.stringify(tsconfig, null, 2));
        }

        if (usePrettierEslint) {
          const eslintrc = {
            env: {
              browser: true,
              es2021: true,
            },
            parser: "@typescript-eslint/parser",
            parserOptions: {
              ecmaFeatures: {
                jsx: true,
              },
            },
            extends: [
              "eslint:recommended",
              "plugin:react/recommended",
              "plugin:@typescript-eslint/recommended",
              "prettier",
            ],
            plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
            rules: {
              "prettier/prettier": [
                2,
                {
                  endOfLine: "auto",
                },
              ],
              "react/function-component-definition": [
                2,
                { namedComponents: "arrow-function" },
              ],
              "react/react-in-jsx-scope": 0,
              camelcase: 2,
              "spaced-comment": 2,
              quotes: [2, "single"],
              "no-duplicate-imports": 2,
              "react/no-unescaped-entities": 0,
              "react/prop-types": 0,
              "react/self-closing-comp": 2,
              "padding-line-between-statements": [
                2,
                {
                  blankLine: "always",
                  prev: ["const", "let", "var"],
                  next: "*",
                },
                {
                  blankLine: "any",
                  prev: ["const", "let", "var"],
                  next: ["const", "let", "var"],
                },
                {
                  blankLine: "always",
                  prev: ["case", "default"],
                  next: "*",
                },
              ],
            },
          };

          writeFileSync(".eslintrc.json", JSON.stringify(eslintrc, null, 2));

          const prettierrc = {
            arrowParens: "avoid",
            bracketSpacing: true,
            endOfLine: "auto",
            htmlWhitespaceSensitivity: "css",
            jsxBracketSameLine: false,
            jsxSingleQuote: false,
            printWidth: 120,
            proseWrap: "preserve",
            quoteProps: "consistent",
            semi: true,
            singleQuote: true,
            tabWidth: 2,
            trailingComma: "es5",
            requirePragma: false,
            insertPragma: false,
            overrides: [
              {
                files: "*.json",
                options: {
                  printWidth: 200,
                },
              },
            ],
          };
          writeFileSync(".prettierrc", JSON.stringify(prettierrc, null, 2));
        }

        mkdirSync("src");
        mkdirSync("src/components");
        mkdirSync("src/pages");
        mkdirSync("src/hooks");
        mkdirSync("src/utils");
        mkdirSync("src/types");
        mkdirSync("src/constants");
        mkdirSync("src/context");
        mkdirSync("src/styles");

        if (
          reactEnvironment === "React + JavaScript" ||
          reactEnvironment === "React + TypeScript"
        ) {
          const indexContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

          const appContent = `import React from 'react';

const App = () => {
  return <div>Hello!</div>;
};

export default App;
`;

          if (reactEnvironment === "React + JavaScript") {
            writeFileSync("src/index.jsx", indexContent);
            writeFileSync("src/App.jsx", appContent);
          } else {
            writeFileSync("src/index.tsx", indexContent);
            writeFileSync("src/App.tsx", appContent);
          }
        }

        const packageJsonPath = "package.json";
        const packageJsonContent = readFileSync(packageJsonPath, "utf8");
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

        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        const gitIgnoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
        `;

        writeFileSync(".gitignore", gitIgnoreContent);

        console.log(chalk.green("Your App is ready!"));
      });
  });

program.parse(process.argv);
