const generateWithGQLScheme = (schemaPath, env) => {
  const localSchemaJson = require(schemaPath);
  const isProd = process.env.NODE_ENV === env;

  const constructGraphQLRules = (env = 'literal', behavior = 'error') => ({
    'graphql/template-strings': [behavior, { env, schemaJson: localSchemaJson }],
  });

  return {
    env: {
      browser: true,
      jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      sourceType: 'module',
      extraFileExtensions: ['.gql'],
    },
    plugins: ['react', '@typescript-eslint', 'graphql', 'sonarjs', 'promise', 'jest', 'prettier'],
    extends: [
      'react-app',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:sonarjs/recommended',
      'plugin:promise/recommended',
      'plugin:jest/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      'promise/catch-or-return': ['warn', { allowFinally: true }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-console': isProd ? 'error' : 'warn',
      'no-debugger': isProd ? 'error' : 'warn',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'error',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          minimumDescriptionLength: 10,
        },
      ],
      'import/no-cycle': 'error',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'error',
      'import/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'index'],
            'sibling',
            'object',
            'type',
            'unknown',
          ],
          pathGroups: [
            {
              pattern: '*.scss',
              group: 'unknown',
              patternOptions: { matchBase: true },
              position: 'after',
            },
          ],
          'newlines-between': 'always',
          warnOnUnassignedImports: true,
        },
      ],
      'prettier/prettier': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      ...constructGraphQLRules('apollo'),
    },
    overrides: [
      {
        files: ['*.gql'],
        rules: {
          ...constructGraphQLRules('literal'),
        },
      },
    ],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      react: {
        version: 'detect',
      },
    },
  };
};

module.exports = generateWithGQLScheme;