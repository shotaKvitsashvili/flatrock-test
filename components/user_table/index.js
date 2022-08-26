import { useEffect } from "react"

import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

import { getUsers } from '../redux/reducers/userSlice'

import TableRow from "./TableRow.jsx";

function UserTable() {
    // const [users, setUsers] = useState(null)
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)

    useEffect(() => {
        axios.get('http://localhost:3000/users?_sort=id&_order=DESC')
            .then(res => dispatch(getUsers(res.data)))
    }, [])
    return (
        <div className="w-full">
            {/* <DataTable
                columns={columns}
                data={users}
            /> */}
            <table className="w-full">
                <thead className="border-b-[#D8D8D8] border-b-2 uppercase">
                    <tr>
                        <th className="text-left">user</th>
                        <th>role</th>
                        <th>status</th>
                        <th className="text-right">action</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    {
                        users.map(user => (
                            user && <TableRow user={user} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTable