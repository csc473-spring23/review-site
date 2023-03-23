module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
  // parserOptions: {
  //   project: true,
  //   tsconfigRootDir: __dirname,
  // },
  plugins: ["@typescript-eslint", "jsx-a11y"],
  root: true,
};
