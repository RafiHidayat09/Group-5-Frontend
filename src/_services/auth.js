import { useJwt } from "react-jwt";
import { API } from "../_api";

export const login = async ({ email, password}) => {
    try {
      const { data } = await API.post('/login', { email, password})
      return data 
    } catch (error) {
      console.log(error);
      throw error
    }
}

export const logout = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    
   
    if (!token) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      return { success: true };
    }

    const { data } = await API.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    
    return data;
  } catch (error) {
    console.log('Logout error:', error);
    
   
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    
    return { success: true, message: 'Logged out locally' };
  }
}



export const register = async ({ name, email, password, role = "user" }) => {
  try {
    const { data } = await API.post("/register", { name, email, password, role });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token)
  try {
    if (isExpired) {
      return  {
        success: false,
        message: "Token Expired",
        data: null
      }
    }
    return {
      success: true,
      message: "Token Valid",
      data: decodedToken
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}



