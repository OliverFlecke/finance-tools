import { existsSync, readdirSync, readFileSync } from "node:fs";
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

	const migrationsDir = path.join(projectRoot, "migrations");
	const migrations = readdirSync(migrationsDir)
		.filter((f) => f.endsWith(".sql"))
		.sort();
	for (const migration of migrations) {
		await runSqlFile(db, path.join(migrationsDir, migration));
	}

	const testDataPath = path.join(projectRoot, "test", "test-data.sql");
	if (existsSync(testDataPath)) {
		await runSqlFile(db, testDataPath);
	}
}
