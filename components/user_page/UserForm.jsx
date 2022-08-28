import axios from "axios";

function UserForm(props) {
    const { data, user, register, handleSubmit, errors, isValid, onSubmit, useDispatch, editUser, dispatch, isPending } = props
    const { first_name, last_name, role, status, _id } = data

    const ErrorMessage = ({ name }) => <div className="text-red-500">{errors[name] && errors[name].message}</div>

    const handleUserStatusChange = e => {
        const { checked } = e.target;

        const u = { ...data }
        u.status = checked ? 'active' : 'inactive'
        dispatch(editUser(u))

        axios.put(`http://localhost:3002/api/users/status/${_id}`, { checked })
    }

    return (
        <div className="flex flex-col max-w-[320px]">
            <h2 className="font-semibold text-3xl">Details</h2>

            {
                user && <div className="relative my-14">
                    <label
                        className={`user__status__switch ${user.status === 'active' ? 'user-active' : 'user-inactive'}`}
                        style={{ margin: 'unset', position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '-60px' }}
                    >
                        <input
                            type="checkbox"
                            className='user__status__switch__checkbox'
                            onChange={e => handleUserStatusChange(e)}
                            defaultChecked={user.status === 'active'}
                        />
                    </label>

                    <div className="font-light">
                        The user is <span className="font-bold capitalize">{user.status}</span>
                    </div>
                </div>
            }

            <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
                <div>
                    <div className="">
                        <input
                            type="text"
                            {...register('first_name', { required: "First name is required" })}
                            className="bordered-input bg-transparent w-full"
                            placeholder="* First Name"
                            defaultValue={first_name || ''}
                        />
                        <ErrorMessage name="first_name" />
                    </div>

                    <div className="my-12">
                        <input
                            type="text"
                            {...register('last_name', { required: "Last name is required" })}
                            className="bordered-input bg-transparent w-full"
                            placeholder="* Last Name"
                            defaultValue={last_name || ''}
                        />
                        <ErrorMessage name="last_name" />
                    </div>

                    <div className="flex items-center relative">
                        <div className="flex justify-between gap-1 flex-grow-[1]">
                            <select
                                {...register('role', { required: "Role is required" })}
                                className="bordered-input bg-transparent text-[#C6C6C6] flex-grow-[1] w-full"
                                defaultValue={role || ''}
                            >
                                <option value="" disabled>* Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <div className="flex-grow-[1]"></div>
                        </div>
                        <ErrorMessage name="role" />
                    </div>
                </div>
                {
                    user.status === 'active' && <button
                        disabled={isPending}
                        className='rounded-[100px] bg-[#44A0D3] text-white shadow-[0px_3px_6px_#00000029] py-4 w-[200px] text-center mt-6'
                        style={{ opacity: isPending ? '.5' : '1' }}
                    >
                        Save Changes
                    </button>
                }
            </form>
        </div>
    )
}

export default UserForm