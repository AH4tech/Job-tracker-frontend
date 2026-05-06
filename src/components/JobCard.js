

const JobCard = ({job, onEdit, onDelete}) => {

    const statusColors ={
        APPLIED : '#3498ab',
        INTERVIEW: '#f39c12',
        OFFERED: '#2ecc71',
        REJECTED: '#e74c3c',
    };
    return (
     <div style={styles.card}>
         <div style={styles.header}>
             <h3 style={styles.company}>
                 {job.companyName}
             </h3>

             <span style={{
                 ...styles.badge,
                 backgroundColor: statusColors[job.status],
             }}>
                 {job.status}
             </span>
         </div>

         <p style={styles.jobTitle}>
             {job.jobTitle}
         </p>
         <p style={styles.date}>
             Applied : {job.appliedDate}
         </p>
         {job.notes &&(
             <p style={styles.notes}>
                 {job.notes}
             </p>
         )}

         <div style={styles.actions}>
             <button onClick={()=> onEdit(job)}>
                 Edit
             </button>
             <button onClick={()=> onDelete(job)}>
                 Delete
             </button>
         </div>
     </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '15px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        border: '1px solid #eee',
        transition: 'transform 0.2s ease',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    company: {
        margin: 0,
        fontSize: '1.2rem',
        color: '#2c3e50',
        fontWeight: 'bold',
    },
    badge: {
        padding: '5px 12px',
        borderRadius: '20px',
        color: '#fff',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    jobTitle: {
        margin: '0 0 8px 0',
        fontSize: '1rem',
        color: '#34495e',
        fontWeight: '500',
    },
    date: {
        margin: '0 0 10px 0',
        fontSize: '0.85rem',
        color: '#7f8c8d',
    },
    notes: {
        margin: '10px 0',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
        fontSize: '0.9rem',
        color: '#555',
        fontStyle: 'italic',
        borderLeft: '4px solid #ddd',
    },
    actions: {
        display: 'flex',
        gap: '10px',
        marginTop: '15px',
        borderTop: '1px solid #eee',
        paddingTop: '15px',
    },
    editBtn: {
        padding: '8px 16px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        flex: 1,
    },
    deleteBtn: {
        padding: '8px 16px',
        backgroundColor: '#fff',
        color: '#e74c3c',
        border: '1px solid #e74c3c',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        flex: 1,
    },
};

export default JobCard;

