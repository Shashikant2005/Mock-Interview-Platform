import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddNewInterview() {
  const [open, setOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const clearInputs = () => {
    setJobPosition('');
    setJobDescription('');
    setJobExperience('');
  };

  const onSubmit = async () => {
    setErrorMessage('');
    if (!jobPosition || !jobDescription || jobExperience < 0) {
      setErrorMessage('All fields are required.');
      return;
    }

    setLoading(true);

    try {
      const prompt = `Job Position: ${jobPosition}, Description: ${jobDescription}, Experience: ${jobExperience}`;
      // Simulate API call
      const fakeQuestions = [
        { question: "Tell me about yourself.", answer: "Sample answer here." },
        { question: "Why this position?", answer: "Sample answer here." },
      ];

      const mockId = Math.random().toString(36).substring(2, 9); // Fake ID
      localStorage.setItem(mockId, JSON.stringify(fakeQuestions)); // Save mock data
      clearInputs();
      navigate(`/interview/${mockId}`);
    } catch (err) {
      setErrorMessage('Failed to generate questions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="p-6 border rounded-lg bg-gray-100 hover:shadow cursor-pointer text-center"
      >
        + Add New Interview
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">New Interview Details</h2>
            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

            <input
              className="w-full border p-2 mb-3"
              placeholder="Job Position"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-3"
              placeholder="Job Description / Tech Stack"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-3"
              type="number"
              placeholder="Years of Experience"
              value={jobExperience}
              onChange={(e) => setJobExperience(e.target.value)}
            />

            <div className="flex justify-end gap-4">
              <button onClick={() => setOpen(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Generating..." : "Start Interview"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewInterview;
