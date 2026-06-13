import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import type { Miniflare } from "miniflare";

function runSqlFile(db: D1Database, filePath: string) {
	const sql = readFileSync(filePath, "utf-8");
	const statements = sql
		.split("\n")
		.filter((line) => !line.trimStart().startsWith("--"))
		.join("\n")
		.split(";")
		.map((s) => s.trim())
		.filter((s) => s.length > 0);
	return db.batch(statements.map((sql) => db.prepare(sql)));
}

export async function seedD1(mf: Miniflare) {
	const projectRoot = process.cwd();
	const db = await mf.getD1Database("prod_d1_finance");

	await runSqlFile(db, path.join(projectRoot, "migrations", "0001_initial.sql"));

	const testDataPath = path.join(projectRoot, "test", "test-data.sql");
	if (existsSync(testDataPath)) {
		await runSqlFile(db, testDataPath);
	}
}
