import React from 'react'
import Header from './dashboard_components/Header'

import { Outlet } from 'react-router-dom'

function Dashboard_Layout() {
  return (
    <div>
      <Header/>
      <div className='mx-5 md:mx-20 lg:mx-36 '>
        {/* {children} */}
        {/* <Dashboard/> */}
        <Outlet/>
        {/* <InterviewPage/>
        <StartInterviewPage/>
        <Feedback interviewId='12345'/> */}
      </div>

    </div>
  )
}

export default Dashboard_Layout