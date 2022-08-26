import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => { state.users = action.payload },
        addUser: (state, action) => { state.users.unshift(action.payload) },
        editUser: () => { },
        deleteUser: (state, action) => { state.users = state.users.filter(user => user.id !== action.payload) },
        filterUser: (state, action) => {
            const val = action.payload
            return {
                ...state,
                users: state.users.filter(user => user.first_name.includes(val))
            }
        }
    }
})

export const { getUsers, addUser, editUser, deleteUser, filterUser } = userSlice.actions
export default userSlice.reducer