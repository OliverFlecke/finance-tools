import { describe, expect, it } from "vitest";
import { seedD1 } from "./helpers/d1";
import { createWorker } from "./helpers/miniflare";

describe("health endpoints", () => {
	it("GET /livez returns 200", async () => {
		const mf = await createWorker();
		await seedD1(mf);
		const res = await mf.dispatchFetch("http://localhost/livez");
		expect(res.status).toBe(200);
		await mf.dispose();
	});

	it("GET /readyz returns 200", async () => {
		const mf = await createWorker();
		await seedD1(mf);
		const res = await mf.dispatchFetch("http://localhost/readyz");
		expect(res.status).toBe(200);
		await mf.dispose();
	});

	it("GET /nonexistent returns 404", async () => {
		const mf = await createWorker();
		await seedD1(mf);
		const res = await mf.dispatchFetch("http://localhost/nonexistent");
		expect(res.status).toBe(404);
		await mf.dispose();
	});
});
