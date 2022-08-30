import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"


import { addUser } from './redux/reducers/userSlice'
import { dataLength } from "./redux/reducers/paginationSlice";

function InviteForm({ setOpenModal, setUserAdded, userAdded }) {
    const [isSending, setIsSending] = useState(false)
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)

    const onSubmit = data => {
        setIsSending(true)
        const body = {
            ...data,
            status: 'active',
            img: '/icons/user.svg'
        }
        axios.post('https://flatrock-api.herokuapp.com/api/users', body)
            .then(res => {
                const userLength = users.length + 1;

                dispatch(addUser(res.data))
                dispatch(dataLength({
                    length: userLength,
                    end_index: 5,
                    pagination_count: Math.ceil(userLength / 5)
                }))

                setIsSending(false)
                setUserAdded(true)
            })
            .catch(() => setIsSending(false))
    };

    useEffect(() => {
        return () => setUserAdded(false)
    }, [])

    const ErrorMessage = ({ name }) => <div className="text-red-500">{errors[name] && errors[name].message}</div>

    return (
        userAdded
            ?
            <div className="flex flex-col items-center">
                <div className="text-2xl">User added successfully!</div>
                <div
                    onClick={() => {
                        setOpenModal(false)
                        setUserAdded(false)
                    }}
                    className="px-6 py-1 mt-5 bg-[#44A0D3] text-white cursor-pointer"
                >Ok</div>
            </div>
            :
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex justify-between gap-1 relative pl-7">
                    <img
                        src="/icons/face.svg"
                        alt="user"
                        className="absolute top-1/2 -translate-y-1/2 -left-4"
                    />

                    <div className="flex-grow-[1] floatable-label-container">
                        <input
                            type="text"
                            {...register('first_name', { required: "First name is required" })}
                            className="bordered-input w-full"
                            placeholder="* First Name"
                        />
                        <label className="text-[#33A3DC]">* First Name</label>
                        <ErrorMessage name="first_name" />
                    </div>

                    <div className="flex-grow-[1] floatable-label-container">
                        <input
                            type="text"
                            {...register('last_name', { required: "Last name is required" })}
                            className="bordered-input w-full"
                            placeholder="* Last Name"
                        />
                        <label className="text-[#33A3DC]">* Last Name</label>
                        <ErrorMessage name="last_name" />
                    </div>
                </div>

                <div className="my-14 w-full">
                    <div className="flex items-center relative pl-7">
                        <img
                            src="/icons/email_at.svg"
                            alt="at"
                            className="absolute top-1/2 -translate-y-1/2 -left-4"
                        />

                        <div className="w-full floatable-label-container">
                            <input
                                type="email"
                                {...register('email', { required: "required", pattern: { value: /\S+@\S+\.\S+/, message: 'Email is required' } })}
                                className="bordered-input w-full"
                                placeholder="* Email"
                            />
                            <label className="text-[#33A3DC]">* Email</label>
                            <div className="absolute -bottom-[24px]">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center relative pl-7">
                    <img
                        src="/icons/key_black.svg"
                        alt="key"
                        className="absolute top-1/2 -translate-y-1/2 -left-4"
                    />

                    <div className="flex justify-between gap-1 flex-grow-[1] floatable-label-container">
                        <select
                            {...register('role', { required: "Role is required" })}
                            className="bordered-input flex-grow-[1] w-full max-w-[unset] lg:max-w-[50%]"
                            defaultValue="user"
                        >
                            <option value="role" disabled>* Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <div className="flex-grow-[1]"></div>
                        <label className="text-[#33A3DC]">* Role</label>
                    </div>
                    <ErrorMessage name="role" />
                </div>

                <div className="flex justify-between mt-9 items-center pl-0 lg:pl-7 flex-col-reverse lg:flex-row">
                    <button
                        className="rounded-[24px] px-4 py-3"
                        disabled={!isValid || isSending}
                        style={{
                            backgroundColor: (!isValid || isSending) ? '#C6C6C6' : '#44A0D3',
                            color: (!isValid || isSending) ? '#979797' : '#fff'
                        }}
                    >Send Invitation</button>

                    <div className="font-italic mb-4 lg:mb-0">
                        {!isValid ? <span className="text-[#F89797]">Fill in all the fields</span> : <span className="text-[#44D36A]">Good to go</span>}
                    </div>

                </div>
            </form>
    )
}

export default InviteForm