import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio, InfinitySpin, ThreeDots } from 'react-loader-spinner'
import useJobStore from '../../store';
import axios from "axios"
import { useAuth, useSignIn } from "@clerk/clerk-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewInterview() {
  const [Open, setOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { open } = useSignIn();
  const { userId, sessionId, getToken, isSignedIn } = useAuth();
  const [jsonResp, setjsonResp] = useState([])
  const { jobPosition, setJobPosition, jobDescription, setJobDescription, jobExperience, setJobExperience } = useJobStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const abortControllerRef = useRef(null);

  const clearInputs = () => {
    setJobPosition('');
    setJobDescription('');
    setJobExperience('');
  };

  const handleAddNewInterview = async () => {
    if (!isSignedIn || !userId) {
      // how click cleark siginbutton
      toast.warning("Login first", { location: 'top-right' })
      return;
    }
    else {
      // cheack interview limit

      try {
        const res = await axios.get(`http://localhost:3000/api/interview-count/${userId}`);
        const count = res.data.interviewCount;

        if (count === 0) {
          toast.error("Interview limit reached. Please upgrade.");
          return false; // block further actions
        }

      } catch (error) {
        //console.error("Error checking interview count:", error);
        toast.error("Something went wrong while checking access.");
        return false;
      }
      setOpen(true);
      setIsCancelled(false)
    }
  }
  // handle cancel button click
  const handleCancel = () => {
    setErrorMessage("")
    setIsCancelled(true);  // mark cancelled
    setOpen(false);        // close modal
    setLoading(false);     // optionally stop loading UI

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // handle start Interview click
  const onSubmit = async () => {

    if (!userId) {
      setErrorMessage('Failed to generate questions.');
      clearInputs()
      // setOpen(false);
      //  toast.success("Something went Wrong !", {position: "top-right"});
      return;
    }





    //

    setIsCancelled(false);
    abortControllerRef.current = new AbortController();
    setErrorMessage('');

    if (!jobPosition || !jobDescription || jobExperience < 0) {
      setErrorMessage('All fields are required.');
      return;
    }
    // console.log(userId)
    setLoading(true);

    const prompt = `
You are an expert technical interviewer.

Based on the following job details, generate exactly 5 technical interview questions and their detailed sample answers in **strict JSON format**.

Format of the output:
[
  {
    "question": "string",
    "answer": "string"
  },
  ...
]

Job Position: ${jobPosition}  
Job Description: ${jobDescription}  
Experience Level: ${jobExperience}  

Please ensure the JSON is valid, compact, and structured as shown. Do not include any explanation outside the JSON array.
`;

    try {
      // Simulate API call

      console.log(prompt)
      const callGemini = await axios.post('http://localhost:3000/api/generate', { prompt: prompt }, { signal: abortControllerRef.current.signal });
      const mockQuesAnswers = callGemini.data.response.replace(/```json|```/g, '').trim();
      const parsedData = JSON.parse(mockQuesAnswers);
      //console.log(parsedData);
      setjsonResp(parsedData);

      // save in Generated Interview Questions in DB
      if (mockQuesAnswers) {

        const mockData = {
          jsonMockResp: JSON.stringify(parsedData),
          jobPosition: jobPosition,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          userUniqClearkId: userId,
        };
        try {
          const response = await axios.post('http://localhost:3000/api/mock-interview', mockData);
          //console.log('Saved:', response.data);
          const mockId = response.data.data._id;

          //decrease count
          if (response?.data?.data) {
            try {
              await axios.post('http://localhost:3000/api/decrease-count', {
                clerkUserId: userId
              });
            } catch (error) {
               //console.error('Failed to decrease count:', error);
            }
          }
          setLoading(false)
          navigate(`/interview/${mockId}`);

        }
        catch (error) {
          clearInputs();
          toast.error("Something went Wrong !", {
            position: "top-right"
          });
        }


      }

    }
    catch (err) {
      clearInputs();
      if (err?.code === "ERR_CANCELED") {
        toast.error("Request was cancelled by the user.",{position:'top-right'});
      } else {
        //  toast.success("Something went Wrong !", { position: "top-right"});
        setErrorMessage('Failed to generate questions.');

      }
    }
    finally {
      clearInputs();
      setLoading(false);
    }
  };

  return (
    <div>    <ToastContainer />
      <div
        onClick={() => handleAddNewInterview()}
        className="p-6 border rounded-lg bg-gray-100 hover:shadow cursor-pointer text-center"
      >
        + Add New Interview

      </div>

      {Open && (
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
              <button onClick={() => handleCancel()} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? <ThreeDots
                  visible={true}
                  height="10"
                  width="80"
                  color="white"
                  radius="6"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                /> : "Start Interview"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewInterview;
