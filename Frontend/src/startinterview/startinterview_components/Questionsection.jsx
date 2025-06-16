import { LightbulbIcon, Volume2 } from 'lucide-react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Questionsection({ mockinterviewQuestion, activequestionindex }) {

  //console.log("Interview Questions are" + mockinterviewQuestion)
  // ✅ Function to convert text to speech using browser's speechSynthesis API

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      toast.warning("Your browser does not support this feature",{position:'top-right'});
    }
  };

  // ✅ Render only if mockinterviewQuestion is available
  return mockinterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>

      {/* ✅ Question number selector UI */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
          mockinterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${activequestionindex === index ? "bg-blue-600 text-white" : ""
                }`}
            >
              Question #{index + 1}
            </h2>
          ))
        }
      </div>

      {/* ✅ Main active question display */}
      <h2 className='my-5 text-md md:text-lg'>
        {mockinterviewQuestion[activequestionindex]?.question}
      </h2>

      {/* ✅ Volume icon triggers speech */}
      <Volume2
        className='cursor-pointer'
        onClick={() => textToSpeech(mockinterviewQuestion[activequestionindex]?.question)}
      />

      {/* ✅ Instruction Note box */}
      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
          <LightbulbIcon />
          <strong>Note:</strong>
        </h2>
        {/* <h2 className='text-sm text-primary my-2'>
          To start your mock interview, click the <strong>"Enable Webcam"</strong> button.
          Allow access to your webcam when prompted by your browser. Once your webcam is active,
          you'll see your video feed. If you need to stop the webcam, just click the <strong>"Close Webcam"</strong> button.
        </h2> */}
        <p className="text-sm text-red-700 bg-red-100 border border-red-300 rounded-md p-3 mt-4 max-w-md mx-auto">
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Once you <strong>end recording</strong>, the video is finalized. If you again click start a  recording without saving the previous one, it will be lost.
            </li>
            <li>
              Only <strong>one video can be saved per interview</strong>. Please save carefully or Record new Video.
            </li>
            <li>
              Start <strong> Answer Recording </strong> seprately and <strong> Start Video Recording </strong>  Seprately if Needed
            </li>
          </ol>
        </p>
      </div>

    </div>
  );
}

export default Questionsection;
