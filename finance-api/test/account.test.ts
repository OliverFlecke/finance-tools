import { describe, expect, it } from "vitest";
import { seedD1 } from "./helpers/d1";
import { createWorker } from "./helpers/miniflare";

describe("account endpoint", () => {
	it("GET /api/v1/account without auth returns 401", async () => {
		const mf = await createWorker();
		await seedD1(mf);
		const res = await mf.dispatchFetch("http://localhost/api/v1/account");
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("GET /api/v1/account with invalid token returns 401", async () => {
		const mf = await createWorker();
		await seedD1(mf);
		const res = await mf.dispatchFetch("http://localhost/api/v1/account", {
			headers: { Authorization: "Bearer invalid-token" },
		});
		expect(res.status).toBe(401);
		await mf.dispose();
	});
});
