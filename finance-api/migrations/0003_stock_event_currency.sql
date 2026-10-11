-- Migration number: 0003 	 2026-10-11T00:00:00.000Z
ALTER TABLE stock_event ADD COLUMN currency text NOT NULL DEFAULT 'USD';
