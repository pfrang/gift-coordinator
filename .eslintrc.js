module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "testing-library",
    "import",
    "jest",
    "react-hooks",
    "prettier",
    "unicorn",
    "folders",
  ],
  ignorePatterns: ["/.next", "/ui-kit/dist", "/docs"],
  extends: ["prettier", "prettier/prettier", "plugin:prettier/recommended"],
  rules: {
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "@ui-kit/**",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: [],
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "index",
          "sibling",
        ],
        "newlines-between": "always",
      },
    ],
    eqeqeq: ["error"],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          "{}": false,
        },
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["typeLike", "enumMember"],
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: false,
        },
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
        ignore: [/\[(.*?)\]/],
      },
    ],
    // "folders/match-regex": [2, "^([a-z0-9_][a-z0-9]*)(-[a-z0-9]+)*$", "/src/"],
  },
};
