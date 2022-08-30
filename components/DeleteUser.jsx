import axios from "axios"
import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import { deleteUser } from './redux/reducers/userSlice'
import { dataLength } from "./redux/reducers/paginationSlice";

function DeleteUser({ firstName, lastName, id, setOpenModal, userDeleted, setUserDeleted }) {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)

    const handleDeleteUser = () => {
        axios.delete('https://flatrock-api.herokuapp.com/api/users/' + id)
            .then(() => {
                const userLength = users.length - 1;

                dispatch(deleteUser(id))
                dispatch(dataLength({
                    length: userLength,
                    pagination_count: Math.ceil(userLength / 5),
                    current_page: Math.ceil(userLength / 5)
                }))

                setUserDeleted(true)
            })
    }

    useEffect(() => {
        return () => setUserDeleted(false)
    }, [])

    return (
        userDeleted
            ?
            <div className="flex flex-col items-center">
                <div className="text-2xl">User deleted successfully!</div>
                <div
                    onClick={() => {
                        setOpenModal(false)
                        setUserDeleted(false)
                    }}
                    className="px-6 py-1 mt-5 bg-[#f79796] text-white cursor-pointer"
                >Ok</div>
            </div>
            :
            <div className="pl-6">
                <div className="relative flex items-center">
                    <div className="absolute top-0 -left-10 pt-[2px]">
                        <img
                            src="/icons/face.svg"
                            alt="user"
                        />
                    </div>

                    <div className="flex items-center justify-between w-full border-b border-[#D8D8D8] pb-8">
                        <span>{firstName + ' '} {lastName}</span>
                        <span className="text-[#44A0D3] font-bold">Active User</span>
                    </div>
                </div>
                <div
                    onClick={handleDeleteUser}
                    className="rounded-[24px] px-6 py-2 bg-[#f79796] text-white w-fit cursor-pointer mt-6"
                >Delete User</div>
            </div>
    )
}

export default DeleteUser