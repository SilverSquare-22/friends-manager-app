import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import "../App.css";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Account created successfully!");
            navigate("/");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-icon">✨</div>

                <h1>Create Account</h1>
                <p className="auth-subtitle">
                    Start building your circle
                </p>

                <form onSubmit={handleRegister} className="auth-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="primary-btn">
                        Create Account
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="link-btn"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Register;