export function getValueColorIndicator(value: number): string {
	if (value > 0) return colors.positiveColor;
	else if (value < 0) return colors.negativeColor;
	else return "";
}

export function getBackgroundColorValueIndicator(value: number): string {
	if (value > 0) return colors.positiveBackground;
	else if (value < 0) return colors.negativeBackground;
	else return "";
}

const colors = {
	positiveColor: "value-positive",
	negativeColor: "value-negative",
	positiveBackground: "value-bg-positive",
	negativeBackground: "value-bg-negative",
};

export default colors;
