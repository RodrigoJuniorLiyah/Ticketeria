module.exports = {
  root: true,
  extends: ['@react-native'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  env: {
    'react-native/react-native': true,
    es2021: true,
    jest: true,
  },
  rules: {
    // TypeScript
    '@typescript-eslint/prefer-const': 'off', // Regra removida do plugin v8+, usar 'prefer-const' do ESLint padrão
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-var-requires': 'off',

    // Code Style - Arrow Functions (padrão do projeto)
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'prefer-arrow-callback': 'error',
    'arrow-body-style': ['warn', 'as-needed'],

    // Naming Conventions (camelCase para variáveis, PascalCase para componentes)
    // Desabilitado para propriedades de objeto para permitir snake_case em chaves de objeto literal
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true,
        ignoreImports: false,
        ignoreGlobals: false,
        allow: ['^in_progress$', '^created_at$', '^updated_at$', '^created_by$', '^updated_by$'],
      },
    ],

    // Comments - Evitar comentários desnecessários
    'spaced-comment': [
      'warn',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],

    // Imports Organization
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-alert': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error',
    'no-unused-expressions': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-return': 'error',
    'no-useless-concat': 'error',
    'prefer-destructuring': [
      'warn',
      {
        array: false,
        object: true,
      },
    ],

    // Spacing
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'eol-last': ['error', 'always'],

    // React Native - Desencorajar estilos inline (usamos styled-components)
    // Configurado como warning para permitir exceções legítimas:
    // 1. Animated.View/Text/Image - para animações dinâmicas (opacity, transform, etc)
    // 2. contentContainerStyle - propriedade específica do ScrollView/FlatList
    // 3. Componentes de terceiros que requerem estilos inline
    // 4. Estilos condicionais muito simples em componentes nativos específicos
    'react-native/no-inline-styles': 'warn',
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx', '*.spec.ts', '*.spec.tsx'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};
