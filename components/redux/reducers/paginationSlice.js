import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    perPage: 5,
    dataLength: 0,
    paginationCount: [],
    currentPage: 1,
    startIndex: 0,
    endIndex: 0,
}

const createPaginationArray = (count) => {
    const countArr = []
    for (let i = 0; i < count; i++) {
        countArr.push(i)
    }

    return countArr
}

let end_index;

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        perpageChange: (state, action) => {
            const per_page = parseInt(action.payload)
            end_index = state.currentPage * per_page

            return {
                ...state,
                perPage: per_page,
                startIndex: end_index - per_page,
                endIndex: end_index,
                paginationCount: createPaginationArray(state.dataLength / per_page)
            }
        },
        dataLength: (state, action) => {
            const { length, end_index, pagination_count, current_page } = action.payload

            return {
                ...state,
                dataLength: length,
                startIndex: end_index - state.perPage,
                endIndex: end_index,
                paginationCount: createPaginationArray(pagination_count),
                currentPage: current_page || state.currentPage
            }
        },
        goToPage: (state, action) => {
            end_index = action.payload * state.perPage

            return {
                ...state,
                currentPage: action.payload,
                endIndex: end_index,
                startIndex: end_index - state.perPage,
            }
        },
        goToPrev: (state, action) => {
            end_index = (state.currentPage - 1) * state.perPage

            return {
                ...state,
                currentPage: state.currentPage - 1,
                startIndex: end_index - state.perPage,
                endIndex: end_index,
            }
        },
        goToNext: (state, action) => {
            end_index = (state.currentPage + 1) * state.perPage

            return {
                ...state,
                currentPage: state.currentPage + 1,
                startIndex: end_index - state.perPage,
                endIndex: end_index,
            }
        }
    }
})


export const { perpageChange, dataLength, goToPage, goToPrev, goToNext } = paginationSlice.actions
export default paginationSlice.reducer