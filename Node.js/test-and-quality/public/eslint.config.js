import js from "@eslint/js";
import {defineConfig} from "eslint/config";
import globals from "globals";

export default defineConfig([
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery
      },
      ecmaVersion: 2020,
      sourceType: 'script'
    },
    rules: {
      "no-var": "off",
      "prefer-const": "off"
    }
  }
]);
