const questions = [
  {
    type: "list",
    name: "reactEnvironment",
    message: "Select the react environment:",
    choices: [
      { name: "React + JavaScript", value: "React + JavaScript" },
      { name: "React + TypeScript", value: "React + TypeScript" },
    ],
  },
  {
    type: "list",
    name: "useReactRouterDom",
    message: "Use React Router Dom?",
    choices: [
      { name: "Yes", value: "Yes" },
      { name: "No", value: "No" },
    ],
  },
  {
    type: "list",
    name: "styleLibrary",
    message: "Select a style library:",
    choices: [
      { name: "styled-components", value: "styled-components" },
      { name: "None", value: "None" },
    ],
  },
  {
    type: "list",
    name: "usePrettierEslint",
    message: "Use Prettier and ESLint?",
    choices: [
      { name: "Yes", value: "Yes" },
      { name: "No", value: "No" },
    ],
  },
];

module.exports = questions;
