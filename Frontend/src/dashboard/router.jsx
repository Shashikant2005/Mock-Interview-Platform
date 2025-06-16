
import { createBrowserRouter } from 'react-router-dom'
import Dashboard_Layout from './Dashboard_Layout'
import Dashboard from './dashboard_components/Dashboard'
import Upgrade from './dashboard_components/Upgrade'
import Questions from './dashboard_components/Questions'
import HowItWorks from './dashboard_components/HowItWorks'
import InterviewPage from '../interview/InterviewPage'
import StartInterviewPage from '../startinterview/StartInterviewPage'
import Feedback from '../feedback/Feedback'
import InterviewAnalysis from '../feedback/videoFeedback/InterviewAnalysis'
import AboutUs from './dashboard_components/Aboutus'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard_Layout/>,
    children: [
      { index: true, element: <Dashboard /> },      // renders at '/'
      { path: 'upgrade', element: <Upgrade /> },    // renders at '/upgrade'
      { path: 'questions', element: <Questions/> },// renders at '/questions'
      { path: 'how-it-works', element: <HowItWorks /> }, // renders at '/how-it-works'
      { path: 'aboutus', element: <AboutUs /> }
    ],
  },
  {
    path: 'interview/:id', 
    element:<InterviewPage/>
  },
  {
  path: 'interview/:id/startInterview',
  element: <StartInterviewPage/>
}
,{
  path: 'interview/:id/feedback',
  element: <Feedback/>
},
{
  path: 'interview/:id/videofeedback',
  element: <InterviewAnalysis/>
}
])

export default router
