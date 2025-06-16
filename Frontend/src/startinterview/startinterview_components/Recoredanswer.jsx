import React, { useEffect, useState, useRef } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio, InfinitySpin, ThreeDots } from 'react-loader-spinner'
import { useAuth } from "@clerk/clerk-react";
import axios from "axios"
import RecordInterview from './RecordInterviewvideo';

// If you don't have your own Button component, just use a simple <button>
const Button = ({ children, onClick, disabled, className }) => (
  <button disabled={disabled} onClick={onClick} className={className}>
    {children}
  </button>
);

function Recoredanswer({
  nextQuestion,
  activequestionindex,
  mockinterviewQuestion,
  interviewdata,
  userEmail,
  onSaveAnswer,
  setresults
}) {
  const [userAnswer, setuserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const lastResultRef = useRef('');
  const { userId } = useAuth()

  const {
    error,
    interimResult,
    isRecording,
    setResults,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (!results || results.length === 0) return;

    // Get last transcript from result
    const newTranscript = results[results.length - 1].transcript;

    // Only append if it’s not the same as last seen
    if (newTranscript !== lastResultRef.current) {
      setuserAnswer((prev) => prev + ' ' + newTranscript);
      lastResultRef.current = newTranscript;
    }
  }, [results]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      // Don't clear userAnswer, just clear the results
      setResults([]);
      lastResultRef.current = '';
      startSpeechToText();
    }
  };

  const clearAnswer = () => {
    setuserAnswer('');
    setResults([]);
    lastResultRef.current = '';
    stopSpeechToText();
  };

  const cleanMarkdown = (text) => {
    if (!text) return "";

    // Remove markdown for **bold**, *italic*, and lists with *
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')   // Remove bold (**text**)
      .replace(/\*(.*?)\*/g, '$1')       // Remove italic (*text*)
      .replace(/[\*\-]\s+/g, '')         // Remove list bullet points (* or -)
      .replace(/<\/?[^>]+(>|$)/g, "");    // Remove HTML tags (if any)
  };

  const getFeedback = async (question, userAnswer, correctAns) => {
    const feedbackPrompt = `
You are an AI interview evaluator. Analyze the user's spoken answer based on the given question and the correct reference answer. Evaluate the quality, completeness, and relevance of the user's answer compared to the correct one.

Please provide the following:

1. A rating (from 0 to 10) that reflects how well the user's answer matches the correct answer, considering accuracy, depth, and communication.
2. A detailed feedback (in 3 to 5 lines) highlighting strengths and areas for improvement. Be constructive and clear, focusing on how the user can enhance their answer in future interviews.

Return your response in strict JSON format with only the following two fields:
- "rating": (number, between 0 to 10)
- "feedback": (string, 3–5 concise lines combining praise and suggestions)

Input:
- Question: ${question}
- Correct Answer: ${correctAns}
- User's Answer: ${userAnswer}

Output format (example):
{
  "rating": 8.5,
  "feedback": "The answer demonstrates a good understanding of React fundamentals, especially component structure. However, it lacks mention of key features like hooks and virtual DOM. Try to include more technical depth and real-world relevance to improve."
}

Ensure the output is always valid JSON and uses clear, interview-appropriate language.
  `;
    const callGemini = await axios.post('http://localhost:3000/api/generate', { prompt: feedbackPrompt });
    const mockQuesAnswers = callGemini.data.response.replace(/```json|```/g, '').trim();
    const parsedData = JSON.parse(mockQuesAnswers);
    return parsedData
  }
  const SaveUserAnswerInDB = async () => {
     setLoading(true);
    const questionObj = mockinterviewQuestion[activequestionindex];
    const cleanedAnswer = cleanMarkdown(userAnswer);
    const cleanedQuestion = cleanMarkdown(questionObj?.question);
    const cleanedCorrectAns = cleanMarkdown(questionObj?.answer);
    const feedback = await getFeedback(cleanedQuestion, cleanedAnswer, cleanedCorrectAns);

    // const cleanedFeedback = cleanMarkdown(feedback?.feedback);

    // console.log(cleanedQuestion)
    //console.log(cleanedAnswer)
    // console.log(cleanedCorrectAns)
    // console.log(feedback)

    const data = {
      mockIdRef: interviewdata?.mockId,
      question: cleanedQuestion,
      correctAns: cleanedCorrectAns,
      UserAns: cleanedAnswer,
      feedback: feedback.feedback,
      rating: feedback?.rating,
      userId: userId
    };

    //console.log(data)
    //save ans in db if not already saved
    try {
      const response = await axios.post("http://localhost:3000/api/saveUserOneQueAnswer", data);

      if (response.status === 201) {
        toast.success("Answer saved successfully!", { position: "top-right" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.warning("Answer already submitted for this question.");
        } else {
          toast.error(`error.response.data.message`,{position:'top-right'});
        }
      } else {
        toast.error("Server not responding. Check your connection.", { position: "top-right" });
      }

      toast.error("Save Error:", error);
    }
     setLoading(false);
    setResults([]);
    setuserAnswer('');
    lastResultRef.current = '';
   
  };
    
  return (
    <div className="flex items-center justify-center flex-col"> <ToastContainer />
      {/* <div className="flex flex-col mt-5 justify-center items-center rounded-lg p-5 bg-black relative">
        <img
          src="/webcam.avif"
          alt="webcam"
          style={{ position: 'absolute', height: 200, width: 200 }}
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: '100%', zIndex: 10 }}
        />
        <RecordInterview/>
      </div> */}
      <RecordInterview />
      <Button className={isRecording ? "mt-4 bg-gray-400 text-black font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200" : "mt-4 text-black font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200"} disabled={loading} onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Answer Recording'}
      </Button>

      <div className="flex gap-5 mt-5">
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200"
          // onClick={resetTranscript}
          // onClick={()=>setResults(null)}
          onClick={() => { setuserAnswer(""); setResults([]); stopSpeechToText() }}
          disabled={loading}
        >
          🧹 Clear Answer
        </Button>

        <Button
          className={`${loading || !userAnswer
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
            } text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200`}
          onClick={SaveUserAnswerInDB}
          disabled={loading || !userAnswer}
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
          /> : "Save Answer"}
        </Button>
      </div>

      {userAnswer && (
        <div className="border p-4 mt-4 max-w-lg rounded-md bg-gray-100 text-sm text-gray-700">
          <strong>Recorded Answer:</strong>
          {/* {results.map((result) => (
          <div>{result.transcript}</div>
        ))}
        {interimResult && <li>{interimResult}</li>} */}
          {userAnswer}
        </div>
      )}
    </div>
  );
}

export default Recoredanswer;
