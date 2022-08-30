import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion'

import UserForm from './UserForm'
import UserInfo from './UserInfo'
import Permissions from './Permissions'


import { editUser } from '../redux/reducers/userSlice'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from '../modal';

const imgMaxSize = 50;

function UserPage({ data }) {
    const [largeFileWarning, setLargeFileWarning] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const { _id, superAdmin, permissions, role } = data

    const { users } = useSelector(state => state.users)
    const user = users.find(u => u._id === _id)
    // const user = data

    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm({ mode: 'onChange' })


    const dispatch = useDispatch()
    const router = useRouter()

    const onSubmit = form_data => {
        setIsPending(true)
        const u = { ...data }
        const {
            first_name,
            last_name,
            role
        } = form_data

        u.first_name = first_name
        u.last_name = last_name
        u.role = role
        u.img = form_data.img ? form_data.img : u.img

        dispatch(editUser(u))
        axios.put(`https://flatrock-api.herokuapp.com/api/users/${_id}`, u)
            .then(res => res.status === 200 && router.push('/'))
    }

    useEffect(() => {
        if (largeFileWarning) setOpenModal(true)
    }, [largeFileWarning])

    return (
        user && <div className='grid lg:grid-cols-3 grid-cols-1 user__page pb-4'>
            <UserInfo
                data={data}
                user={user}
                setValue={setValue}
                setLargeFileWarning={setLargeFileWarning}
                maxSize={imgMaxSize}
            />

            <UserForm
                user={user}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
                dispatch={dispatch}
                editUser={editUser}
                isPending={isPending}
            />
            <Permissions
                permissions={permissions}
                superAdmin={user.superAdmin}
                role={role}
                user={user}
                id={_id}
            />
            <AnimatePresence>
                {
                    openModal && <Modal title="File too large!">
                        <div className='pl-6'>Maximum size for image is <span className='font-bold'>{imgMaxSize}</span> kb</div>
                        <div
                            onClick={() => {
                                setOpenModal(false)
                            }}
                            className="px-6 mt-8 py-1 bg-[#44A0D3] text-white cursor-pointer mx-auto w-fit"
                        >Ok</div>
                    </Modal>
                }
            </AnimatePresence>
        </div>
    )
}

export default UserPage