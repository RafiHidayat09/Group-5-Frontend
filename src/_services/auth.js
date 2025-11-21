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
    
    // Jika token tidak ada, langsung return success
    if (!token) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      return { success: true };
    }

    // Coba logout ke server
    const { data } = await API.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Hapus token setelah berhasil
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    
    return data;
  } catch (error) {
    console.log('Logout error:', error);
    
    // Meskipun API gagal (401/expired), tetap hapus token lokal
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    
    // Return success agar user tetap bisa logout dari frontend
    return { success: true, message: 'Logged out locally' };
  }
}

// export const logout = async ({token}) => {
//   try {
//     const { data } = await API.post('/logout', { token }, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//       }
//     })
//     localStorage.removeItem('accessToken')
//     return data
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }

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



