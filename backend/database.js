const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./friends.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS friends (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            role TEXT,
            bio TEXT,
            hobbies TEXT,
            image_url TEXT,
            date_joined TEXT
        )
    `);

    db.run(
        `INSERT OR IGNORE INTO users (username, password)
     VALUES (?, ?)`,
        ["admin", "admin123"]
    );
});

db.run(
    `INSERT OR IGNORE INTO friends 
    (id, name, email, phone, role, bio, hobbies, image_url, date_joined)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
        1,
        "Arjun Kumar",
        "arjun@example.com",
        "+91 9876543210",
        "Software Developer",
        "Loves building things and exploring new technologies.",
        "Coding, Gaming, Coffee",
        "https://i.pravatar.cc/150?img=12",
        "2026-08-20"
    ]
);

module.exports = db;