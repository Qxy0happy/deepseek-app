import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite-plus'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
  version: string
}

const apiOrigin = 'https://api.deepseek.com'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-app-version',
      transformIndexHtml: () => [
        {
          tag: 'meta',
          attrs: { name: 'application-version', content: pkg.version },
          injectTo: 'head',
        },
      ],
    },
    {
      name: 'emit-license',
      apply: 'build',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'LICENSE',
          source: readFileSync(new URL('./LICENSE', import.meta.url), 'utf8'),
        })
      },
    },
  ],
  define: {
    __API_ORIGIN__: JSON.stringify(apiOrigin),
  },
  server: {
    port: 8090,
  },
  build: {
    target: ['chrome105', 'edge105', 'safari16', 'firefox110'],
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'static/js/[name].[hash:8].js',
        chunkFileNames: 'static/js/[name].[hash:8].js',
        assetFileNames: 'static/assets/[name].[hash:8][extname]',
      },
    },
  },
  css: {
    modules: {
      generateScopedName: '[local]-[hash:6]',
    },
  },
  // .oxfmtrc.json mirrors this block for the Oxfmt LSP, which does not read vite.config.ts.
  fmt: {
    trailingComma: 'es5',
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    printWidth: 100,
    sortPackageJson: false,
    ignorePatterns: ['dist/**', 'pnpm-lock.yaml'],
  },
  lint: {
    plugins: ['typescript', 'import', 'react'],
    categories: {
      correctness: 'error',
    },
    env: {
      builtin: true,
    },
    rules: {
      'constructor-super': 'error',
      'for-direction': 'error',
      'getter-return': 'error',
      'no-async-promise-executor': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-self-assign': 'error',
      'no-setter-return': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-labels': 'error',
      'no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
        },
      ],
      'no-useless-backreference': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-with': 'error',
      'require-yield': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'no-array-constructor': 'error',
      'no-useless-constructor': 'error',
      'import/no-default-export': 'error',
      'no-console': 'error',
      'import/no-cycle': 'error',
      curly: ['error', 'all'],
      'no-alert': 'error',
      'typescript/ban-ts-comment': [
        'error',
        {
          minimumDescriptionLength: 10,
        },
      ],
      'typescript/ban-types': 'error',
      'typescript/no-duplicate-enum-values': 'error',
      'typescript/no-dynamic-delete': 'error',
      'typescript/no-explicit-any': 'error',
      'typescript/no-extra-non-null-assertion': 'error',
      'typescript/no-extraneous-class': 'error',
      'typescript/no-invalid-void-type': 'error',
      'typescript/no-misused-new': 'error',
      'typescript/no-namespace': 'error',
      'typescript/no-non-null-asserted-nullish-coalescing': 'error',
      'typescript/no-non-null-asserted-optional-chain': 'error',
      'typescript/no-non-null-assertion': 'error',
      'typescript/no-this-alias': 'error',
      'typescript/no-unnecessary-type-constraint': 'error',
      'typescript/no-unsafe-declaration-merging': 'error',
      'typescript/no-var-requires': 'error',
      'typescript/prefer-as-const': 'error',
      'typescript/prefer-literal-enum-member': 'error',
      'typescript/prefer-ts-expect-error': 'error',
      'typescript/triple-slash-reference': 'error',
      'typescript/unified-signatures': 'error',
      'react/display-name': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/rules-of-hooks': 'error',
      'react/exhaustive-deps': 'error',
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
  },
})
