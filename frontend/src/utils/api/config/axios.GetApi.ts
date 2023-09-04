import { AxiosRequestConfig } from 'axios';   
import { apiRequest } from '../config/axios.Config';

  
export const getUsers = async ()=> {   
    const config: AxiosRequestConfig = {   
      method: 'GET',   
      url: '/users',   
    };   
    return await apiRequest(config);   
  }

export const getUser = async (userId: string)=> {   
    const config: AxiosRequestConfig = {   
      method: 'GET',   
      url: `/users/${userId}`,   
    };   
    return await apiRequest(config);   
  }