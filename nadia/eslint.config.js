import js from "@eslint/js";
import {defineConfig, globalIgnores} from "eslint/config";
import globals from "globals";

export default defineConfig([
  globalIgnores(["public/contrib/*"]),
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    rules: {
      "no-multiple-empty-lines": "warn",
      "no-var": "error",
      "prefer-const": "error"
    }
  }
]);
