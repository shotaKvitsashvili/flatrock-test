import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    search_keyword: ''
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload
        },
        addUser: (state, action) => {
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        },
        editUser: (state, action) => {
            const { payload } = action
            const { _id } = payload

            const index = state.users.findIndex((e) => e._id === _id)
            if (index !== -1) state.users[index] = payload

        },
        deleteUser: (state, action) => {
            const withoutDeleted = state.users.filter(user => user._id !== action.payload)
            return {
                ...state,
                users: withoutDeleted
            }
        },
        filterKeyword: (state, action) => {
            state.search_keyword = action.payload
            // const val = action.payload
            // return {
            //     ...state,
            //     users: state.users.filter(user => user.first_name.includes(val))
            // }
        }
    }
})

export const { getUsers, addUser, editUser, deleteUser, filterKeyword } = userSlice.actions
export default userSlice.reducer