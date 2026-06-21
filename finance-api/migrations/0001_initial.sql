-- Migration number: 0001 	 2026-06-12T13:38:56.013Z
CREATE TABLE IF NOT EXISTS project (
	id uuid NOT NULL PRIMARY KEY,
	name text NOT NULL
);

CREATE TABLE IF NOT EXISTS project_access (
	project_id uuid NOT NULL,
	user_id uuid NOT NULL,

	FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS account (
    id uuid NOT NULL PRIMARY KEY,
	project_id uuid NOT NULL,
    name text NOT NULL,
    type integer NOT NULL,
    currency varchar(3) DEFAULT 'USD' NOT NULL,
    sort_key integer DEFAULT 0 NOT NULL,
	archived INTEGER NOT NULL DEFAULT 0,
	deleted_at TEXT,

	FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS account_entry (
    date date NOT NULL,
    account_id uuid NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,

	FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);
