import { AxiosRequestConfig } from 'axios';   
import { apiRequest, headerConfg } from '../config/axios.Config';

  
export const getDailyMetrics = async ()=> {   
    const config: AxiosRequestConfig = {   
      method: 'GET',   
      url: 'api/student/daily-metrics',
      headers:headerConfg()   
    };   
    return await apiRequest(config);   
  }
