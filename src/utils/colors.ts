export function getValueColorIndicator(value: number): string {
	if (value > 0) return colors.positiveColor;
	else if (value < 0) return colors.negativeColor;
	else return '';
}

const colors = {
	positiveColor: 'text-green-700 dark:text-green-500',
	negativeColor: 'text-red-700 dark:text-red-500',
};

export default colors;
