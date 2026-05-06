import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={styles.nav}>
            <Link to="/dashboard" style={styles.brand}>
                Job Tracker Pro
            </Link>

            <div style={styles.right}>
                {isLoggedIn ? (
                    <>
                        <span style={styles.username}>{user?.name}</span>
                        <button onClick={handleLogout} style={styles.logoutBtn}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>
                            Login
                        </Link>
                        <Link to="/register" style={styles.link}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex', // Fixed typo
        justifyContent: 'space-between',
        alignItems: 'center', // Fixed typo
        padding: '1rem 2rem',
        backgroundColor: '#1a1a2e',
        color: 'white',
    },
    brand: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    right: {
        display: 'flex', // Fixed typo
        alignItems: 'center', // Fixed typo
        gap: '1rem',
    },
    username: {
        color: '#e0e0e0',
        fontSize: '0.9rem',
    },
    logoutBtn: {
        backgroundColor: '#e94560',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px', // Fixed typo
        cursor: 'pointer',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
    }
};

export default Navbar;
