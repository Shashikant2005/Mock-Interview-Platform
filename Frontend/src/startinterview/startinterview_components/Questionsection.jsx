import { LightbulbIcon, Volume2 } from 'lucide-react';
import React from 'react';

function Questionsection({ mockinterviewQuestion, activequestionindex }) {

  // ✅ Function to convert text to speech using browser's speechSynthesis API
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support this feature");
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
              className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activequestionindex === index ? "bg-blue-600 text-white" : ""
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
        <h2 className='text-sm text-primary my-2'>
          To start your mock interview, click the <strong>"Enable Webcam"</strong> button.
          Allow access to your webcam when prompted by your browser. Once your webcam is active,
          you'll see your video feed. If you need to stop the webcam, just click the <strong>"Close Webcam"</strong> button.
        </h2>
      </div>

    </div>
  );
}

export default Questionsection;
