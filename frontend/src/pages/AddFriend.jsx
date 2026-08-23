import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

        const response = await fetch("http://localhost:5000/api/friends", {
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
        <div>
            <button onClick={() => navigate("/dashboard")}>
                Back to Friends
            </button>

            <h1>Add New Friend</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <input
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                />

                <textarea
                    name="bio"
                    placeholder="Bio"
                    value={formData.bio}
                    onChange={handleChange}
                />

                <input
                    name="hobbies"
                    placeholder="Hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                />

                <input
                    name="image_url"
                    placeholder="Image URL"
                    value={formData.image_url}
                    onChange={handleChange}
                />

                <input
                    name="date_joined"
                    type="date"
                    value={formData.date_joined}
                    onChange={handleChange}
                />

                <button type="submit">Add Friend</button>
            </form>
        </div>
    );
}

export default AddFriend;