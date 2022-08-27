import { useEffect, useReducer, useState } from "react"

import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { usePagination } from "react-use-pagination";

import { getUsers } from '../redux/reducers/userSlice'

import TableRow from "./TableRow.jsx";
import LoaderDots from "../LoaderDots";
import { tableReducer, TABLE_INITIAL_STATE } from "../tableDataReducer";
import TableFooter from "./TableFooter";

function UserTable() {
    const { users } = useSelector(state => state.users)
    const [isPending, setIsPending] = useState(true)
    const [tablePaginationState, reducerDispatch] = useReducer(tableReducer, TABLE_INITIAL_STATE)

    const dispatch = useDispatch()
    const headings = ['user', 'role', 'status', 'actions']

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

    return (
        <div className="w-full pl-side-gap">
            {isPending && <LoaderDots />}

            {
                tablePaginationState.dataLength > 0
                    ?
                    <>
                        <table className="w-full">
                            <thead className="border-b-[#D8D8D8] border-b-2 uppercase">
                                <tr>
                                    {
                                        headings.map((heading, index) => {
                                            const firstItem = index === 0;
                                            const lastItem = index + 1 === headings.length;

                                            return <th
                                                className={`${firstItem ? 'pb-6 text-left' : 'pb-6 opacity-[.3]'} ${lastItem ? 'text-right' : ''}`}
                                                onClick={() => {
                                                    !lastItem && console.log(heading);
                                                }}
                                            >
                                                <div className={`flex items-center gap-2 ${lastItem ? 'justify-end' : (firstItem ? '' : 'justify-center')}`}>
                                                    {heading}
                                                    {!lastItem && <img src="/icons/arrow_down.svg" alt="arrow" />}
                                                </div>
                                            </th>
                                        })
                                    }
                                </tr>
                            </thead>

                            <tbody className="text-center relative">
                                {
                                    users?.slice(tablePaginationState.startIndex, tablePaginationState.endIndex).map(user => (
                                        user && <>
                                            <tr className={`absolute -left-[calc(theme(side-gap)-12px)] ${user.status === 'active' ? '' : 'opacity-[.35]'}`}>
                                                <img src="/icons/user.svg" alt={user.first_name + ' ' + user.last_name} className="mt-[22px]" />
                                            </tr>
                                            <TableRow user={user} />
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>

                        <TableFooter
                            dispatch={reducerDispatch}
                            state={tablePaginationState}
                        />
                    </>
                    :
                    <div className="text-center text-2xl font-bold">
                        {!isPending && 'No records found'}
                    </div>
            }
        </div>
    )
}

export default UserTable