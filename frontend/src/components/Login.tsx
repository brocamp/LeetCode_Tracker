import React from 'react'

const  Login = ()=> {
  return (
    <div className="flex mt-32 justify-center">
			<div className="flex w-full lg:w-1/2  relative justify-center items-center space-y-8">
      <div className="w-full  px-8 md:px-32 rounded-2xl lg:px-24">
        <form className="bg-white h-[25rem] rounded-2xl shadow-2xl p-12">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
           Hey, Admin
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-8">Enter your details to get sign in</p>
          <div className="flex items-center cursor-pointer border-2 mb-8 py-2 px-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
               
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              id="email"
              className=" pl-2 w-full cursor-pointer outline-none border-none"
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </div>
          <div className="flex items-center cursor-pointer shadow-sm border-2 mb-12 py-2 px-3 rounded-lg ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 w-full cursor-pointer   outline-none border-none"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-black mt-5 py-2 rounded-lg cursor-pointer  hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
	</div>
  )
}

export default Login