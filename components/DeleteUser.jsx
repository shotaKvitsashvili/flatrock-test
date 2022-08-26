import axios from "axios"

import { useDispatch } from "react-redux"

import { deleteUser } from './redux/reducers/userSlice'

function DeleteUser({ firstName, lastName, id, setOpenModal }) {
    const dispatch = useDispatch()

    const handleDeleteUser = () => {
        dispatch(deleteUser(id))
        axios.delete('http://localhost:3000/users/' + id)
            .then(() => {
                dispatch(deleteUser(id))
                setOpenModal(false)
            })
    }

    return (
        <div>
            delete: {firstName + ' '} {lastName}
            <div onClick={handleDeleteUser}>delete</div>
        </div>
    )
}

export default DeleteUser