const colors = require('tailwindcss/colors');

module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		mode: 'all',
		enable: true,
		content: ['src/**/*.html', 'src/**/*.tsx'],
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
			backgroundColor: ['odd'],
		},
	},
	plugins: [],
};
