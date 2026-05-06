import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
        // 🤔 Kyun confirmPassword? — Frontend validation
        // Backend pe load daalne se pehle check karo
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 🤔 Kyun frontend validation? — Backend call se pehle
        // unnecessary API call bachao
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // 🤔 Kyun length check? — Basic security
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters!');
            return;
        }

        setLoading(true);

        const result = await register(
            formData.name,
            formData.email,
            formData.password
        );

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                <h2 style={styles.title}>
                    Create Account 🚀
                </h2>
                <p style={styles.subtitle}>
                    Start tracking your dream job!
                </p>

                {error && (
                    <div style={styles.error}>
                        ❌ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* 👤 Name */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Rahul Sharma"
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* 📧 Email */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="rahul@gmail.com"
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* 🔒 Password */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Min 6 characters"
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* 🔒 Confirm Password */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            style={styles.input}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1
                        }}>
                        {loading
                            ? '⏳ Creating Account...'
                            : '🚀 Create Account'}
                    </button>
                </form>

                <p style={styles.linkText}>
                    Already have account?{' '}
                    <Link to="/login" style={styles.link}>
                        Login
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

export default Register;