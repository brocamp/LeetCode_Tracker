
import { AxiosRequestConfig } from 'axios';   
import { apiRequest } from '../config/axios.Config';
import { verifyPayload } from '../api.Types/axios.Postapi.Types';



export const adminAuth = async (Phone:String) => {
    const config: AxiosRequestConfig = {   
      method: 'POST',   
      url: `api/admin/signin`,   
      data:{phone:Phone}
    };   
    return await apiRequest(config);   
  }

export const adminVerify = async(verifyPayload:verifyPayload)=>{
       const config: AxiosRequestConfig = {   
        method: 'POST',   
        url: `api/admin/verify-otp`,   
        data:verifyPayload
      };   
      return await apiRequest(config);   
}  