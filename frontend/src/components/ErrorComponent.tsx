import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorComponent() {
  return (
   <>
   {/* <div className="grid h-screen bg-[#ece8e0]  px-4  place-content-center">
  <h1 className="tracking-widest text-gray-500 uppercase">404 | Not Found</h1>
  <h1 className="tracking-widest text-gray-500 uppercase"></h1>The provided url is not a valied on 
</div> */}
<>
  {/* ====== Error 404 Section Start */}
  {/* <section className="bg-blue-500  relative z-10 py-[120px] h-screen">
    <div className="container mx-auto">
      <div className="-mx-4 flex">
        <div className="w-full px-4">
          <div className="mx-auto max-w-[400px] text-center">
            <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
              404
            </h2>
            <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
              Oops! That page can’t be found
            </h4>
            <p className="mb-8 text-lg text-white">
              The page you are looking for it maybe deleted
            </p>
            <a
              href="javascript:void(0)"
              className="hover:text-primary inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white"
            >
              Go To Home
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
      <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
      <div className="flex h-full w-1/3">
        <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
        <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
      </div>
      <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
    </div>
  </section> */}
  <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full">
  <div className="text-center">
    <div className="inline-flex rounded-full bg-yellow-100 p-4">
      <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
        <svg
          className="w-16 h-16"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
    <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
      404 - Page not found
    </h1>
    <p className="text-slate-600 mt-5 lg:text-lg">
      The page you are looking for doesn't exist or <br />
      has been removed.
    </p>
  </div>
</div>

  {/* ====== Error 404 Section End */}
</>


   </>
  )
}

export default ErrorComponent