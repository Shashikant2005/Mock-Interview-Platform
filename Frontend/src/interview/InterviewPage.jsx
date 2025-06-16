import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useJobStore from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InterviewPage() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [interviewData, setInterviewData] = useState(null);
  const [isOpenWebcam, setIsOpenWebcam] = useState(false);
   const {interviewCompleted, setInterviewCompleted} = useJobStore();
  const { jobPosition, setJobPosition, jobDescription, setJobDescription, jobExperience, setJobExperience } = useJobStore();
  const { id } = useParams(); 
  const navigate = useNavigate();
  useEffect(() => {
    setInterviewCompleted(false)
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    // Simulated mock interview data
    try {
      const resp = await axios.get(`${url}/api/interview/${id}`);

      const data = resp.data;

      // Parse jsonMockResp (it's stored as a stringified JSON array)
      const parsedQuestions = JSON.parse(data.jsonMockResp);

      // Set all required data into state
      setInterviewData({
        mockId: data._id,
        jobPosition: data.jobPosition,
        jobDescription: data.jobDescription,
        jobExperience: data.jobExperience,
        questions: parsedQuestions,
      });

    } catch (error) {
      toast.error('Failed to fetch interview details please reload page',{position:'top-right'});
      setErrorMessage('Unable to load interview details.'); // optional error handler
    }

  };

  const handleStartInterview = () => {
    //alert('Interview Started!');
    setInterviewCompleted(false);
    // Navigate or handle logic here
    navigate(`/interview/${id}/startInterview`);
  };

  return (
    <div style={{ padding: '30px' }}> <ToastContainer/>
      <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>Let's Get Started</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '30px' }}>
        {/* Info section */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={styles.infoBox}>
            <p><strong>Job Role / Position:</strong> {interviewData?.jobPosition}</p>
            <p><strong>Job Description / Tech Stack:</strong> {interviewData?.jobDescription}</p>
            <p><strong>Years of Experience:</strong> {interviewData?.jobExperience}</p>
          </div>

          <div style={styles.tipBox}>
            <p style={{ color: '#b45309', fontWeight: 'bold' }}>💡 Information</p>
            <p style={{ color: '#a16207', marginTop: '10px' }}>
              To start your mock interview, click the <strong>"Enable Webcam"</strong> button. Allow access to your webcam when prompted. If you need to stop it, click <strong>"Close Webcam"</strong>.
            </p>
          </div>
        </div>

        {/* Webcam section */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {isOpenWebcam ? (
            <>
              <Webcam
                style={{ height: 300, width: 300 }}
                onUserMedia={() => setIsOpenWebcam(true)}
                onUserMediaError={() => setIsOpenWebcam(false)}
                mirrored
              />
              <button style={styles.buttonGhost} onClick={() => setIsOpenWebcam(false)}>Close Webcam</button>
            </>
          ) : (
            <>
              <div style={styles.placeholder}>
                <p style={{ textAlign: 'center', color: '#666' }}>Webcam Preview</p>
              </div>
              <button style={styles.buttonGhost} onClick={() => setIsOpenWebcam(true)}>Enable Webcam and Microphone</button>
            </>
          )}
        </div>
      </div>

     { interviewData && <div style={{ textAlign: 'right', marginTop: '30px' }}>
        <button style={styles.buttonPrimary} onClick={handleStartInterview}>Start Interview</button>
      </div>}
    </div>
  );
}

const styles = {
  infoBox: {
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  tipBox: {
    backgroundColor: '#fef3c7',
    padding: '16px',
    borderRadius: '10px',
    border: '1px solid #fde68a',
  },
  placeholder: {
    height: 300,
    width: 300,
    backgroundColor: '#f3f4f6',
    border: '1px solid #ccc',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  buttonGhost: {
    padding: '8px 16px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  buttonPrimary: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default InterviewPage;
