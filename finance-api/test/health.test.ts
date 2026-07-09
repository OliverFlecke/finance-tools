import { describe, expect, it } from "vitest";
import { createWorker } from "./helpers/miniflare";
import { createTestToken } from "./helpers/token";

describe("health endpoints", () => {
	async function authWorker() {
		const { jwk } = await createTestToken();
		const mf = await createWorker({ TEST_JWK: JSON.stringify(jwk) });
		return mf;
	}

	it("GET /livez returns 200", async () => {
		const mf = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/livez");
		expect(res.status).toBe(200);
		await mf.dispose();
	});

	it("GET /readyz returns 200", async () => {
		const mf = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/readyz");
		expect(res.status).toBe(200);
		await mf.dispose();
	});

	it("GET /nonexistent returns 404", async () => {
		const mf = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/nonexistent");
		expect(res.status).toBe(404);
		await mf.dispose();
	});
});
