module.exports = {
	content: [
		'{src,pages}/**/*.{html,tsx}',
		'node_modules/@oliverflecke/**/*.tsx',
	],
	darkMode: 'class',
	variants: {
		extend: {
			backgroundColor: ['odd', 'last', 'first'],
		},
	},
	plugins: [],
};
