import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",        // inline-style components; add later with TS
      "react/react-in-jsx-scope": "off", // not needed with React 17+ JSX transform
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
