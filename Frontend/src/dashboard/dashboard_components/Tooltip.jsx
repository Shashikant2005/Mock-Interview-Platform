import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InterviewCountTooltip = () => {
  const [count, setCount] = useState(null);
  const {userId} = useAuth();
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${url}/api/interview-count/${userId}`);
        setCount(res.data.interviewCount);
      } catch (error) {
        //toast.error('Failed to fetch interview count',{position:"top-right"});
        setCount('N/A');
      }
    };

    if (userId) fetchCount();
  }, [userId]);

  return (
    <div className=" absolute group inline-block"> <ToastContainer/>
      <span className="cursor-pointer mx-5  text-lg text-blue-600 border-blue-600 rounded-md">
          Cheack 
      </span>
      <div className="absolute left-0 mt-2 w-48 rounded-xl bg-gray-800 text-white text-sm px-3 py-2 hidden group-hover:block z-10 shadow-lg">
        {count === null ? 'Loading...' : `You have ${count} interviews left.`}
      </div>
    </div>
  );
};

export default InterviewCountTooltip;
