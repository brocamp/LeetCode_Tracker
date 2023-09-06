import React, { useState } from 'react'
import AllStudentData from '../components/AllStudentData'


function StudentsDetails() {
    const [allStudents,setAllStudents] = useState(true);
    const [notDone,setNotDone] = useState(false);

    const handleNotDone =()=>{
           setNotDone(true);
           setAllStudents(false)
    }
    const handleAllStudents=()=>{
        setNotDone(false);
           setAllStudents(true)
    }

  return (
   <>
  <div className=" h-28 bg-white justify-center items-center border flex flex-row border-black/30 shadow-xl  gap-2  rounded-lg">
    <div onClick={handleAllStudents} className={ allStudents ?  "w-[50%] cursor-pointer h-[50%] ml-3.5 bg-slate-100 border-l-[15px] border-l-teal-600 rounded-lg  border-2 flex justify-center p-3 shadow-xl border-teal-600" : "w-[50%] cursor-pointer h-[50%] ml-3.5 p-3  hover:shadow-xl hover:border-black/40       rounded-lg border  flex justify-center  border-slate-300 "} >
      <span className="       text-center text-lg font-medium ">All Student's</span>
    </div>
    <div onClick={handleNotDone} className={ notDone ?  "w-[50%] cursor-pointer h-[50%] mr-2 bg-slate-100 border-r-[15px] border-r-red-600 rounded-lg  border-2 flex justify-center p-3 shadow-xl border-red-600" : "w-[50%] cursor-pointer h-[50%] mr-2 p-3  hover:shadow-xl hover:border-black/40       rounded-lg border  flex justify-center  border-slate-300 "}>
      <span className="text-center text-lg font-medium ">Student's not done</span>
    </div>
  </div>
  <div className='h-[38rem] overflow-hidden p-5 rounded-lg mt-3 w-full bg-white border border-slate-200'>
    <AllStudentData/>
  </div>
   </>
  )
}

export default StudentsDetails