const getCommands = (answers) => {
  const {
    reactEnvironment,
    styleLibrary,
    useReactRouterDom,
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

  const commands = [
    `npm init -y`,
    `npm install ${installPackages.join(" ")}`,
    `npm install ${devPackages.join(" ")} --save-dev`,
  ];

  return commands;
};

module.exports = getCommands;
