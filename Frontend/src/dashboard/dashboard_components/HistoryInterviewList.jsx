import React, { useEffect, useState } from 'react';
import Card from './Card'; // Make sure Card.js is in the same folder or adjust path

function HistoryInterviewList() {
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    GetInterviewList();
  }, []);

  function GetInterviewList() {
    const dummyUserEmail = 'test@example.com';

    // Simulated interview list data
    const mockData = [
      {
        mockId: 'abc123',
        jobPosition: 'Frontend Developer',
        jobExperience: 2,
        createdAt: '2025-05-26',
        createdBy: dummyUserEmail,
      },
      {
        mockId: 'def456',
        jobPosition: 'Backend Developer',
        jobExperience: 3,
        createdAt: '2025-05-24',
        createdBy: dummyUserEmail,
      },
    ];

    setInterviewList(mockData);
  }

  function handleStart(id) {
    console.log('Start interview:', id);
    // Navigate or perform logic here
  }

  function handleFeedback(id) {
    console.log('View feedback for:', id);
    // Navigate or perform logic here
  }

  return (
    <div style={{ padding: '20px' }}>
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
