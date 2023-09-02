
import { Line } from "react-chartjs-2";
import { LineChart } from "../components/LineChart";

function Analytic() {
  return (
   <>
    <div className="p-7 mb-2">


    <div className="grid grid-cols-12 h-[38rem] p-5  grid-rows-9 gap-4">
    <div className="col-span-5 h-[20rem] bg-black row-span-4">1</div>
    <div className="col-span-7 h-[20rem] bg-white row-span-4 col-start-6">3</div>
    <div className="col-span-12 h-[25rem] rounded-2xl   bg-white p-5 flex justify-center row-span-5 row-start-5">
       
        <LineChart/>
        
     
    </div>
</div>
</div>
   </>
  )
}

export default Analytic