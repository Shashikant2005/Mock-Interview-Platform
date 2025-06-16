import React, { useEffect, useId, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Simple Collapsible component (replace with your UI lib if needed)
function Collapsible({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 border rounded">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-2 flex justify-between bg-gray-200 rounded-t cursor-pointer"
      >
        {children[0]}
        <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="p-3 bg-white">{children[1]}</div>}
    </div>
  );
}


//main component 
function Feedback({ interviewId }) {
   
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && userId && id) {
      fetchFeedback();
    }
  }, [isLoaded, userId, id]);

  const fetchFeedback = async () => {
    setLoading(true);
    setError("");
    console.log("➡️ mockIdRef:", id);
    console.log("➡️ userId:", userId);

    try {
      const response = await axios.get("http://localhost:3000/api/getfeedback", {
        params: { mockIdRef: id, userId },
      });

      if (response.status === 200) {
        setFeedbackList(response.data.answers);
      }
    } catch (err) {
      toast.error(" Error fetching feedback", {position:'top-right'});
      setError("Failed to load feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total and average rating
  const totalRating = feedbackList.reduce((sum, item) => sum + Number(item.rating || 0), 0);
  const averageRating = feedbackList.length > 0 ? (totalRating / feedbackList.length).toFixed(1) : "0.0";


  return (
    <div className="p-10 max-w-4xl mx-auto"> <ToastContainer/>
      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">No feedback Record Found</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
          <h2 className="font-bold text-2xl mb-2">Here is Your Interview Feedback</h2>
          <h2 className="text-primary text-lg mb-3">
            Your Overall Interview Rating: <strong>{averageRating}/5</strong>
          </h2>
          <h2 className="text-sm text-gray-500 mb-6">
            Find below the interview questions with correct answers, your answers, and feedback for improvement.
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={item.id}>
              <h2 className="text-left text-base font-semibold">{item.question}</h2>
              <div className="flex flex-col gap-2 mt-2">
                <div className="text-red-500 p-2 border rounded-lg"><strong>Rating:</strong> {item.rating}</div>
                <div className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                  <strong>Your Answer:</strong> {item.UserAns}
                </div>
                <div className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                  <strong>Correct Answer:</strong> {item.correctAns}
                </div>
                <div className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                  <strong>Feedback:</strong> {item.feedback}
                </div>
              </div>
            </Collapsible>
          ))}

          <div
            className="inline-block mt-6 px-5 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={()=>navigate("/")}
          >
            Go Home
          </div>
           <div
            className="inline-block mx-3 mt-6 px-5 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={()=>navigate(`/interview/${id}/videofeedback`)}
          >
            video Feedback
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
