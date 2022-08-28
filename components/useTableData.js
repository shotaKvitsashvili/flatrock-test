import { useEffect, useState, useReducer } from 'react'

import axios from "axios"

import { tableReducer, TABLE_INITIAL_STATE } from "./tableDataReducer";

import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './redux/reducers/userSlice'

const headings = ['user', 'role', 'status', 'actions']

function useTableData() {
    const { users, search_keyword } = useSelector(state => state.users)
    const [filterData, setFilterData] = useState(users)
    const [isPending, setIsPending] = useState(true)

    const [tablePaginationState, reducerDispatch] = useReducer(tableReducer, TABLE_INITIAL_STATE)

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('http://localhost:3002/api/users')
            .then(res => {
                dispatch(getUsers(res.data))
                reducerDispatch({
                    type: 'DATALENGTH',
                    payload: res.data.length,
                    end_index: 5,
                    pagination_count: Math.ceil(res.data.length / 5)
                })
                setIsPending(false)
            })
            .catch(() => setIsPending(false))
    }, [])

    useEffect(() => {
        const u = [...users]
        if (search_keyword.length > 0) {
            setFilterData(u.filter(user =>
                user.first_name.toLowerCase().includes(search_keyword.toLowerCase())
                ||
                user.last_name.toLowerCase().includes(search_keyword.toLowerCase())
            ))
        } else {
            setFilterData(users)
        }
    }, [search_keyword, users])

    const sortBy = (key, order) => {
        setFilterData(
            [...filterData].sort((a, b) => {
                return order === 'asc'
                    ?
                    a[key].toLowerCase().localeCompare(b[key].toLowerCase())
                    :
                    b[key].toLowerCase().localeCompare(a[key].toLowerCase())
            })
        )
    }

    return {
        filterData,
        isPending,
        tablePaginationState,
        sortBy,
        reducerDispatch,
        headings
    }
}

export default useTableData