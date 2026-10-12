-- Migration number: 0002 	 2026-10-11T00:00:00.000Z
CREATE TABLE IF NOT EXISTS stock_event (
	id uuid NOT NULL PRIMARY KEY,
	project_id uuid NOT NULL,
	portfolio text NOT NULL,
	symbol text NOT NULL,
	kind integer NOT NULL,
	trade_date date NOT NULL,
	quantity NUMERIC(20, 6) NOT NULL,
	price NUMERIC(20, 6) NOT NULL,
	commission NUMERIC(20, 6) NOT NULL DEFAULT 0,
	currency text NOT NULL DEFAULT 'USD',
	comment text,
	created_at TEXT NOT NULL DEFAULT (datetime('now')),

	FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_stock_event_project ON stock_event(project_id);
