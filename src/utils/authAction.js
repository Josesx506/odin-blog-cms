'use server';

import { axiosApi } from '@/api/axios';

async function registerUserAction(body,author=false,timeoutMs = 10000) {
  const user = body;
  if (author) { user["role"] = "AUTHOR" };
  const controller = new AbortController();

  // Set up timeout to abort if it takes too long
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  
  try {
    const resp = await axiosApi.post("/v1/auth/signup", 
      JSON.stringify(user), { 
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        signal: controller.signal}
    )
    
    clearTimeout(timeoutId);
    const data = resp.data;

    if (resp.status===200) {
      return { success: true, message: 'User registered successfully!' };
    } else {
      return { success: false, error: data?.message || 'Failed to create user' };
    }
    
  
  } catch(err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { success: false, error: 'Request timed out. Please try again.'};
    }

    return { success: false, error: err.message || 'No server response' }
  }
}


export { registerUserAction }