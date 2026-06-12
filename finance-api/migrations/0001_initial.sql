-- Migration number: 0001 	 2026-06-12T13:38:56.013Z
CREATE TABLE project (
	id uuid NOT NULL PRIMARY KEY,
	name text NOT NULL
);

CREATE TABLE project_access (
	project_id uuid NOT NULL,
	user_id text NOT NULL,

	FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE account (
    id uuid NOT NULL PRIMARY KEY,
	project_id uuid NOT NULL,
    name text NOT NULL,
    type integer NOT NULL,
    currency varchar(3) DEFAULT 'USD' NOT NULL,
    sort_key integer DEFAULT 0 NOT NULL,

	FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE account_entry (
    date date NOT NULL,
    account_id uuid NOT NULL,
    amount decimal(15, 2) NOT NULL,

	FOREIGN KEY (account_id) REFERENCES account(id)
);
