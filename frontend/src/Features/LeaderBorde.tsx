
import LeaderBoard from '../components/LeaderBoarde'

function LeaderBorder() {
  return (
   <div className='p-5 h-[38rem] '>

    <div className='flex mr-6 justify-end'>
    <button
					type="submit"
					className="block w-64 shadow-lg bg-black py-2 mt-2 rounded-lg cursor-pointer   text-white font-semibold mb-2">
					Publish LeaderBoard
				</button>
    </div>
    <div className='p-5   h-[38rem]'>
        <LeaderBoard/>
        <LeaderBoard/>
        <LeaderBoard/>
        <LeaderBoard/>
        <LeaderBoard/>
    </div>
    </div>
  )
}

export default LeaderBorder