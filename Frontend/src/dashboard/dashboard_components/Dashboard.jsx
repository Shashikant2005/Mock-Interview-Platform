import React, { useEffect } from 'react'
import AddNewInterview from './AddNewInterview'
import HistoryInterviewList from './HistoryInterviewList'
import Card from './Card'
import SeePreview from './SeePreview';
import useJobStore from '../../store';
import InterviewCountTooltip from './Tooltip';

function Dashboard() {
  const { setSeevideo, Seevideo, video, setVideo , interviewCompleted, setInterviewCompleted } = useJobStore();
  
  useEffect(()=>{
     setInterviewCompleted(false);
  },[])
  return (
    <div className='p-10'>
    <h2 className='font-bold text-2xl'> Dashboard</h2>
    <h2 className='text-gray-500'>Create and Start your AI Mock InterView</h2>
    <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
      <AddNewInterview/>
    </div>

    {/* previous interview list */}

    <HistoryInterviewList/>
    {/*  */}
   { video && <SeePreview/>}

 
</div>
  )
}

export default Dashboard