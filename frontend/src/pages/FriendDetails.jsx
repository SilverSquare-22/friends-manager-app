import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FriendDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [friend, setFriend] = useState(null);

    useEffect(() => {
        const fetchFriend = async () => {
            const userId = localStorage.getItem("userId");

            const response = await fetch(
                `http://localhost:5000/api/friends/${id}?userId=${userId}`
            );
            const data = await response.json();

            setFriend(data);
        };

        fetchFriend();
    }, [id]);

    if (!friend) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <button onClick={() => navigate("/dashboard")}>
                Back to Friends
            </button>

            <h1>{friend.name}</h1>
            <p>Email: {friend.email}</p>
            <p>Phone: {friend.phone}</p>
            <p>Role: {friend.role}</p>
            <p>Bio: {friend.bio}</p>
            <p>Hobbies: {friend.hobbies}</p>
            <p>Date Joined: {friend.date_joined}</p>

            {friend.image_url && (
                <img
                    src={friend.image_url}
                    alt={friend.name}
                    width="150"
                />
            )}
        </div>
    );
}

export default FriendDetails;