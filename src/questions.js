const questions = [
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
    choices: ["styled-components", "none"],
  },
  {
    type: "list",
    name: "usePrettierEslint",
    message: "Use Prettier and ESLint?",
    choices: ["Yes", "No"],
  },
];

module.exports = questions;
