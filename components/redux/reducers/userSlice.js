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
        editUser: (state, action) => {
            const { payload } = action
            const { _id } = payload

            const index = state.users.findIndex((e) => e._id === _id)
            if (index !== -1) state.users[index] = payload

        },
        deleteUser: (state, action) => { state.users = state.users.filter(user => user._id !== action.payload) },
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