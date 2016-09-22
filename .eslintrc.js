module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "mocha": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "arrow-spacing": ["error"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "camelcase": ["error", { properties: "never" }],
    "comma-dangle": ["error", "never"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "indent": ["error", 2],
    "max-len": ["error", { "ignoreUrls": true, "ignoreTrailingComments": true }],
    "no-cond-assign": ["error", "always"],
    "no-const-assign": ["error"],
    "no-extra-semi": ["error"],
    "no-return-assign": ["error", "always"],
    "no-var": ["error"],
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "spaced-comment": ["error", "always"],
    "template-curly-spacing": ["error", "never"]
  }
};
