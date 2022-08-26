import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: () => { },
        editUser: () => { },
        deleteUser: () => { },
        filterUser: (state, action) => {
            const val = action.payload
            console.log(val);
        }
    }
})

export const { addUser, editUser, deleteUser, filterUser } = userSlice.actions
export default userSlice.reducer