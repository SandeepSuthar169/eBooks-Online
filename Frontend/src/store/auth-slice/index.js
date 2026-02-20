import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { handler } from "tailwindcss-animate";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
    "/auth/register",
  
    async (formData) => {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
);


export const loginUser = createAsyncThunk(
    "/auth/login",
  
    async (formData) => {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  );


export const checkMe = createAsyncThunk(
    "/auth/checkMe",
  
    async () => {
      const response = await axios.get(
        "http://localhost:3001/api/v1/auth/checkMe",
        {
          withCredentials: true,
          handler: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
          }
        }
      );
  
      return response.data;
    }
  );


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      // register part
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
          .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        // login part 
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
      })
        .addCase(loginUser.fulfilled, (state, action) => {
          console.log(action);
          
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user: null 
          state.isAuthenticated = action.payload.success;
      })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
      })
      // check me 
      .addCase(checkMe.pending, (state) => {
        state.isLoading = true;
    })
      .addCase(checkMe.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user: null 
        state.isAuthenticated = action.payload.success;
    })
      .addCase(checkMe.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
    })

    }
})



export const { setUser } = authSlice.actions
export default authSlice.reducer;