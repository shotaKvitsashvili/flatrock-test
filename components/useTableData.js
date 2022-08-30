import { useEffect, useState } from 'react'

import axios from "axios"

import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './redux/reducers/userSlice'
import { dataLength } from './redux/reducers/paginationSlice'

const headings = ['user', 'role', 'status', 'actions']

function useTableData() {
    const { users, search_keyword } = useSelector(state => state.users)
    // const { perPage } = useSelector(state => state.pagination)

    const [filterData, setFilterData] = useState(users)
    const [isPending, setIsPending] = useState(true)

    const dispatch = useDispatch()

    const dataLengthDispatcher = (data) => {
        dispatch(dataLength({
            length: data.length,
            end_index: 5,
            pagination_count: Math.ceil(data.length / 5)
        }))
    }

    useEffect(() => {
        axios.get('https://flatrock-api.herokuapp.com/api/users')
            .then(res => {
                dispatch(getUsers(res.data))
                dataLengthDispatcher(res.data)
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

    useEffect(() => {
        dataLengthDispatcher(filterData)
    }, [filterData])

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
        sortBy,
        headings
    }
}

export default useTableData