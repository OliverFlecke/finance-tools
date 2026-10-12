// biome-ignore-all lint/suspicious/noExplicitAny: fine in tests

import { describe, expect, it } from "vitest";
import { seedD1 } from "./helpers/d1";
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

describe("stock event endpoints", () => {
	async function authWorker() {
		const { jwk, token } = await createTestToken();
		const mf = await createWorker({ TEST_JWK: JSON.stringify(jwk) });
		await seedD1(mf);
		return { mf, token };
	}

	function authHeaders(token: string) {
		return {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
	}

	const sampleCsv =
		"Symbol,Trade Date,Purchase Price,Quantity,Commission,Comment,Transaction Type\n" +
		"CSPX.L,20260116,745.3,36.0,14.63,,BUY\n" +
		"CSPX.L,20260115,747.2382,54.0,21.99,,BUY\n";

	it("GET /api/v1/stock/event without auth returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/api/v1/stock/event");
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("POST /api/v1/stock/event/import without auth returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/api/v1/stock/event/import", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ portfolio: "IBKR", csv: sampleCsv }),
		});
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("GET /api/v1/stock/event with valid token returns no events initially", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch("http://localhost/api/v1/stock/event", {
			headers: { Authorization: `Bearer ${token}` },
		});
		expect(res.status).toBe(200);
		const body: any = await res.json();
		expect(body.events).toEqual([]);

		await mf.dispose();
	});

	it("POST /api/v1/stock/event/import imports events, visible via GET", async () => {
		const { mf, token } = await authWorker();

		const importRes = await mf.dispatchFetch("http://localhost/api/v1/stock/event/import", {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify({ portfolio: "IBKR", csv: sampleCsv }),
		});
		expect(importRes.status).toBe(200);
		const importBody: any = await importRes.json();
		expect(importBody.imported).toBe(2);

		const getRes = await mf.dispatchFetch("http://localhost/api/v1/stock/event", {
			headers: { Authorization: `Bearer ${token}` },
		});
		expect(getRes.status).toBe(200);
		const body: any = await getRes.json();
		expect(body.events.length).toBe(2);
		expect(body.events[0].symbol).toBe("CSPX.L");
		expect(body.events[0].portfolio).toBe("IBKR");
		expect(body.events[0].kind).toBe("Buy");

		await mf.dispose();
	});

	it("POST /api/v1/stock/event/import with invalid CSV returns 400", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch("http://localhost/api/v1/stock/event/import", {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify({
				portfolio: "IBKR",
				csv: "Symbol,Trade Date,Purchase Price,Quantity,Commission,Comment,Transaction Type\nAAPL,20260101,1,1,0,,SPLIT\n",
			}),
		});
		expect(res.status).toBe(400);

		await mf.dispose();
	});

	it("POST /api/v1/stock/event without auth returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/api/v1/stock/event", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				portfolio: "IBKR",
				symbol: "AAPL",
				kind: "Buy",
				quantity: 1,
				price: 1,
				commission: 0,
			}),
		});
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("POST /api/v1/stock/event records a single transaction, visible via GET", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch("http://localhost/api/v1/stock/event", {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify({
				portfolio: "IBKR",
				symbol: "AAPL",
				kind: "Sell",
				quantity: 10,
				price: 123.45,
				commission: 1.5,
			}),
		});
		expect(res.status).toBe(200);

		const getRes = await mf.dispatchFetch("http://localhost/api/v1/stock/event", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const body: any = await getRes.json();
		expect(body.events.length).toBe(1);
		expect(body.events[0].portfolio).toBe("IBKR");
		expect(body.events[0].symbol).toBe("AAPL");
		expect(body.events[0].kind).toBe("Sell");
		expect(body.events[0].quantity).toBe(10);
		expect(body.events[0].price).toBe(123.45);
		expect(body.events[0].commission).toBe(1.5);

		await mf.dispose();
	});
});
