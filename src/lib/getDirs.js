const path = require("path");

const getDirs = (projectPath) => {
  return [
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
};

module.exports = getDirs;
