import { useState } from 'react'

import Link from "next/link";
import { AnimatePresence } from "framer-motion";

import { useDispatch } from 'react-redux'

import Modal from "../modal";
import DeleteUser from "../DeleteUser";
import { editUser } from '../redux/reducers/userSlice'
import axios from 'axios';


function TableRow({ user }) {
    const [openModal, setOpenModal] = useState(false)
    const [userDeleted, setUserDeleted] = useState(false)

    const dispatch = useDispatch()

    const handleUserStatusChange = e => {
        const { checked } = e.target;

        const u = { ...user }
        u.status = checked ? 'active' : 'inactive'
        dispatch(editUser(u))

        axios.put(`http://localhost:3002/api/users/status/${user._id}`, { checked })
    }

    return (
        <>
            <tr key={user.first_name} className="capitalize border-b-[#D8D8D8] border-b-2 font-semibold">
                <td
                    className={`text-left py-4 ${user.status === 'active' ? '' : 'opacity-[.35]'}`}
                    height={60}
                >
                    <div className='flex flex-col'>
                        {user.first_name + ' ' + user.last_name}
                        <span className='font-light'>{user.email}</span>
                    </div>
                </td>

                <td>
                    <div className={`flex items-center w-full justify-center ${user.status === 'active' ? '' : 'opacity-[.35]'}`}>
                        {
                            user.role === 'admin' && (
                                <div className={`rounded-[30px] mr-2 py-1 px-2 ${user.status === 'active' ? 'bg-[#7E7EF1]' : 'bg-transparent'}`}>
                                    {
                                        user.status === 'active'
                                            ?
                                            <img src='/icons/key.svg' alt='key' />
                                            :
                                            <img src='/icons/key_black.svg' alt='key' />
                                    }
                                </div>
                            )
                        }

                        {user.role}
                    </div>
                </td>

                <td>
                    <label className={`user__status__switch ${user.status === 'active' ? 'user-active' : 'user-inactive'}`}>
                        <input
                            type="checkbox"
                            className='user__status__switch__checkbox'
                            onChange={e => handleUserStatusChange(e)}
                            defaultChecked={user.status === 'active'}
                        />
                    </label>
                </td>

                <td>
                    <div className="flex justify-end items-center gap-3">
                        {
                            user.status === 'active' && <Link href={`/users/${user._id}`}>
                                <a>
                                    <img src="/icons/gear_grey.svg" alt="gear_grey" className='w-[28px]' />
                                </a>
                            </Link>
                        }

                        <div onClick={() => setOpenModal(true)} className="cursor-pointer">
                            <img src="/icons/delete.svg" alt="delete" className='w-[15px]' />
                        </div>
                    </div>
                </td>
            </tr>

            <AnimatePresence>
                {
                    openModal && <Modal setOpenModal={setOpenModal} title={userDeleted ? '' : 'Delete user'}>
                        <DeleteUser
                            firstName={user.first_name}
                            lastName={user.last_name}
                            id={user._id}
                            setOpenModal={setOpenModal}
                            userDeleted={userDeleted}
                            setUserDeleted={setUserDeleted}
                            openModal={openModal}
                        />
                    </Modal>
                }
            </AnimatePresence>
        </>
    )
}

export default TableRow