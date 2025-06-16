import React from 'react';
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useState } from 'react';
import useJobStore from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card({ item, onStart, onFeedback, onAudioFeedback, onVideoFeedback }) {

  const [loading, setLoading] = useState(false)
  const { setSeevideo, Seevideo, video, setVideo } = useJobStore();
  // const {id} = useParams();
  const navigate = useNavigate()
  const { userId } = useAuth();

  const getVideo = async (id) => {

    // console.log(userId)
    // console.log(id)
    try {
      const result = await axios.get("http://localhost:3000/api/getvideos", {
        params: { mockId: id, userId },
      })

      const videos = result?.data?.videos;
      if (!videos || videos.length === 0) {
        toast.warning("No videos found");
        return;
      }

      // Set in store and safely access
      setVideo(videos[0].videoUrl);
      setSeevideo(true)
      // console.log("Video URL:", videos[0].videoUrl); 
    } catch (error) {
      //console.log(error)
      const message = error?.response?.data?.error || error.message || "Failed to fetch videos";
      toast.error(`Error fetching video:`,{position:'top-right'});
      //alert(message); // Or toast, etc.
    }
  }

  const onSeeVideo = async (mockid) => {
    await getVideo(mockid)
  }



  return (
    <div style={styles.card}>
      <ToastContainer/>
      <h2 style={styles.title}>{item?.jobPosition}</h2>
      <h4 style={styles.subtitle}>{item?.jobExperience} Years of Experience</h4>
      <p style={styles.date}>Created At: {item?.createdAt}</p>

      <div style={styles.buttonGroup}>
        <button onClick={() => onFeedback(item?._id)} style={styles.buttonOutline}>
          Text Feedback
        </button>

        <button onClick={() => onSeeVideo(item?._id)} style={styles.buttonOutline}>
          See Video
        </button>

        <button onClick={()=>navigate(`/interview/${item?._id}/videofeedback`)} style={styles.buttonOutline}>
          Video Feedback
        </button>

        <button onClick={() => onStart(item?._id)} style={styles.buttonPrimary}>
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
