import React from 'react'

const  LeaderBoard = (prop:any)=> {
  return (
    <>
  <div key={prop.index} className="flex h-32  w-full mb-5 flex-col gap-2 border border-teal-800  transform transition duration-500 hover:scale-105  bg-white shadow-lg rounded-lg p-2 ">
    <div className="flex h-14 w-full flex-row gap-2  border border-black/20  shadow-md  rounded-lg bg-slate-100 p-2">
      <div className="h-full w-full">
        <h1 className="text-center text-lg font-medium text-teal-800">Rank</h1>
      </div>
      <div className="h-full w-full">
         <h1 className="text-center text-lg font-medium text-teal-800">Name</h1>
      </div>
      <div className="h-full w-full">
         <h1 className="text-center text-lg font-medium text-teal-800">Batch</h1>
      </div>
      <div className="h-full w-full">
         <h1 className="text-center text-lg font-medium text-teal-800">Solved/week</h1>
      </div>
    </div>
    <div className="flex h-14 w-full flex-row gap-2  rounded-lg bg-slate-100 p-2">
      <div className="h-full flex justify-center  pl-2 w-full">
        <div className='w-10 rounded-full   border border-black shadow-lg bg-indigo-200 h-full '>
        <h1 className="text-center mt-2">{prop.index+1}</h1>
        </div>
     
      </div>
      <div className="h-full  p-2 w-full">
         <h1 className="text-center">{prop.rank.name}</h1>
      </div>
      <div className="h-full p-2 w-full">
       <h1 className="text-center">{prop.rank.batch}</h1>
      </div>
      <div className="h-full p-2 w-full">
       <h1 className="text-center">{prop.rank.totalSolvedCountInThisWeek}</h1>
      </div>
    </div>
  </div>
    </>
  )
}

export default LeaderBoard