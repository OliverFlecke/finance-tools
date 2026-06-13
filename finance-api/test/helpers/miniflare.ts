import path from "node:path";
import process from "node:process";
import { Miniflare } from "miniflare";

export async function createWorker() {
	const projectRoot = process.cwd();
	const mf = new Miniflare({
		modules: true,
		scriptPath: path.join(projectRoot, "build", "index.js"),
		modulesRules: [{ type: "CompiledWasm", include: ["**/*.wasm"] }],
		compatibilityDate: "2026-06-12",
		d1Databases: {
			prod_d1_finance: "91b36f0c-b572-4232-b6e3-dbf491bb7395",
		},
	});
	return mf;
}
