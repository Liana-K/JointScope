CREATE TABLE recovery_test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_date DATE NOT NULL,   -- date of test
    angle REAL NOT NULL,       -- measured angle
    week INTEGER NOT NULL      -- assigned week based on angle
);




