import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      prettier,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      semi: "error",
      "react/no-unescaped-entities": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/no-use-before-define": ["error"],
      "no-use-before-define": "off",
      "no-await-in-loop": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "prefer-promise-reject-errors": "warn",
      "spaced-comment": "error",
      "no-duplicate-imports": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\u0000", "^@?w"], ["^@/"], ["^."], ["^.+.(css|scss)$"]],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/no-named-as-default-member": "warn",
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
