import type { Miniflare } from "miniflare";
import { seedD1 } from "./d1";
import { createWorker } from "./miniflare";

const instances = new Set<Miniflare>();

export async function startWorker() {
	const mf = await createWorker();
	await seedD1(mf);
	instances.add(mf);
	return mf;
}

export async function stopWorker(mf: Miniflare) {
	instances.delete(mf);
	await mf.dispose();
}

export async function stopAllWorkers() {
	for (const mf of instances) {
		await mf.dispose();
	}
	instances.clear();
}
