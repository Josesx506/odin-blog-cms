import axios from 'axios';

const EXPRESS_URL=process.env.NEXT_PUBLIC_EXPRESSURL;

const axiosApi = axios.create({
    baseURL: EXPRESS_URL,
    withCredentials: true
})

// Define the axios request and response interceptors
function setInterceptors(getAccessToken, refreshToken) {
  let refreshAttempts = 0;
  const MAX_REFRESH_ATTEMPTS = 2;

  // Request interceptor
  const reqId = axiosApi.interceptors.request.use(async (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  
  // Response interceptor
  const resId = axiosApi.interceptors.response.use(
    res => res,
    async err => {
      const originalRequest = err.config
      
      // ⛔️ Prevent infinite loop: Prevent retries from the refresh endpoint
      if (originalRequest.url.includes('/refresh')) {
        return Promise.reject(err);
      }

      if (
        err.response?.status === 401 && 
        !originalRequest._retry  &&
        refreshAttempts < MAX_REFRESH_ATTEMPTS
      ) {
        originalRequest._retry = true;
        refreshAttempts += 1;

        const newToken = await refreshToken()
        
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosApi(originalRequest)
        }
      }
      return Promise.reject(err)
    });
  
  return { reqId, resId };
}

export { axiosApi,setInterceptors }