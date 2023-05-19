import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  user: "",
  token: "",
  loading: false,
};

export const loginUser = createAsyncThunk("user", async (body) => {
  let res = await fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/josn",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Micro Reducer
    addToken(state, action) {
      state.token = localStorage.getItem("token");
    },
    addUser(state, action) {
      state.user = localStorage.getItem("user");
    },
  },

  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload: { user, token } }) => {
      state.loading = false;
      state.token = token;
      state.user = user;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser, deleteUsers } = userSlice.actions;
