import React from 'react'
import Header from './dashboard_components/Header'
import Dashboard from './Dashboard'
import InterviewPage from '../interview/InterviewPage'
import StartInterviewPage from '../startinterview/StartInterviewPage'
import Feedback from '../feedback/Feedback'

function Dashboard_Layout() {
  return (
    <div>
      <Header/>
      <div className='mx-5 md:mx-20 lg:mx-36 '>
        {/* {children} */}
        <Dashboard/>
        {/* <InterviewPage/>
        <StartInterviewPage/>
        <Feedback interviewId='12345'/> */}
      </div>

    </div>
  )
}

export default Dashboard_Layout