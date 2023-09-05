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

module.exports = prettierrc;
