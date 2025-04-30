import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


//-------------------------------THUNKs------------------------------------------
//----------------------(Register)--------------------------------------
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => { 
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        password: userData.password
      })
      const user = response.userData.user;
      const msg = response.userData.msg;
      console.log(msg);
      return {user,msg}

    }
    catch (error) { 
      const msg = error.message;
      return { msg };
    } 
    })
//-------------------------------------(LOGIN)-----------------------------

export const login = createAsyncThunk(
  "users/login",
  async (userData,{rejectWithValue}) => {
  try {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
   email: userData.email,
  password: userData.password,
  });
  const user = response.data.user;
  const msg = response.data.msg;
  return { user, msg };
  } catch (error) {
   //const msg = 'Invalid credentials';
  const msg = error.response.data.msg;
  return rejectWithValue({ msg });
  }
  }
 );
///--------------------------(LOGOUT)-----------------------------------
export const logout = createAsyncThunk(
  "users/logout",
  async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`);
      const msg = response.data.msg
      console.log(msg)
      return { msg }
    }
    catch (err) { }
  })
//--------------------------Rudecer--------------------------------------
const initialState = {
  user:null,
  msg: null,
  status: null,
  isLogin:false,

}
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: 
    (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.status="loading"
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.status =  "success";
          state.isSuccess = true;
          state.user = action.payload.user;
          state.msg = action.payload.msg;

        })
        .addCase(registerUser.rejected, (state) => {
          state.isError = true;
          state.msg = "Unexpected error is occured";
        })
        .addCase(login.pending, (state) => {
          state.status = "loading"
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = "success";
          state.user = action.payload.user;
          state.msg = action.payload.msg;
          state.isLogin = true;
        })
        .addCase(login.rejected, (state, action) => {
          state.status = "rejected";
          state.isLogin = false;
          state.user = null;
          state.msg = action.error.message;
        })
        .addCase(logout.pending, (state) => {
          state.status = "loading"
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.status = "success";
          state.isLogin = false;
          state.user = null;
          state.msg =action.payload.msg;          
        })
        .addCase(logout.rejected, (state) => {
          state.status = "rejected";
        });

      }
  
  

}) ;
export default userSlice.reducer;