

import React, { useState } from 'react';

const faqs = [
  {
    "question": "What is AI Mock Interview?",
    "answer": "AI Mock Interview is a simple mock interview web platform that simulates job interviews. It generates questions based on a user-filled form, where the user provides the job role, description, difficulty level, and number of questions. The user must answer by speaking, and then AI-based feedback is generated."
  },
  {
    "question": "How does it generate questions?",
    "answer": "It uses the Gemini API to generate questions based on the inputs provided by the user in the form, such as job role, description, difficulty, and number of questions."
  },
  {
    "question": "Do I need to sign up to use it?",
    "answer": "Yes, you need to sign up to access the platform and its features."
  },
  {
    "question": "Is it free to use?",
    "answer": "Yes, the platform is free to use for up to 10 interviews. After that, users need to upgrade to a premium plan to continue using the service."
  },
  {
    "question": "Can I speak my answers, or do I need to type them?",
    "answer": "You must speak your answers. Typing is not allowed because this is a mock interview platform, not a written exam system."
  },
  {
    "question": "How does the feedback system work?",
    "answer": "The feedback system uses Gemini AI to analyze your spoken responses and provides insights on content quality, clarity, and suggestions for improvement."
  },
  {
    "question": "What job roles are supported?",
    "answer": "There are no specific job roles supported. The platform is open to all categories based on what the user fills in the form."
  },
  {
    "question": "Is my data secure?",
    "answer": "Yes, your data is secure. We follow best practices to store and protect your resume and interview data."
  },
  {
    "question": "Can I review my past interviews?",
    "answer": "Yes, users can review their past interviews including the questions, spoken answers, and feedback."
  },
  {
    "question": "How do I upgrade to premium?",
    "answer": "Click on the 'Upgrade' button on your dashboard. After successful payment, premium features will be unlocked."
  }
]

  ;

function Questions() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
            <button
              onClick={() => toggle(index)}
              className="w-full px-4 py-3 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-gray-700 bg-white border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;
