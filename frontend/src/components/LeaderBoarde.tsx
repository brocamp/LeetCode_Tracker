import React from 'react'

const  LeaderBoard = ()=> {
  return (
    <>
  <div className="flex h-32 w-full mb-5 flex-col gap-2 border border-teal-800  transform transition duration-500 hover:scale-105  bg-white shadow-lg rounded-lg p-2 ">
    <div className="flex h-14 w-full flex-row gap-2  border border-black/20  shadow-md  rounded-lg bg-slate-100 p-2">
      <div className="h-full w-full">
        <h1 className="text-center">Badg</h1>
      </div>
      <div className="h-full w-full">
         <h1 className="text-center">Name</h1>
      </div>
      <div className="h-full w-full">
         <h1 className="text-center">Batch</h1>
      </div>
      <div className="h-full w-full">
         <h1 className="text-center">Solved/week</h1>
      </div>
    </div>
    <div className="flex h-14 w-full flex-row gap-2  rounded-lg bg-slate-100 p-2">
      <div className="h-full pl-6 w-full">
      </div>
      <div className="h-full p-2 w-full">
         <h1 className="text-center">Pranav</h1>
      </div>
      <div className="h-full p-2 w-full">
       <h1 className="text-center">BCE 105</h1>
      </div>
      <div className="h-full p-2 w-full">
       <h1 className="text-center">10</h1>
      </div>
    </div>
  </div>



    </>
  )
}

export default LeaderBoard