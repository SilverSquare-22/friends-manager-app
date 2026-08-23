import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import "../App.css";

function AddFriend() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        bio: "",
        hobbies: "",
        image_url: "",
        date_joined: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            alert("Name and email are required");
            return;
        }

        const response = await fetch(`${API_URL}/api/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                userId: localStorage.getItem("userId"),
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Friend added successfully!");
            navigate("/dashboard");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="add-friend-page">
            <button
                className="back-btn"
                onClick={() => navigate("/dashboard")}
            >
                ← Back to Friends
            </button>

            <div className="form-header">
                <p className="details-label">YOUR CIRCLE</p>
                <h1>Add New Friend</h1>
                <p>
                    Add someone to your circle and keep their details in one place.
                </p>
            </div>

            <form className="friend-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            name="name"
                            placeholder="e.g. Anagha Parameswar"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="e.g. anagha@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            name="phone"
                            placeholder="e.g. +91 9988776655"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <input
                            name="role"
                            placeholder="e.g. Creative Designer"
                            value={formData.role}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        placeholder="A little about them..."
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Hobbies</label>
                        <input
                            name="hobbies"
                            placeholder="e.g. Music, Gaming, Travel"
                            value={formData.hobbies}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date Joined</label>
                        <input
                            name="date_joined"
                            type="date"
                            value={formData.date_joined}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Profile Image URL</label>
                    <input
                        name="image_url"
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        value={formData.image_url}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Cancel
                    </button>

                    <button type="submit" className="primary-btn submit-btn">
                        Add Friend
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddFriend;