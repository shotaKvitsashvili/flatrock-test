import axios from "axios"

import { useDispatch } from "react-redux"

import { deleteUser } from './redux/reducers/userSlice'

function DeleteUser({ firstName, lastName, id, setOpenModal, userDeleted, setUserDeleted }) {
    const dispatch = useDispatch()

    const handleDeleteUser = () => {
        axios.delete('http://localhost:3002/api/users/' + id)
            .then(() => {
                dispatch(deleteUser(id))
                setUserDeleted(true)
            })
    }

    return (
        userDeleted
            ?
            <div className="flex flex-col items-center">
                <div className="text-2xl">User successfully deleted!</div>
                <div
                    onClick={() => {
                        setOpenModal(false)
                        setUserDeleted(false)
                    }}
                    className="px-6 py-1 mt-5 bg-[#44A0D3] text-white cursor-pointer"
                >Ok</div>
            </div>
            :
            <div>
                delete: {firstName + ' '} {lastName}
                <div onClick={handleDeleteUser}>delete</div>
            </div>
    )
}

export default DeleteUser