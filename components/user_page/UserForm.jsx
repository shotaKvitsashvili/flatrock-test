import axios from "axios";

function UserForm(props) {
    const { user, register, handleSubmit, errors, onSubmit, editUser, dispatch, isPending, } = props
    const { first_name, last_name, role, _id } = user

    const ErrorMessage = ({ name }) => <div className="text-red-500">{errors[name] && errors[name].message}</div>

    const handleUserStatusChange = e => {
        const { checked } = e.target;

        const u = { ...user }
        u.status = checked ? 'active' : 'inactive'
        dispatch(editUser(u))

        axios.put(`http://localhost:3002/api/users/status/${_id}`, { checked })
    }

    return (
        <div className="flex flex-col w-full lg:max-w-[320px]">
            <h2 className="font-semibold text-3xl mt-6 lg:mt-0">Details</h2>

            {
                user && <div className="relative my-14 flex items-center gap-6">
                    <div className="static lg:absolute top-1/2 -translate-y-0 lg:-translate-y-1/2 left-[-60px]">
                        <label
                            className={`user__status__switch ${user.status === 'active' ? 'user-active' : 'user-inactive'}`}
                            style={{ margin: 'unset' }}
                        >
                            <input
                                type="checkbox"
                                className='user__status__switch__checkbox'
                                onChange={e => handleUserStatusChange(e)}
                                defaultChecked={user.status === 'active'}
                            />
                        </label>
                    </div>

                    <div className="font-light">
                        The user is <span className="font-bold capitalize">{user.status}</span>
                    </div>
                </div>
            }

            <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full" encType="multipart/formdata">
                <div>
                    <div className="floatable-label-container">
                        <input
                            type="text"
                            {...register('first_name', { required: "First name is required" })}
                            className="bordered-input bg-transparent w-full"
                            placeholder="* First Name"
                            defaultValue={first_name || ''}
                        />
                        <label className="text-[#33A3DC]">* First Name</label>
                        <ErrorMessage name="first_name" />
                    </div>

                    <div className="my-12 floatable-label-container">
                        <input
                            type="text"
                            {...register('last_name', { required: "Last name is required" })}
                            className="bordered-input bg-transparent w-full"
                            placeholder="* Last Name"
                            defaultValue={last_name || ''}
                        />
                        <label className="text-[#33A3DC]">* Last Name</label>
                        <ErrorMessage name="last_name" />
                    </div>

                    <div className="flex items-center relative">
                        <div className="flex justify-between gap-1 flex-grow-[1] floatable-label-container">
                            <select
                                {...register('role', { required: "Role is required" })}
                                className="bordered-input bg-transparent flex-grow-[1] w-full"
                                defaultValue={role || ''}
                            >
                                <option value="" disabled>* Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <div className="flex-grow-[1]"></div>
                            <label className="text-[#33A3DC]">* Role</label>
                        </div>
                        <ErrorMessage name="role" />
                    </div>
                </div>
                {
                    user.status === 'active' && <button
                        disabled={isPending}
                        className='rounded-[100px] bg-[#44A0D3] text-white shadow-[0px_3px_6px_#00000029] py-4 w-[200px] text-center mt-6 mx-auto lg:mx-[unset]'
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