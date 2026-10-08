import styles from "./Guide.module.css";

const Guide = () => {
	return (
		<section className={styles.guide}>
			<h2 className={styles.heading}>Guide to tax calculator</h2>
			<p className={styles.paragraph}>
				This calculator is used to give estimations for what a salary would translate to in another
				country, and on how much tax you will have pay for a given income in that country. It is
				designed to allow you to easily compare across countries.{" "}
				<em>This should in no way be used for actual tax forms</em>.
			</p>

			<p className={styles.paragraph}>
				Currently only a limited number of countries and their tax systems are available. I plan to
				extend this in the future to support more countries and possible add a way to add your own,
				and provide better inside where the tax percentages is gather from (government website in
				the individual countries).
			</p>
		</section>
	);
};

export default Guide;
