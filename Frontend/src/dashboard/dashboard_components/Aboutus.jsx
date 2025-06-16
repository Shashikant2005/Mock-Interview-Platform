import React from 'react';

function AboutUs() {
  return (
    <div className="px-4 py-10 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">About Us</h1>

      <section className="mb-8">
        <p className="text-lg">
          Welcome to <strong>AI Mock Interview</strong> – your personalized, AI-powered mock interview platform
          built to help students and job seekers prepare confidently, improve their answers, and increase their chances of success.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">🎯 Our Mission</h2>
        <p>
          We aim to make high-quality interview preparation accessible to everyone by combining artificial intelligence with structured mock interviews.
          Whether you're a fresher or experienced candidate, our platform helps you become more confident and job-ready.
        </p>
      </section>

     <section className="mb-10">
  <h2 className="text-2xl font-semibold text-blue-700 mb-3">🛠️ Features</h2>
  <ul className="list-disc pl-5 space-y-2 text-gray-800">
    <li>🎯 Create a new mock interview by entering the job role, job description, number of questions, and difficulty level</li>
    <li>🤖 Generate personalized interview questions using the Gemini AI API based on the provided inputs</li>
    <li>🎙️ Real-time interview simulation with voice based answering</li>
    <li>📹 Record video responses during the interview, simulating real-world interviews</li>
    <li>👁️ Live video preview during interview to simulate face-to-face interaction</li>
    <li>📤 Submit and save answers for future reference and feedback</li>
    <li>🧠 AI-generated feedback including correct answers and improvement suggestions</li>
    <li>📼 Post-interview video review and visual feedback</li>
    <li>🧪 Upcoming Feature: Video analysis of your response quality and body language</li>
    <li>📊 Interview queue management after completion to organize history</li>
    <li>📁 Track interview history and measure improvement over time</li>
  </ul>
</section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">👨‍💻 Meet the Creator</h2>
        <p>
          Hi, I’m <strong>Shashikant Jadhav</strong>, a final-year Computer Engineering student passionate about building smart and useful web applications.
          I specialize in <strong>MERN stack</strong> development and have hands-on experience working with <strong>SpringBoot</strong> as well.
        </p>
        <p className="mt-3">
          I'm also an active competitive programmer with a <strong>1600+ LeetCode rating</strong> and deep involvement in coding contests and data structures & algorithms.
          This platform was created to bridge the gap between theoretical preparation and real interview experience using AI.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">🧪 Tech Stack</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Frontend: React.js + Tailwind CSS</li>
          <li>Authentication: Clerk</li>
          <li>Backend: Node.js + Express</li>
          <li>Database: MongoDB + Mongoose</li>
          <li>AI: Gemini API integration for question generation</li>
          <li>Voice Input: react-hook-speech-to-text</li>
          <li>Payments: Razorpay Integration Test Mode</li>
          
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">📩 Contact</h2>
        <p>
          Feel free to reach out to me on:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Email: <a href="mailto:shashikant.jadhav.rcpit@gmail.com" className="text-blue-600">shashikant.jadhav.rcpit@gmail.com</a></li>
          <li>GitHub: <a href="https://github.com/Shashikant2005" className="text-blue-600" target="_blank" rel="noreferrer">Shashikant2005</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/shashikant-jadhav-379464296/" className="text-blue-600" target="_blank" rel="noreferrer">shashikant-jadhav</a></li>
        </ul>
      </section>

      <p className="text-center text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} AI Mock Interview – Built by Shashikant Jatav
      </p>
    </div>
  );
}

export default AboutUs;
