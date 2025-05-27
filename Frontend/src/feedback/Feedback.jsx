import React, { useEffect, useState } from 'react';

// Dummy data to simulate feedback fetched from DB
const dummyFeedbackList = [
  {
    id: 1,
    mockIdRef: '12345',
    question: "Tell me about yourself.",
    rating: 4,
    UserAns: "I am a frontend developer with 3 years experience.",
    correctAns: "A concise introduction highlighting skills and experience.",
    feedback: "Try to be more specific about your achievements."
  },
  {
    id: 2,
    mockIdRef: '12345',
    question: "What is your experience with React?",
    rating: 5,
    UserAns: "I have built multiple projects using React with hooks and context.",
    correctAns: "Experience with React including hooks, context, and state management.",
    feedback: "Good answer! Try mentioning performance optimization next time."
  },
  {
    id: 3,
    mockIdRef: '12345',
    question: "How do you manage state in a large app?",
    rating: 4,
    UserAns: "Using Redux or Context API based on the requirement.",
    correctAns: "State management using Redux, Context API, or other libraries.",
    feedback: "Great! Also consider mentioning middleware and async actions."
  }
];

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

function Feedback({ interviewId }) {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Simulate fetching filtered feedback by interviewId
    const filtered = dummyFeedbackList.filter(item => item.mockIdRef === interviewId);
    setFeedbackList(filtered);
  }, [interviewId]);

  // Calculate total and average rating
  const totalRating = feedbackList.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = feedbackList.length > 0 ? (totalRating / feedbackList.length).toFixed(1) : 0;

  return (
    <div className="p-10 max-w-4xl mx-auto">
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

          <a
            href="/dashboard"
            className="inline-block mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Home
          </a>
        </>
      )}
    </div>
  );
}

export default Feedback;
