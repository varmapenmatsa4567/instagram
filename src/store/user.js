import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        removeUser: (state) => {
            state.user = null;
            state.isAuth = false;
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;