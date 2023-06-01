import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";


let initialState = {
  user: {},
  token: "",
  loading: false,
};

export const loginUser = createAsyncThunk("user", async (body) => {
  try {
    let res = await fetch("http://localhost:8086/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(`Error while login -> `, error);
  }
});

// {
//   "email": "newsuser@mailinator.com",
//   "password": "pass@12345"
// }

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Micro Reducer
    addToken(state, action) {
      state.token = localStorage.getItem("token");
    },
    addUser(state, action) {
      console.log(`-->`, action.payload);
      state.user = action.payload;
    },
  },

  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload: { data, token } }) => {
      console.log(`===>1`, data);
      console.log(`===>2`, token);

      state.loading = false;
      state.token = token;
      state.user = data;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(data));
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser, deleteUsers } = userSlice.actions;
