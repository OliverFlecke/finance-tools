module.exports = {
	content: ['src/**/*.{html,tsx}', 'node_modules/@oliverflecke/**/*.tsx'],
	darkMode: 'class',
	variants: {
		extend: {
			backgroundColor: ['odd', 'last', 'first'],
		},
	},
	plugins: [],
};
