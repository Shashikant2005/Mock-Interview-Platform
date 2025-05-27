

import { createBrowserRouter } from 'react-router-dom'
import Dashboard_Layout from './Dashboard_Layout'
import Dashboard from './dashboard_components/Dashboard'
import Upgrade from './dashboard_components/Upgrade'
import Questions from './dashboard_components/Questions'
import HowItWorks from './dashboard_components/HowItWorks'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard_Layout/>,
    children: [
      { index: true, element: <Dashboard /> },      // renders at '/'
      { path: 'upgrade', element: <Upgrade /> },    // renders at '/upgrade'
      { path: 'questions', element: <Questions/> },// renders at '/questions'
      { path: 'how-it-works', element: <HowItWorks /> }, // renders at '/how-it-works'
    ],
  },
])

export default router
