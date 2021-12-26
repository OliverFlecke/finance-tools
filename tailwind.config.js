const colors = require('tailwindcss/colors');

module.exports = {
	content: ['src/**/*.{html,tsx}', 'node_modules/@oliverflecke/**/*.tsx'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				...colors,
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['odd', 'last', 'first'],
		},
	},
	plugins: [],
};
