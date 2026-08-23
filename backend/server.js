const db = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Friends Manager API is running..." });
});

app.post("/api/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        function (err) {
            if (err) {
                if (err.message.includes("UNIQUE")) {
                    return res.status(409).json({
                        message: "Username already exists"
                    });
                }

                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.status(201).json({
                message: "Account created successfully",
                userId: this.lastID
            });
        }
    );
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (!user) {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            }

            res.json({
                message: "Login successful",
                token: "demo-token",
                userId: user.id
            });
        }
    );
});

app.get("/api/friends", (req, res) => {
    db.all(
        "SELECT * FROM friends WHERE user_id = ?",
        [req.query.userId],
        (err, friends) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.json(friends);
        }
    );
});

app.get("/api/friends/:id", (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;

    db.get(
        "SELECT * FROM friends WHERE id = ? AND user_id = ?",
        [id, userId],
        (err, friend) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (!friend) {
                return res.status(404).json({
                    message: "Friend not found"
                });
            }

            res.json(friend);
        }
    );
});

app.post("/api/friends", (req, res) => {
    const {
        userId,
        name,
        email,
        phone,
        role,
        bio,
        hobbies,
        image_url,
        date_joined
    } = req.body;

    if (!userId || !name || !email) {
        return res.status(400).json({
            message: "User ID, name and email are required"
        });
    }

    const sql = `
        INSERT INTO friends
        (user_id, name, email, phone, role, bio, hobbies, image_url, date_joined)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        userId,
        name,
        email,
        phone,
        role,
        bio,
        hobbies,
        image_url,
        date_joined
    ];

    db.run(sql, values, function (err) {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "Friend added successfully",
            id: this.lastID
        });
    });
});

app.delete("/api/friends/:id", (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            message: "User ID is required"
        });
    }

    db.run(
        "DELETE FROM friends WHERE id = ? AND user_id = ?",
        [id, userId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Friend not found"
                });
            }

            res.json({
                message: "Friend deleted successfully"
            });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});