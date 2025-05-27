import React from 'react';

function Card({ item, onStart, onFeedback, onAudioFeedback, onVideoFeedback }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{item?.jobPosition}</h2>
      <h4 style={styles.subtitle}>{item?.jobExperience} Years of Experience</h4>
      <p style={styles.date}>Created At: {item?.createdAt}</p>

      <div style={styles.buttonGroup}>
        <button onClick={() => onFeedback(item?.mockId)} style={styles.buttonOutline}>
          Text Feedback
        </button>

        <button onClick={() => onAudioFeedback(item?.mockId)} style={styles.buttonOutline}>
          Audio Feedback
        </button>

        <button onClick={() => onVideoFeedback(item?.mockId)} style={styles.buttonOutline}>
          Video Feedback
        </button>

        <button onClick={() => onStart(item?.mockId)} style={styles.buttonPrimary}>
          Start
        </button>
      </div>
    </div>
  );
}

// Simple inline styles
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '16px',
    margin: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  title: {
    fontWeight: 'bold',
    color: '#0070f3',
  },
  subtitle: {
    fontSize: '14px',
    color: '#555',
  },
  date: {
    fontSize: '12px',
    color: '#888',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px',
    flexWrap: 'wrap',
  },
  buttonOutline: {
    flex: '1 1 auto',
    padding: '8px',
    border: '1px solid #0070f3',
    backgroundColor: 'white',
    color: '#0070f3',
    borderRadius: '6px',
    cursor: 'pointer',
    minWidth: '110px',
  },
  buttonPrimary: {
    flex: '1 1 auto',
    padding: '8px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    minWidth: '110px',
  },
};

export default Card;
