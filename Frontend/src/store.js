import { create } from 'zustand';

const useJobStore = create((set) => ({
  jobPosition: '',
  setJobPosition: (pos) => set({ jobPosition: pos }),

  jobDescription: '',
  setJobDescription: (desc) => set({ jobDescription: desc }),

  jobExperience: '',
  setJobExperience: (exp) => set({ jobExperience: exp }),

  seeVideo:false,
  setSeevideo :(exp)=>set({seeVideo:exp}),
  video:'',
  setVideo :(exp)=>set({video:exp}),

   interviewCompleted: false,
   
  setInterviewCompleted: (value) => set({ interviewCompleted: value }),
}));

export default useJobStore;
