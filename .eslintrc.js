module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-cond-assign": [
      "error",
      "always"
    ],
    "camelcase": [
      "error",
      { properties: "never" }
    ],
    "brace-style": [
      "error",
      "1tbs",
      { "allowSingleLine": true }
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "comma-spacing": [
      "error",
      { "before": false, "after": true }
    ],
    "max-len": [
      "error",
      { "ignoreUrls": true, "ignoreTrailingComments": true }
    ]
  }
};
