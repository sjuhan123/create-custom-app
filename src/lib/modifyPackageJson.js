const fs = require("fs");

const modifyPackageJson = (projectName) => {
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
};

module.exports = modifyPackageJson;
