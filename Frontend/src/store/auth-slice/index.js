import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

// export const registerUser = createAsyncThunk(
//     "/auth/register",
  
//     async (formData) => {
//       const response = await axios.post(
//         "http://localhost:3001/api/v1/auth/register",
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
  
//       return response.data;
//     }
// );


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
})



export const { setUser } = authSlice.actions
export default authSlice.reducer;