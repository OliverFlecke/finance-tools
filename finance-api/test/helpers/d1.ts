import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import type { Miniflare } from "miniflare";

export async function seedD1(mf: Miniflare) {
	const projectRoot = process.cwd();

	const migrationSql = readFileSync(
		path.join(projectRoot, "migrations", "0001_initial.sql"),
		"utf-8",
	);

	// Strip comment lines, then split on ";" to get individual statements.
	const statements = migrationSql
		.split("\n")
		.filter((line) => !line.trimStart().startsWith("--"))
		.join("\n")
		.split(";")
		.map((s) => s.trim())
		.filter((s) => s.length > 0);

	const db = await mf.getD1Database("prod_d1_finance");
	await db.batch(statements.map((sql) => db.prepare(sql)));
}
