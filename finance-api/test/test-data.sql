INSERT INTO "project" ("id", "name") VALUES ('00000000-0000-0000-0000-000000000001', 'Test Project');
INSERT INTO "project_access" ("project_id", "user_id") VALUES ('00000000-0000-0000-0000-000000000001', 'test|user123');
INSERT INTO "account" ("id", "project_id", "name", "type", "currency", "sort_key") VALUES ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Test Account', 0, 'SGD', 0);
INSERT INTO "account_entry" ("date", "account_id", "amount") VALUES ('2024-01-01', '00000000-0000-0000-0000-000000000002', 1000.00);
