const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		mode: 'all',
		enable: true,
		content: ['src/**/*.html', 'src/**/*.tsx', 'node_modules/@oliverflecke/**/*.tsx'],
	},
	darkMode: 'class', // or 'media' or 'class'
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
