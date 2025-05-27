import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';

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
}) {
  const [userAnswer, setuserAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    results,
    setResults,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({ continuous: true, useLegacyResults: false });

  useEffect(() => {
    // Append new transcripts
    results?.forEach((result) => {
      setuserAnswer((prev) => prev + result.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswerInDB();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswer, isRecording]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setuserAnswer('');
      startSpeechToText();
    }
  };

  const cleanMarkdown = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/[\*\-]\s+/g, '')
      .replace(/<\/?[^>]+(>|$)/g, '');
  };

  // Dummy feedback generator (replace with real API)
  const getFeedback = async (question, answer) => {
    return {
      rating: Math.floor(Math.random() * 5) + 1,
      feedback: 'Great effort! Try to be more specific.',
    };
  };

  const UpdateUserAnswerInDB = async () => {
    setLoading(true);
    const questionObj = mockinterviewQuestion[activequestionindex];
    const feedback = await getFeedback(questionObj?.question, userAnswer);

    const cleanedAnswer = cleanMarkdown(userAnswer);
    const cleanedQuestion = cleanMarkdown(questionObj?.question);
    const cleanedCorrectAns = cleanMarkdown(questionObj?.answer);
    const cleanedFeedback = cleanMarkdown(feedback?.feedback);

    const data = {
      mockIdRef: interviewdata?.mockId,
      question: cleanedQuestion,
      correctAns: cleanedCorrectAns,
      UserAns: cleanedAnswer,
      feedback: cleanedFeedback,
      rating: feedback?.rating,
      userEmail: userEmail,
      createdAt: new Date().toLocaleDateString(),
    };

    if (onSaveAnswer) {
      await onSaveAnswer(data);
    }

    toast('Saved user answer successfully');
    setResults([]);
    setuserAnswer('');
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-5 justify-center items-center rounded-lg p-5 bg-black relative">
        <img
          src="/webcam.avif"
          alt="webcam"
          style={{ position: 'absolute', height: 200, width: 200 }}
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: '100%', zIndex: 10 }}
        />
      </div>
      <Button disabled={loading} onClick={StartStopRecording} className="my-5">
        {isRecording ? (
          <h2 className="flex gap-2 items-center text-red-500">
            <Mic /> Recording
          </h2>
        ) : (
          <h2>Record Answer</h2>
        )}
      </Button>
    </div>
  );
}

export default Recoredanswer;
