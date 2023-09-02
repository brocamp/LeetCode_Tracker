import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorComponent() {
    const error:any = useRouteError();
    console.log(error,'errror');
    

  return (
   <>
   <div className="grid h-screen bg-[#ece8e0]  px-4  place-content-center">
  <h1 className="tracking-widest text-gray-500 uppercase">404 | Not Found</h1>
  <h1 className="tracking-widest text-gray-500 uppercase">{error.error.message}</h1>
</div>

   </>
  )
}

export default ErrorComponent