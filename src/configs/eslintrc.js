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

module.exports = eslintrc;
