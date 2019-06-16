module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    // "extends": "eslint:recommended",
    "extends": "plugin:@typescript-eslint/recommended",
    "parserOptions": {
      "project": "./tsconfig.json"
    },
    "parser": "@typescript-eslint/parser",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        // TODO: depend by env
        "no-console": 0,
        "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/no-explicit-any" : 0
    },
    plugins: [
      '@typescript-eslint'
    ]
};
