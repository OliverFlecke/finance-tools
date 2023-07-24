module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'plugin:cypress/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:@next/next/recommended',
	],
	rules: {
		'prettier/prettier': 'warn',
		'@typescript/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': [
			'error',
			{
				additionalHooks: '(useAsync|useAsyncCallback)',
			},
		],
	},
};
