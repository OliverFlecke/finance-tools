// biome-ignore-all lint/suspicious/noExplicitAny: fine in tests

import { describe, expect, it } from "vitest";
import { seedD1 } from "./helpers/d1";
import { createWorker } from "./helpers/miniflare";
import { createTestToken } from "./helpers/token";

describe("account endpoint", () => {
	async function authWorker() {
		const { jwk, token } = await createTestToken();
		const mf = await createWorker({ TEST_JWK: JSON.stringify(jwk) });
		await seedD1(mf);
		return { mf, jwk, token };
	}

	function authHeaders(token: string) {
		return {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
	}

	it("GET /api/v1/account without auth returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/api/v1/account");
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("GET /api/v1/account with invalid token returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/api/v1/account", {
			headers: { Authorization: "Bearer invalid-token" },
		});
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("GET /api/v1/account with valid token returns seed account", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch("http://localhost/api/v1/account", {
			headers: { Authorization: `Bearer ${token}` },
		});
		expect(res.status).toBe(200);
		const body: any = await res.json();
		expect(body).toHaveProperty("accounts");
		expect(body.accounts.length).toBe(1);
		expect(body.accounts[0].id).toBe("00000000-0000-0000-0000-000000000002");
		expect(body.accounts[0].name).toBe("Test Account");
		expect(body.accounts[0].currency).toBe("SGD");
		expect(body.accounts[0].kind).toBe("Cash");

		await mf.dispose();
	});

	it("POST /api/v1/account without auth returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/api/v1/account", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: "New Account", currency: "USD", kind: "Cash" }),
		});
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("POST /api/v1/account with invalid token returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch("http://localhost/api/v1/account", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer invalid-token",
			},
			body: JSON.stringify({ name: "New Account", currency: "USD", kind: "Cash" }),
		});
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("POST /api/v1/account with valid token creates an account", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch("http://localhost/api/v1/account", {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify({ name: "Savings Account", currency: "USD", kind: "Cash" }),
		});
		expect(res.status).toBe(200);
		const body: any = await res.json();
		expect(body).toHaveProperty("id");
		expect(typeof body.id).toBe("string");

		await mf.dispose();
	});

	it("POST /api/v1/account creates an investment account", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch("http://localhost/api/v1/account", {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify({ name: "Brokerage", currency: "SGD", kind: "Investment" }),
		});
		expect(res.status).toBe(200);
		const body = await res.json();
		expect(body).toHaveProperty("id");

		await mf.dispose();
	});

	it("POST creates account then GET returns it alongside seed data", async () => {
		const { mf, token } = await authWorker();

		const postRes = await mf.dispatchFetch("http://localhost/api/v1/account", {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify({ name: "New Account", currency: "USD", kind: "Cash" }),
		});
		expect(postRes.status).toBe(200);
		const { id: accountId } = (await postRes.json()) as any;
		expect(accountId).toBeDefined();
		expect(typeof accountId).toBe("string");

		const getRes = await mf.dispatchFetch("http://localhost/api/v1/account", {
			headers: { Authorization: `Bearer ${token}` },
		});
		expect(getRes.status).toBe(200);
		const getBody: any = await getRes.json();
		expect(getBody.accounts.length).toBe(2);
		const ids = getBody.accounts.map((a: any) => a.id);
		expect(ids).toContain("00000000-0000-0000-0000-000000000002");
		expect(ids).toContain(accountId);

		await mf.dispose();
	});

	it("DELETE /api/v1/account/{id} without auth returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{ method: "DELETE" },
		);
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("DELETE /api/v1/account/{id} with invalid token returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{
				method: "DELETE",
				headers: { Authorization: "Bearer invalid-token" },
			},
		);
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("DELETE /api/v1/account/{id} with non-existent id returns 200", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000099999",
			{
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		expect(res.status).toBe(200);

		await mf.dispose();
	});

	it("DELETE /api/v1/account/{id} removes seed account from GET response", async () => {
		const { mf, token } = await authWorker();

		const delRes = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000001",
			{
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		expect(delRes.status).toBe(200);

		const getRes = await mf.dispatchFetch("http://localhost/api/v1/account", {
			headers: { Authorization: `Bearer ${token}` },
		});
		expect(getRes.status).toBe(200);
		const body: any = await getRes.json();
		const ids = body.accounts.map((a: any) => a.id);
		expect(ids).not.toContain("00000000-0000-0000-0000-000000000001");
		expect(ids).toContain("00000000-0000-0000-0000-000000000002");
	});

	it("POST /api/v1/account/{id}/entry without auth returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ date: "2024-06-15", amount: "100.00" }),
			},
		);
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("POST /api/v1/account/{id}/entry with invalid token returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer invalid-token",
				},
				body: JSON.stringify({ date: "2024-06-15", amount: "100.00" }),
			},
		);
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("POST /api/v1/account/{id}/entry with valid token adds an entry", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{
				method: "POST",
				headers: authHeaders(token),
				body: JSON.stringify({ date: "2024-06-15", amount: "500.00" }),
			},
		);
		expect(res.status).toBe(200);

		const db = await mf.getD1Database("prod_d1_finance");
		const entry = await db
			.prepare("SELECT amount FROM account_entry WHERE account_id = ? AND date = ?")
			.bind("00000000-0000-0000-0000-000000000002", "2024-06-15")
			.first<{ amount: number }>();
		expect(entry?.amount).toBe(500);

		await mf.dispose();
	});

	it("POST /api/v1/account/{id}/entry with non-existent account returns 404", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000099999",
			{
				method: "POST",
				headers: authHeaders(token),
				body: JSON.stringify({ date: "2024-06-15", amount: "100.00" }),
			},
		);
		expect(res.status).toBe(404);

		await mf.dispose();
	});

	it("POST /api/v1/account/{id}/entry upserts on duplicate date", async () => {
		const { mf, token } = await authWorker();
		const accountId = "00000000-0000-0000-0000-000000000002";
		const date = "2024-06-15";

		// First insert
		const res1 = await mf.dispatchFetch(`http://localhost/api/v1/account/${accountId}`, {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify({ date, amount: "100.00" }),
		});
		expect(res1.status).toBe(200);

		// Upsert with new amount
		const res2 = await mf.dispatchFetch(`http://localhost/api/v1/account/${accountId}`, {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify({ date, amount: "250.00" }),
		});
		expect(res2.status).toBe(200);

		const db = await mf.getD1Database("prod_d1_finance");
		const entries = await db
			.prepare("SELECT amount FROM account_entry WHERE account_id = ? AND date = ?")
			.bind(accountId, date)
			.all<{ amount: number }>();
		expect(entries.results.length).toBe(1);
		expect(entries.results[0].amount).toBe(250);

		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} without auth returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: "Renamed" }),
			},
		);
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} with invalid token returns 401", async () => {
		const { mf } = await authWorker();
		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer invalid-token",
				},
				body: JSON.stringify({ name: "Renamed" }),
			},
		);
		expect(res.status).toBe(401);
		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} updates name", async () => {
		const { mf, token } = await authWorker();

		const patchRes = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{
				method: "PATCH",
				headers: authHeaders(token),
				body: JSON.stringify({ name: "Renamed Account" }),
			},
		);
		expect(patchRes.status).toBe(200);

		const getRes = await mf.dispatchFetch("http://localhost/api/v1/account", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const body: any = await getRes.json();
		const account = body.accounts.find((a: any) => a.id === "00000000-0000-0000-0000-000000000002");
		expect(account.name).toBe("Renamed Account");
		expect(account.currency).toBe("SGD");
		expect(account.kind).toBe("Cash");

		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} updates currency", async () => {
		const { mf, token } = await authWorker();

		const patchRes = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{
				method: "PATCH",
				headers: authHeaders(token),
				body: JSON.stringify({ currency: "USD" }),
			},
		);
		expect(patchRes.status).toBe(200);

		const getRes = await mf.dispatchFetch("http://localhost/api/v1/account", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const body: any = await getRes.json();
		const account = body.accounts.find((a: any) => a.id === "00000000-0000-0000-0000-000000000002");
		expect(account.name).toBe("Test Account");
		expect(account.currency).toBe("USD");

		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} updates kind", async () => {
		const { mf, token } = await authWorker();

		const patchRes = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000000002",
			{
				method: "PATCH",
				headers: authHeaders(token),
				body: JSON.stringify({ kind: "Investment" }),
			},
		);
		expect(patchRes.status).toBe(200);

		const getRes = await mf.dispatchFetch("http://localhost/api/v1/account", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const body: any = await getRes.json();
		const account = body.accounts.find((a: any) => a.id === "00000000-0000-0000-0000-000000000002");
		expect(account.kind).toBe("Investment");

		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} updates archived", async () => {
		const { mf, token } = await authWorker();
		const accountId = "00000000-0000-0000-0000-000000000002";

		const patchRes = await mf.dispatchFetch(`http://localhost/api/v1/account/${accountId}`, {
			method: "PATCH",
			headers: authHeaders(token),
			body: JSON.stringify({ archived: true }),
		});
		expect(patchRes.status).toBe(200);

		const db = await mf.getD1Database("prod_d1_finance");
		const row = await db
			.prepare("SELECT archived FROM account WHERE id = ?")
			.bind(accountId)
			.first<{ archived: number }>();
		expect(row?.archived).toBe(1);

		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} updates sort_key", async () => {
		const { mf, token } = await authWorker();
		const accountId = "00000000-0000-0000-0000-000000000002";

		const patchRes = await mf.dispatchFetch(`http://localhost/api/v1/account/${accountId}`, {
			method: "PATCH",
			headers: authHeaders(token),
			body: JSON.stringify({ sort_key: 99 }),
		});
		expect(patchRes.status).toBe(200);

		const db = await mf.getD1Database("prod_d1_finance");
		const row = await db
			.prepare("SELECT sort_key FROM account WHERE id = ?")
			.bind(accountId)
			.first<{ sort_key: number }>();
		expect(row?.sort_key).toBe(99);

		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} updates all fields", async () => {
		const { mf, token } = await authWorker();
		const accountId = "00000000-0000-0000-0000-000000000002";

		const patchRes = await mf.dispatchFetch(`http://localhost/api/v1/account/${accountId}`, {
			method: "PATCH",
			headers: authHeaders(token),
			body: JSON.stringify({
				name: "Full Update",
				currency: "EUR",
				kind: "Investment",
				archived: true,
				sort_key: 42,
			}),
		});
		expect(patchRes.status).toBe(200);

		const db = await mf.getD1Database("prod_d1_finance");
		const row = await db
			.prepare("SELECT name, currency, type, archived, sort_key FROM account WHERE id = ?")
			.bind(accountId)
			.first<{
				name: string;
				currency: string;
				type: number;
				archived: number;
				sort_key: number;
			}>();
		expect(row?.name).toBe("Full Update");
		expect(row?.currency).toBe("EUR");
		expect(row?.type).toBe(1);
		expect(row?.archived).toBe(1);
		expect(row?.sort_key).toBe(42);

		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} with empty body makes no changes", async () => {
		const { mf, token } = await authWorker();
		const accountId = "00000000-0000-0000-0000-000000000002";

		const patchRes = await mf.dispatchFetch(`http://localhost/api/v1/account/${accountId}`, {
			method: "PATCH",
			headers: authHeaders(token),
			body: JSON.stringify({}),
		});
		expect(patchRes.status).toBe(200);

		const getRes = await mf.dispatchFetch("http://localhost/api/v1/account", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const body: any = await getRes.json();
		const account = body.accounts.find((a: any) => a.id === accountId);
		expect(account.name).toBe("Test Account");
		expect(account.currency).toBe("SGD");
		expect(account.kind).toBe("Cash");

		await mf.dispose();
	});

	it("PATCH /api/v1/account/{id} with non-existent id returns 404", async () => {
		const { mf, token } = await authWorker();

		const res = await mf.dispatchFetch(
			"http://localhost/api/v1/account/00000000-0000-0000-0000-000000099999",
			{
				method: "PATCH",
				headers: authHeaders(token),
				body: JSON.stringify({ name: "Noop" }),
			},
		);
		expect(res.status).toBe(404);

		await mf.dispose();
	});

	it("DELETE /api/v1/account/{id} removes an account created via POST", async () => {
		const { mf, token } = await authWorker();

		const postRes = await mf.dispatchFetch("http://localhost/api/v1/account", {
			method: "POST",
			headers: authHeaders(token),
			body: JSON.stringify({ name: "Temp Account", currency: "EUR", kind: "Cash" }),
		});
		expect(postRes.status).toBe(200);
		const { id: accountId } = (await postRes.json()) as any;

		const delRes = await mf.dispatchFetch(`http://localhost/api/v1/account/${accountId}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		});
		expect(delRes.status).toBe(200);

		const db = await mf.getD1Database("prod_d1_finance");
		const after = await db
			.prepare("SELECT COUNT(*) as count FROM account WHERE id = ? AND deleted_at IS NOT NULL")
			.bind(accountId)
			.first<{ count: number }>();
		expect(after.count).toBe(1);
	});
});
