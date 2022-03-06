import axios from 'axios'
import { useEffect } from 'react'
import { axios_config } from '../config/axios'
import { ENDPOINTS } from '../config/Endpoints'

const useAxios = () => {
    const custom_axios = axios.create({baseURL:ENDPOINTS.BASEURL, headers:{'Content-Type': 'application/json'}, withCredentials:true})
    
    useEffect(()=>{
        const responseIntercept = custom_axios.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    await axios.get(ENDPOINTS.REFRESHTOKEN,axios_config)
                    return custom_axios(prevRequest)
                }
                return Promise.reject(error)
            }
        )
        return () => {
            custom_axios.interceptors.response.eject(responseIntercept)
        }
    })
    return custom_axios;
}

export default useAxios