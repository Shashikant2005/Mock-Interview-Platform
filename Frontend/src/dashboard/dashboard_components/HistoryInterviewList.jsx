import React, { useEffect, useState } from 'react';
import Card from './Card'; // Make sure Card.js is in the same folder or adjust path
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'; // or your auth provider
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HistoryInterviewList() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [interviewList, setInterviewList] = useState([]);
  const { userId } = useAuth();
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate()
  useEffect(() => {
    // Simulate fetching data
    GetInterviewList();
  }, []);

  const GetInterviewList = async () => {
    if (!userId) return;
    console.log(userId)
    try {
      const response = await axios.get(`${url}/api/interview-history`, {
        params: { userId },
      });

      if (response.data.success) {
        setInterviewList(response.data.data);
      } else {
        toast.error('Failed to fetch interview history',{position:'top-right'});
      }
    } catch (error) {
      toast.error('Error fetching interview history', {position:'top-right'});
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    GetInterviewList();
  }, [userId]);

  function handleStart(id) {
    //console.log('Start interview:', id);
    // Navigate or perform logic here
     navigate(`/interview/${id}`);
  }

  function handleFeedback(id) {
    navigate(`/interview/${id}/feedback`)
  }

  return (
    <div style={{ padding: '20px' }}> <ToastContainer/>
      <h2 style={{ fontSize: '20px', fontWeight: '500' }}>Previous Mock Interviews</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
        {interviewList.map((item, index) => (
          <Card key={index} item={item} onStart={handleStart} onFeedback={handleFeedback} />
        ))}
      </div>
    </div>
  );
}

export default HistoryInterviewList;
