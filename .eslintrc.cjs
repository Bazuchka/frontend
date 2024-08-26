module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        sourceType: "module",
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      "plugin:prettier/recommended",
      "plugin:react/recommended",
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', "*.test.ts"],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        "react-hooks/exhaustive-deps": "warn",
        "react/react-in-jsx-scope": "off",
        curly: "error",
        "@typescript-eslint/no-unused-vars": "error",
    },
  }
  
