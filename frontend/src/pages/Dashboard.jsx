import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import "../App.css";

function Dashboard() {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriends = async () => {
            const userId = localStorage.getItem("userId");

            const response = await fetch(
                `${API_URL}/api/friends?userId=${userId}`
            );

            const data = await response.json();

            setFriends(data);
        };

        fetchFriends();
    }, []);

    return (
        <div className="dashboard-page">
            <section className="dashboard-hero">
                <div>
                    <p className="dashboard-label">YOUR CIRCLE</p>
                    <h1>My Friends</h1>
                    <p className="dashboard-subtitle">
                        Keep track of the people who matter.
                    </p>
                </div>

                <div className="friend-count">
                    <strong>{friends.length}</strong>
                    <span>{friends.length === 1 ? "Friend" : "Friends"}</span>
                </div>
            </section>

            {friends.length === 0 ? (
                <section className="empty-state">
                    <div className="empty-icon">👥</div>

                    <h2>Your circle is empty</h2>

                    <p>
                        Add your first friend and start building your circle.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/add-friend")}
                    >
                        + Add Your First Friend
                    </button>
                </section>
            ) : (
                <section className="friends-grid">
                    {friends.map((friend) => (
                        <article
                            className="friend-card"
                            key={friend.id}
                            onClick={() => navigate(`/friends/${friend.id}`)}
                        >
                            <div className="friend-image-wrapper">
                                {friend.image_url ? (
                                    <img
                                        src={friend.image_url}
                                        alt={friend.name}
                                        className="friend-image"
                                    />
                                ) : (
                                    <div className="friend-placeholder">
                                        {friend.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="friend-card-content">
                                <h2>{friend.name}</h2>

                                {friend.role && (
                                    <p className="friend-role">{friend.role}</p>
                                )}

                                {friend.bio && (
                                    <p className="friend-bio">{friend.bio}</p>
                                )}

                                <span className="view-friend">
                                    View details →
                                </span>
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </div>
    );
}

export default Dashboard;