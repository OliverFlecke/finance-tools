import { describe, expect, it } from "vitest";
import { createWorker } from "./helpers/miniflare";
import { createTestToken } from "./helpers/token";

describe("stock endpoint", () => {
	it("GET /api/v1/stock without auth returns 401", async () => {
		const { jwk } = await createTestToken();
		const mf = await createWorker({ TEST_JWK: JSON.stringify(jwk) });

		const res = await mf.dispatchFetch("http://localhost/api/v1/stock?symbols=AAPL");
		expect(res.status).toBe(401);

		await mf.dispose();
	});

	it("GET /api/v1/stock with invalid token returns 401", async () => {
		const { jwk } = await createTestToken();
		const mf = await createWorker({ TEST_JWK: JSON.stringify(jwk) });

		const res = await mf.dispatchFetch("http://localhost/api/v1/stock?symbols=AAPL", {
			headers: { Authorization: "Bearer invalid-token" },
		});
		expect(res.status).toBe(401);

		await mf.dispose();
	});
});
