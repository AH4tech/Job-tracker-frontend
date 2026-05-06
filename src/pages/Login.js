import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    // 🤔 Kyun useState? — Form fields ka local state
    // Sirf is component ko chahiye — Context mein nahi
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // 🤔 Kyun alag state? — Loading aur error
    // Form data se alag concern hai inका
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 🏛️ Reception se login function lo
    // Kyun? — Auth logic centralized hai Context mein
    const { login } = useAuth();

    // 🤔 Kyun useNavigate? — Login ke baad
    // dashboard pe programmatically bhejna hai
    const navigate = useNavigate();

    // 🤔 Kyun ek handler? — Har field ke liye
    // alag function banana code duplication hai
    const handleChange = (e) => {
        setFormData({
            ...formData,            // Purane values rakho
            [e.target.name]: e.target.value  // Sirf yeh update karo
            // Kyun computed property? — Dynamic key update
        });
    };

    const handleSubmit = async (e) => {

        // 🤔 Kyun preventDefault? — Form submit hone par
        // page reload hota hai — woh rokna hai
        e.preventDefault();
        setLoading(true);
        setError('');

        // 🏛️ Reception ko bolo — Login karo
        const result = await login(
            formData.email,
            formData.password
        );

        if (result.success) {
            // ✅ Login hua — Dashboard pe bhejo
            navigate('/dashboard');
        } else {
            // ❌ Login fail — Error dikhao
            // Kyun setError? — User ko batana hai kya galat hua
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                {/* 🏷️ Title */}
                <h2 style={styles.title}>
                    Welcome Back! 👋
                </h2>
                <p style={styles.subtitle}>
                    Login to track your jobs
                </p>

                {/* ❌ Error Message */}
                {/* 🤔 Kyun conditional? — Error na ho toh
                    empty div dikhana achha nahi lagta */}
                {error && (
                    <div style={styles.error}>
                        ❌ {error}
                    </div>
                )}

                {/* 📝 Login Form */}
                <form onSubmit={handleSubmit}>

                    {/* 📧 Email Field */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            // 🤔 Kyun value? — Controlled component
                            // React state = input value
                            // Dono sync rehte hain
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="rahul@gmail.com"
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* 🔒 Password Field */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* 🚀 Submit Button */}
                    <button
                        type="submit"
                        // 🤔 Kyun disabled? — Double submit rokna
                        // Loading mein baar baar click na ho
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1
                        }}>
                        {/* 🤔 Kyun conditional text? — User ko
                            feedback dena hai kaam ho raha hai */}
                        {loading ? '⏳ Logging in...' : '🔑 Login'}
                    </button>
                </form>

                {/* 🔗 Register Link */}
                {/* 🤔 Kyun Link? — Page reload nahi hoga */}
                <p style={styles.linkText}>
                    New here?{' '}
                    <Link to="/register" style={styles.link}>
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        backgroundColor: '#f0f2f5',
    },
    card: {
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '420px',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: '0.3rem',
        textAlign: 'center',
    },
    subtitle: {
        color: '#666',
        textAlign: 'center',
        marginBottom: '1.5rem',
    },
    error: {
        backgroundColor: '#ffe0e0',
        color: '#d00',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '1rem',
        fontSize: '0.9rem',
    },
    formGroup: {
        marginBottom: '1.2rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.4rem',
        color: '#333',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        boxSizing: 'border-box',
        outline: 'none',
    },
    button: {
        width: '100%',
        padding: '0.85rem',
        backgroundColor: '#1a1a2e',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '0.5rem',
    },
    linkText: {
        textAlign: 'center',
        marginTop: '1.2rem',
        color: '#666',
    },
    link: {
        color: '#e94560',
        textDecoration: 'none',
        fontWeight: 'bold',
    }
};

export default Login;