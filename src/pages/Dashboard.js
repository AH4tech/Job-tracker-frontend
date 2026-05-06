import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import JobCard from '../components/JobCard';
import {
    fetchJobs,
    addJob,
    updateJob,
    deleteJob
} from '../redux/jobSlice';

const Dashboard = () => {

    // 🤔 Kyun useDispatch? — Redux actions trigger karna
    // Godown manager ko order dena
    const dispatch = useDispatch();

    // 🤔 Kyun useSelector? — Redux store se data lena
    // Godown se saamaan mangana
    const { jobs, loading, error } = useSelector(
        state => state.jobs
    );

    useEffect(() => {
        // 🔍 Checkpoint 4: Data inside Component
        console.log("DEBUG: Dashboard Component Jobs State:", jobs);
    }, [jobs]);

    // 🏛️ Reception se user lo
    const { user } = useAuth();

    // 🤔 Kyun local state? — UI state hai — Redux mein
    // nahi jaayega — sirf is component ko chahiye
    const [showForm, setShowForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    // 🤔 Kyun editingJob? — Edit mein form pre-fill karna
    // null = Add mode, job object = Edit mode

    const [formData, setFormData] = useState({
        companyName: '',
        jobTitle: '',
        status: 'APPLIED',
        appliedDate: '',
        notes: ''
    });

    // 🤔 Kyun useEffect? — Component mount hone pe
    // ek baar jobs fetch karo automatically
    // Dependency array [] = sirf ek baar chalega
    useEffect(() => {
        dispatch(fetchJobs());
        // 🤔 Kyun dispatch? — Async thunk trigger karna
        // Godown manager ko kaam dena
    }, [dispatch]);

    useEffect(() => {
        console.log("Current Jobs in Redux:", jobs);
    }, [jobs]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ✏️ Edit Button Click — Form pre-fill karo
    const handleEdit = (job) => {
        // 🤔 Kyun setEditingJob? — Kaun si job edit ho
        // rahi hai track karna — PUT request mein ID chahiye
        setEditingJob(job);
        setFormData({
            companyName: job.companyName,
            jobTitle: job.jobTitle,
            status: job.status,
            appliedDate: job.appliedDate,
            notes: job.notes || ''
        });
        // 🤔 Kyun setShowForm? — Form dikhana
        setShowForm(true);
    };

    // ❌ Delete Button Click
    const handleDelete = (id) => {
        // 🤔 Kyun confirm? — Accidental delete rokna
        if (window.confirm(
            'Are you sure you want to delete?')) {
            dispatch(deleteJob(id));
        }
    };

    // 📝 Form Reset — Add mode mein jaana
    const handleAddNew = () => {
        // 🤔 Kyun reset? — Edit ke baad add karo toh
        // purana data na dikhe
        setEditingJob(null);
        setFormData({
            companyName: '',
            jobTitle: '',
            status: 'APPLIED',
            appliedDate: '',
            notes: ''
        });
        setShowForm(true);
    };

    // 🚀 Form Submit — Add ya Edit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingJob) {
            // ✏️ Edit mode — Update karo
            // 🤔 Kyun editingJob.id? — Kaun si job
            // update karni hai backend ko batana
            await dispatch(updateJob({
                id: editingJob.id,
                jobData: formData
            }));
        } else {
            // ➕ Add mode — Naya job add karo
            await dispatch(addJob(formData));
        }

        // ✅ Form band karo
        setShowForm(false);
        setEditingJob(null);
    };

    // 📊 Stats Calculate karo
    // 🤔 Kyun? — Dashboard pe summary dikhani hai
    const stats = {
        total: jobs.length,
        applied: jobs.filter(
            j => j.status === 'APPLIED').length,
        interview: jobs.filter(
            j => j.status === 'INTERVIEW').length,
        offered: jobs.filter(
            j => j.status === 'OFFERED').length,
        rejected: jobs.filter(
            j => j.status === 'REJECTED').length,
    };

    return (
        <div style={styles.container}>

            {/* 👋 Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>
                        Welcome, {user?.name}! 👋
                    </h1>
                    <p style={styles.subtitle}>
                        Track your job applications
                    </p>
                </div>

                {/* ➕ Add Job Button */}
                <button
                    onClick={handleAddNew}
                    style={styles.addBtn}>
                    ➕ Add Job
                </button>
            </div>

            {/* 📊 Stats Cards */}
            <div style={styles.statsGrid}>
                {[
                    {
                        label: 'Total',
                        value: stats.total,
                        color: '#1a1a2e'
                    },
                    {
                        label: 'APPLIED',
                        value: stats.applied,
                        color: '#3498db'
                    },
                    {
                        label: 'INTERVIEW',
                        value: stats.interview,
                        color: '#f39c12'
                    },
                    {
                        label: 'OFFERED',
                        value: stats.offered,
                        color: '#2ecc71'
                    },
                    {
                        label: 'REJECTED',
                        value: stats.rejected,
                        color: '#e74c3c'
                    },
                ].map((stat) => (
                    // 🤔 Kyun map? — Same UI repeat
                    // karna — DRY principle
                    <div key={stat.label}
                         style={{
                             ...styles.statCard,
                             borderTop:
                                 `4px solid ${stat.color}`
                         }}>
                        <h3 style={{
                            color: stat.color,
                            fontSize: '2rem',
                            margin: 0
                        }}>
                            {stat.value}
                        </h3>
                        <p style={styles.statLabel}>
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* 📝 Add/Edit Form Modal */}
            {/* 🤔 Kyun conditional render? — showForm
                false ho toh DOM mein nahi rahega */}
            {showForm && (
                <div style={styles.modal}>
                    <div style={styles.modalCard}>

                        <h2 style={styles.modalTitle}>
                            {/* 🤔 Kyun ternary? — Add ya
                                Edit mode pata karna */}
                            {editingJob
                                ? '✏️ Edit Job'
                                : '➕ Add New Job'}
                        </h2>

                        <form onSubmit={handleSubmit}>

                            {/* 🏢 Company */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    Company Name
                                </label>
                                <input
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Google, Amazon..."
                                    style={styles.input}
                                    required
                                />
                            </div>

                            {/* 💼 Job Title */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    Job Title
                                </label>
                                <input
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    placeholder="DevOps Engineer..."
                                    style={styles.input}
                                    required
                                />
                            </div>

                            {/* 🎯 Status */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    Status
                                </label>
                                {/* 🤔 Kyun select? — Fixed options
                                    hain — dropdown best hai */}
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={styles.input}>
                                    <option value="APPLIED">
                                        Applied
                                    </option>
                                    <option value="INTERVIEW">
                                        Interview
                                    </option>
                                    <option value="OFFERED">
                                        Offered
                                    </option>
                                    <option value="REJECTED">
                                        Rejected
                                    </option>
                                </select>
                            </div>

                            {/* 📅 Date */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    Applied Date
                                </label>
                                <input
                                    type="date"
                                    name="appliedDate"
                                    value={formData.appliedDate}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            {/* 📝 Notes */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    Notes (Optional)
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Referral se apply kiya..."
                                    style={{
                                        ...styles.input,
                                        height: '80px',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            {/* 🎮 Buttons */}
                            <div style={styles.formActions}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={styles.submitBtn}>
                                    {loading
                                        ? '⏳ Saving...'
                                        : editingJob
                                            ? '✏️ Update'
                                            : '➕ Add Job'}
                                </button>

                                {/* ❌ Cancel */}
                                {/* 🤔 Kyun type="button"? — Default
                                    type submit hota hai — form
                                    submit ho jaata */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowForm(false)}
                                    style={styles.cancelBtn}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 📋 Jobs List */}
            {loading && !jobs.length ? (
                // ⏳ Pehli baar load ho raha hai
                <p style={styles.center}>
                    ⏳ Loading jobs...
                </p>
            ) : jobs.length === 0 ? (
                // 📭 Koi job nahi
                <p style={styles.center}>
                    No jobs yet! Click ➕ Add Job to start.
                </p>
            ) : (
                // 📋 Jobs Grid
                <div style={styles.jobsGrid}>
                    {jobs.map((job) => (
                        // 🤔 Kyun key={job.id}? — React ko
                        // list items identify karne ke liye
                        // Performance optimize hoti hai
                        <JobCard
                            key={job.id}
                            job={job}
                            onEdit={handleEdit}
                            onDelete={()=>handleDelete(job.id)}
                        />
                    ))}
                </div>
            )}

            {/* ❌ Error */}
            {error && (
                <p style={styles.error}>❌ {error}</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '1.8rem',
        color: '#1a1a2e',
        margin: 0,
    },
    subtitle: {
        color: '#666',
        margin: '0.3rem 0 0 0',
    },
    addBtn: {
        backgroundColor: '#1a1a2e',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1rem',
        marginBottom: '2rem',
    },
    statCard: {
        backgroundColor: 'white',
        padding: '1.2rem',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    statLabel: {
        color: '#666',
        margin: '0.3rem 0 0 0',
        fontSize: '0.9rem',
    },
    modal: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        // 🤔 Kyun zIndex? — Baaki content ke upar dikhna
    },
    modalCard: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        // 🤔 Kyun overflowY? — Chhoti screen pe scroll ho
    },
    modalTitle: {
        color: '#1a1a2e',
        marginBottom: '1.5rem',
    },
    formGroup: {
        marginBottom: '1rem',
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
    formActions: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
    },
    submitBtn: {
        flex: 1,
        padding: '0.75rem',
        backgroundColor: '#1a1a2e',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    cancelBtn: {
        flex: 1,
        padding: '0.75rem',
        backgroundColor: '#f0f0f0',
        color: '#333',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    jobsGrid: {
        display: 'grid',
        gridTemplateColumns:
            'repeat(auto-fill, minmax(300px, 1fr))',
        // 🤔 Kyun auto-fill? — Screen size ke hisaab se
        // automatic columns — Responsive design
        gap: '1.5rem',
    },
    center: {
        textAlign: 'center',
        color: '#666',
        marginTop: '3rem',
        fontSize: '1.1rem',
    },
    error: {
        color: '#e74c3c',
        textAlign: 'center',
        marginTop: '1rem',
    }
};

export default Dashboard;