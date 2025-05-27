import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

function InterviewPage() {
  const [interviewData, setInterviewData] = useState(null);
  const [isOpenWebcam, setIsOpenWebcam] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = () => {
    // Simulated mock interview data
    const mockData = {
      mockId: 'abc123',
      jobPosition: 'Full Stack Developer',
      jobDescription: 'MERN Stack, REST APIs, Deployment',
      jobExperience: 2,
    };
    setInterviewData(mockData);
  };

  const handleStartInterview = () => {
    alert('Interview Started!');
    // Navigate or handle logic here
  };

  return (
    <div style={{ padding: '30px' }}>
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

      <div style={{ textAlign: 'right', marginTop: '30px' }}>
        <button style={styles.buttonPrimary} onClick={handleStartInterview}>Start Interview</button>
      </div>
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
