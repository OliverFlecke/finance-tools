import React from 'react';

const Guide = () => {
	return (
		<section className="mt-8 flex w-full flex-col items-center justify-center space-y-4 rounded bg-zinc-100 px-4 py-4 dark:bg-zinc-900">
			<h2 className="text-center text-xl font-bold text-cyan-700 dark:text-cyan-600">
				Guide to tax calculator
			</h2>
			<p className="max-w-prose text-sm">
				This calculator is used to give estimations for what a salary would
				translate to in another country, and on how much tax you will have pay
				for a given income in that country. It is designed to allow you to
				easily compare across countries.{' '}
				<em>This should in no way be used for actual tax forms</em>.
			</p>

			<p className="max-w-prose text-sm">
				Currently only a limited number of countries and their tax systems are
				available. I plan to extend this in the future to support more countries
				and possible add a way to add your own, and provide better inside where
				the tax percentages is gather from (government website in the individual
				countries).
			</p>
		</section>
	);
};

export default Guide;
