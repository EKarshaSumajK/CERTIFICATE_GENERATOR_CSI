import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null ,
  data: [],
  image: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduser: (state, action) => {
      state.user = action.payload
    },
    adddata: (state, action) => {
      state.data = action.payload;
    },
    addimage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const {
  adduser,
  adddata,
  addimage,
} = userSlice.actions;

export default userSlice.reducer;
