import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function FriendDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [friend, setFriend] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFriend = async () => {
            try {
                const userId = localStorage.getItem("userId");

                const response = await fetch(
                    `http://localhost:5000/api/friends/${id}?userId=${userId}`
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "Unable to load friend.");
                    return;
                }

                setFriend(data);
            } catch (err) {
                setError("Unable to connect to the server.");
            }
        };

        fetchFriend();
    }, [id]);

    if (error) {
        return (
            <div className="details-page">
                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Back to Friends
                </button>

                <div className="details-error">
                    <div>😕</div>
                    <h2>Friend not found</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!friend) {
        return (
            <div className="details-page">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading friend details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="details-page">
            <button
                className="back-btn"
                onClick={() => navigate("/dashboard")}
            >
                ← Back to Friends
            </button>

            <div className="details-card">
                <div className="details-image-section">
                    {friend.image_url ? (
                        <img
                            src={friend.image_url}
                            alt={friend.name}
                            className="details-image"
                        />
                    ) : (
                        <div className="details-placeholder">
                            {friend.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="details-content">
                    <p className="details-label">FRIEND PROFILE</p>

                    <h1>{friend.name}</h1>

                    {friend.role && (
                        <p className="details-role">{friend.role}</p>
                    )}

                    {friend.bio && (
                        <div className="details-bio">
                            <h3>About</h3>
                            <p>{friend.bio}</p>
                        </div>
                    )}

                    <div className="details-info">
                        {friend.email && (
                            <div className="info-item">
                                <span>EMAIL</span>
                                <strong>{friend.email}</strong>
                            </div>
                        )}

                        {friend.phone && (
                            <div className="info-item">
                                <span>PHONE</span>
                                <strong>{friend.phone}</strong>
                            </div>
                        )}

                        {friend.hobbies && (
                            <div className="info-item">
                                <span>HOBBIES</span>
                                <strong>{friend.hobbies}</strong>
                            </div>
                        )}

                        {friend.date_joined && (
                            <div className="info-item">
                                <span>DATE JOINED</span>
                                <strong>{friend.date_joined}</strong>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendDetails;