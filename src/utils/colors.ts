export function getValueColorIndicator(value: number): string {
	if (value > 0) return colors.positiveColor;
	else if (value < 0) return colors.negativeColor;
	else return '';
}

export function getBackgroundColorValueIndicator(value: number): string {
	if (value > 0) return colors.positiveBackground;
	else if (value < 0) return colors.positiveBackground;
	else return '';
}

const colors = {
	positiveColor: 'text-green-700 dark:text-green-500',
	negativeColor: 'text-red-700 dark:text-red-500',
	positiveBackground: 'bg-green-400 dark:bg-green-700',
	negativeBackground: 'bg-red-400 dark:bg-red-700',
};

export default colors;
