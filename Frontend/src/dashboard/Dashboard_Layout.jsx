import React from 'react'
import Header from './dashboard_components/Header'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import axios from "axios"
import InterviewCountTooltip from './dashboard_components/Tooltip';
function Dashboard_Layout() {
  // hit user creation after user login
  console.log("hitted")
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    const createUser = async () => {
      if (isSignedIn && userId) {
        try {
          await axios.post("http://localhost:3000/api/create-user", {
            clerkUserId: userId,
          });
         // console.log("✅ User created or already exists");
        } catch (err) {
          //alert("❌ Failed to create user:", err.message);
        }
      }
    };

    createUser();

  }, [isSignedIn, userId]);

  return (
    <div>
      <Header />
      <InterviewCountTooltip/>
      <div className='mx-5 md:mx-20 lg:mx-36 '>
        {/* {children} */}
        {/* <Dashboard/> */}
        
        <Outlet />
        {/* <InterviewPage/>
        <StartInterviewPage/>
        <Feedback interviewId='12345'/> */}
      </div>

    </div>
  )
}

export default Dashboard_Layout