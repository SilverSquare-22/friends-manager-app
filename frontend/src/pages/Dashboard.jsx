import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    };

    useEffect(() => {
        const fetchFriends = async () => {
            const userId = localStorage.getItem("userId");

            const response = await fetch(
                `http://localhost:5000/api/friends?userId=${userId}`
            );

            const data = await response.json();

            setFriends(data);
        };

        fetchFriends();
    }, []);

    return (
        <div>
            <h1>Friends Dashboard</h1>

            <button onClick={() => navigate("/add-friend")}>
                Add New Friend
            </button>

            <button onClick={handleLogout}>
                Logout
            </button>

            {friends.map((friend) => (
                <div
                    key={friend.id}
                    onClick={() => navigate(`/friends/${friend.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <h2>{friend.name}</h2>
                    <p>{friend.role}</p>
                    <p>{friend.bio}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;