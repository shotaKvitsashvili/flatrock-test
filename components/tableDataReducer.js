export const TABLE_INITIAL_STATE = {
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

export const tableReducer = (state, action) => {
    let end_index;
    switch (action.type) {
        case 'PERPAGE_CHANGE':
            const per_page = parseInt(action.payload)
            end_index = state.currentPage * per_page

            return {
                ...state,
                perPage: per_page,
                startIndex: end_index - per_page,
                endIndex: end_index,
                paginationCount: createPaginationArray(state.dataLength / per_page)
            }

        case 'DATALENGTH':
            return {
                ...state,
                dataLength: action.payload,
                startIndex: action.end_index - state.perPage,
                endIndex: action.end_index,
                paginationCount: createPaginationArray(action.pagination_count)
            }

        case 'GO_TO_PAGE':
            end_index = action.payload * state.perPage

            return {
                ...state,
                currentPage: action.payload,
                endIndex: end_index,
                startIndex: end_index - state.perPage,
            }

        case 'GO_TO_PREV':
            end_index = (action.payload - 1) * state.perPage

            return {
                ...state,
                currentPage: action.payload - 1,
                startIndex: end_index - state.perPage,
                endIndex: end_index,
            }

        case 'GO_TO_NEXT':
            end_index = (action.payload + 1) * state.perPage

            return {
                ...state,
                currentPage: action.payload + 1,
                startIndex: end_index - state.perPage,
                endIndex: end_index,
            }

        default: return state
    }
}