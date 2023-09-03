import axios, { AxiosRequestConfig } from 'axios';   



export const api = axios.create({   
    baseURL: 'http://localhost:80/',   
    timeout: 5000,   
  });

//   const token = sessionStorage.getItem('jwt');

// if (token) {   
//   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;   
// }


export const apiRequest = async(config: AxiosRequestConfig) => {   
    try {   
      const response = await api(config);   
      return response;   
    } catch (error) {   
      console.error(error,'errr');   
      throw error;   
    }   
  };


export const headerConfg = () =>{
  const token = localStorage.getItem('adminToken')
  if (token) {   
       return  {
        'Authorization':` Bearer ${token}`
      }  
     }
}

  