const path = require("path");
const {
  publicIndexHtmlTemplate,
  manifestJsonTemplate,
  robotsTxTTemplate,
  gitIgnore,
  tsconfig,
  eslintrc,
  prettierrc,
  indexHtmlTemplate,
  appJsTemplate,
} = require("../templates");

const getFiles = (projectPath, answers) => {
  const { reactEnvironment, usePrettierEslint } = answers;
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

  return files;
};

module.exports = getFiles;
