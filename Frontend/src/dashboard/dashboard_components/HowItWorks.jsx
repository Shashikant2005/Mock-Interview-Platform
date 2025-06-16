
import React from "react";

function HowItWorks() {
  return (
    <div className="px-4 py-10 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">How It Works</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">🧭 Step-by-Step Guide</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>Sign Up / Login:</strong> Register using Clerk authentication. Your profile is created automatically.
          </li>
          <li>
            <strong>Upload Resume:</strong> Upload a PDF resume and select your target job role (e.g., “Frontend Developer”).
          </li>
          <li>
            <strong>Start Interview:</strong> Get custom AI-generated questions and answer via voice or text.
          </li>
          <li>
            <strong>Get Feedback:</strong> Receive instant AI feedback with scores and improvement tips.
          </li>
          <li>
            <strong>Track Progress:</strong> View past sessions and performance on your dashboard.
          </li>
          <li>
            <strong>Go Premium (Optional):</strong> Unlock 50 mock interviews with deep feedback by upgrading.
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">⚠️ Precautions</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>Use a clear, professional resume for better question generation.</li>
          <li>Don’t upload resumes with sensitive info (like Aadhaar, address, etc.).</li>
          <li>Ensure a stable internet connection for smooth voice input & feedback.</li>
          <li>Allow mic permissions if using voice interviews.</li>
          <li>Use a quiet environment to ensure accurate voice recognition.</li>
          <li>Use Chrome on Android / Safari on iOS for best mobile experience.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">💡 Guidelines</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>Be honest and natural while answering – AI detects clarity and originality.</li>
          <li>Use each mock as a real interview – dress up, speak clearly, and time yourself.</li>
          <li>Check feedback carefully and retry questions if needed.</li>
        </ul>
      </section>
    </div>
  );
}

export default HowItWorks;
