import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import ReactHlsPlayer from "react-hls-player";

// Custom Card Component
const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-2xl p-4 mb-4">
    {children}
  </div>
);

// Optional: Section Title inside Card
const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold mb-2">{children}</h2>
);

const InterviewAnalysis = () => {
 const uri = import.meta.env.VITE_BACKEND_URL;
  const hasFetched = useRef(false); // 🔐 control repeat calls
  const { userId } = useAuth()
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [Analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ffetch video url
  const getVideo = async () => {
    if (!userId || !id) {
      toast.error("Missing user ID or mock test ID. Please try again.",{position:'top-right'});
      return;
    }
    try {
      const response = await axios.get(`${uri}/api/getvideos`, {
        params: { mockId: id, userId },
      });

      const url = response.data?.videos?.[0]?.videoUrl;
      if (url) {
        setVideoUrl(url);
      } else {
        toast.error("No video found for this Interview.",{position:'top-right'});
        return;
      }
    } catch (err) {
      toast.error("Failed to fetch video. Please check your connection or try again later.",{position:'top-right'});
      //console.error("Error:", err);
    }
  }

  // video analysis
  const analyzeVideo = async (url) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await axios.post("http://localhost:3000/api/videoanalysis", {
        videoUrl: url,
      });

      // The API might respond immediately with a message and analysis (or partial result)
      setAnalysis(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Server error occurred");
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch video URL once on mount or on userId/id change
  useEffect(() => {
    if (userId && id && !hasFetched.current) {
      hasFetched.current = true;
      getVideo();
    }
  }, [userId, id]);

  // useEffect to trigger analysis API call when videoUrl changes
  // useEffect(() => {
  //   if (videoUrl) {
  //     analyzeVideo(videoUrl);
  //   }
  // }, [videoUrl]);



  // const videoSrc =
  //   "https://res.cloudinary.com/dg30nx8hr/video/upload/v1748551579/mhitrugjarlzdkmdedq3.mkv";

  // const analysis = {
  //   duration: "22 seconds",
  //   wordsSpoken: 43,
  //   sentiment: "Neutral (99.84%)",
  //   silence: "2 seconds (9%)",
  //   talkToListenRatio: "1:0",
  //   longestMonologue: "19 seconds",
  //   speechFragments: 4,
  //   keywords: ["video", "working", "check"],
  //   topics: [
  //     { name: "Education / Technology", confidence: "96.75%" },
  //     { name: "Artificial Intelligence", confidence: "51.34%" },
  //   ],
  //   labels: ["Human Face", "Person", "Wall", "Eyebrow"],
  // };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto"> <ToastContainer/>
      <h1 className="text-2xl font-bold mb-6 text-center">Interview Video Analysis</h1>

      {/* Video Player */}
      {videoUrl && <Card>
        <video
          src={videoUrl}
          autoPlay={false}
          controls={true}
          width="100%"
          height="auto"
          className="rounded-lg"
        />
      </Card>}

      <div>
        {videoUrl ? <div>
          {/* <Card>
            <div className="grid gap-2 text-sm">
              <p><strong>Duration:</strong> {analysis.duration}</p>
              <p><strong>Words Spoken:</strong> {analysis.wordsSpoken}</p>
              <p><strong>Sentiment:</strong> {analysis.sentiment}</p>
              <p><strong>Silence:</strong> {analysis.silence}</p>
              <p><strong>Talk-to-Listen Ratio:</strong> {analysis.talkToListenRatio}</p>
              <p><strong>Longest Monologue:</strong> {analysis.longestMonologue}</p>
              <p><strong>Speech Fragments:</strong> {analysis.speechFragments}</p>
            </div>
          </Card> */}

          {/* Keywords */}
          {/* <Card>
            <CardTitle>Top Keywords</CardTitle>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((word, idx) => (
                <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {word}
                </span>
              ))}
            </div>
          </Card> */}

          {/* Topics */}
          {/* <Card>
            <CardTitle>Detected Topics</CardTitle>
            <ul className="list-disc list-inside space-y-1">
              {analysis.topics.map((topic, idx) => (
                <li key={idx}>
                  {topic.name} <span className="text-gray-500">({topic.confidence})</span>
                </li>
              ))}
            </ul>
          </Card> */}

          {/* Visual Labels */}
          {/* <Card>
            <CardTitle>Visual Labels</CardTitle>
            <div className="flex flex-wrap gap-2">
              {analysis.labels.map((label, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {label}
                </span>
              ))}
            </div>
          </Card> */}
        </div> : <div></div>}
      </div>
      {/* <div>
        {Analysis ? <pre>{JSON.stringify(Analysis, null, 2)}</pre> : <div>Waiting for</div>}
      </div> */}
      <h1 className="text-bold text-center text-4xl">On Video Analysis we are currently working</h1>
    </div>
  );
};

export default InterviewAnalysis;
