import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    };

    return (
        <header className="app-header">
            <div
                className="brand"
                onClick={() => navigate("/dashboard")}
            >
                <span className="brand-icon">👥</span>
                <span>Friends Manager</span>
            </div>

            <nav className="header-actions">
                <button
                    className="header-add-btn"
                    onClick={() => navigate("/add-friend")}
                >
                    + Add Friend
                </button>

                <button
                    className="header-logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}

export default Header;