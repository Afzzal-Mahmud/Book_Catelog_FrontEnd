  import { createSlice } from '@reduxjs/toolkit';
  
  const initialState = {
    userStatus: false
  };

  export const userSlice = createSlice({
    name: "user/status",
    initialState,
    reducers: {
      setUserStatus: (state, action) => {
        state.userStatus = action.payload;
      },
    },
  });
  
  export const { setUserStatus } = userSlice.actions;
  
  export default userSlice.reducer;
  