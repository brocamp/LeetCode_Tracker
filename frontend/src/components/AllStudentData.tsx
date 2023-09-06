import React from 'react'

function AllStudentData() {
  return (
   <>
  <div className=" h-16 bg-[#ece8e0] p-1 justify-center items-center border flex flex-row border-slate-300 shadow-xl  gap-2  rounded-lg">
    <div className="bg-slate-300 rounded-lg pt-1 border border-slate-400 flex justify-center h-8 w-full">
      <span className=" text-lg font-medium ">No</span>
    </div>
    <div className="bg-slate-300 rounded-lg  border border-slate-400  pt-1 flex justify-center h-8 w-full">
      <span className=" text-lg font-medium ">Name</span>
    </div>
    <div className="bg-slate-300 rounded-lg border border-slate-400 pt-1 flex justify-center h-8 w-full">
      <span className=" text-lg font-medium ">Batch</span>
    </div>
    <div className="bg-slate-300 rounded-lg border border-slate-400 pt-1 flex justify-center h-8 w-full">
      <span className=" text-lg font-medium ">User Name</span>
    </div>
  </div>
  <div className="h-[30rem] mt-1 overflow-auto w-auto">
    <div className=" h-12 mt-3 p-1 bg-white justify-evenly items-center border flex flex-row border-slate-400 gap-2  rounded-lg">
      <div className="  pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">1</span>
      </div>
      <div className="  pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">Pranav</span>
      </div>
      <div className="  pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">BCE 40</span>
      </div>
      <div className=" pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">PranavNodejs</span>
      </div>
    </div>
    <div className=" h-12 mt-3 p-1 bg-white justify-evenly items-center border flex flex-row border-slate-400 gap-2  rounded-lg">
      <div className="  pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">2</span>
      </div>
      <div className="  pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">Pranav</span>
      </div>
      <div className="  pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">BCE 40</span>
      </div>
      <div className=" pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">PranavNodejs</span>
      </div>
    </div>
    <div className=" h-12 mt-3 p-1 bg-white justify-evenly items-center border flex flex-row border-slate-400 gap-2  rounded-lg">
      <div className="  pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">3</span>
      </div>
      <div className="  pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">Pranav</span>
      </div>
      <div className="  pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">BCE 40</span>
      </div>
      <div className=" pt-1 flex justify-center h-8 w-full">
        <span className=" text-lg font-medium ">PranavNodejs</span>
      </div>
    </div>
   




   
    
  </div>
   </>
  )
}

export default AllStudentData