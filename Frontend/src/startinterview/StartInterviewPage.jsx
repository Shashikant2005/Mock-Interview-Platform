import React, { useEffect, useState } from 'react';
import Questionsection from './startinterview_components/Questionsection';
import Recoredanswer from './startinterview_components/Recoredanswer';

function StartInterviewPage() {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    getInterviewDetails(); // Simulate fetching data
  }, []);

  const getInterviewDetails = () => {
    // ✅ Replace with actual API call later
    const mockData = {
      jobPosition: "Frontend Developer",
      mockId: "12345",
      jsonMockResp: JSON.stringify([
        { question: "Tell me about yourself." },
        { question: "What is your experience with React?" },
        { question: "How do you manage state in a large app?" }
      ])
    };

    const parsedQuestions = JSON.parse(mockData.jsonMockResp);
    setInterviewData(mockData);
    setMockInterviewQuestions(parsedQuestions);
  };

  const nextQuestion = () => {
    setActiveQuestionIndex((prev) =>
      prev < mockInterviewQuestions.length - 1 ? prev + 1 : prev
    );
  };

  const prevQuestion = () => {
    setActiveQuestionIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const endInterview = () => {
    alert('Interview ended! Redirect to feedback page or save results.');
  };

  // Dummy onSaveAnswer function for saving user answers
  const onSaveAnswer = async (answerData) => {
    console.log('Saving answer...', answerData);
    // Simulate API call delay
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 🧠 Question */}
        <Questionsection
          activequestionindex={activeQuestionIndex}
          mockinterviewQuestion={mockInterviewQuestions}
        />

        {/* 🎤 Recording Answer */}
        <Recoredanswer
          nextQuestion={nextQuestion}
          interviewdata={interviewData}
          activequestionindex={activeQuestionIndex}
          mockinterviewQuestion={mockInterviewQuestions}
          onSaveAnswer={onSaveAnswer}
          userEmail={"user@example.com"} // Replace with actual user email if available
        />
      </div>

      {/* ⏭️ Controls */}
      <div className="flex justify-end gap-4 mt-6">
        {activeQuestionIndex > 0 && (
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={prevQuestion}
          >
            Prev Question
          </button>
        )}
        {activeQuestionIndex < mockInterviewQuestions.length - 1 && (
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={nextQuestion}
          >
            Next Question
          </button>
        )}
        {activeQuestionIndex === mockInterviewQuestions.length - 1 && (
          <button
            className="px-4 py-2 border rounded bg-red-500 text-white hover:bg-red-600"
            onClick={endInterview}
          >
            End Interview
          </button>
        )}
      </div>
    </div>
  );
}

export default StartInterviewPage;
