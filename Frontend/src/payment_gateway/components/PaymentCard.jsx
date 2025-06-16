import React from 'react';

function UpgradeCard({ handlepayment }) {
  return (
    <div className=" min-h-screen  flex items-center justify-center bg-white ">
      <div className="w-full max-w-sm p-4 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Upgrade to Pro</h2>
        <p className="text-sm text-center text-gray-500 mt-1">Unlock all features and remove limits</p>

        <div className="mt-6 flex justify-center items-end text-gray-800">
          <span className="text-xl font-medium">₹</span>
          <span className="text-5xl font-bold">49</span>
          <span className="text-base font-normal text-gray-500 ml-1">one-time</span>
        </div>

        <ul className="mt-6 space-y-4 text-sm text-gray-600">
          <li className="flex items-center">
            ✅ 20 Mock Interviews
          </li>
          <li className="flex items-center"> 
            ✅ Priority Interview Feedback
          </li>
          <li className="flex items-center">
            ✅ Unlimited Resume Reviews
          </li>
        </ul>

        <button
          onClick={handlepayment}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium text-sm"
        >
          Upgrade Now
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">No subscription. Pay once. Use forever.</p>
      </div>
    </div>
  );
}

export default UpgradeCard;
