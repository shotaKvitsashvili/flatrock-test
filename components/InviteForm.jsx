import { useForm } from "react-hook-form"

function InviteForm() {
    const { register, handleSubmit, watch, formState: { errors, touchedFields, isValid } } = useForm({ mode: 'onChange' });
    const onSubmit = data => console.log(data);

    const ErrorMessage = ({ name }) => <div className="text-red-500">{errors[name] && errors[name].message}</div>

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex justify-between gap-1">
                <img src="/icons/face.svg" alt="user" />
                                <div className="flex-grow-[1]">
                    <input
                        type="text"
                        {...register('first_name', { required: "First name is required" })}
                        className="bordered-input w-full"
                        placeholder="* First Name"
                    />
                    <ErrorMessage name="first_name" />
                </div>

                <div className="flex-grow-[1]">
                    <input
                        type="text"
                        {...register('last_name', { required: "Last name is required" })}
                        className="bordered-input w-full"
                        placeholder="* Last Name"
                    />
                    <ErrorMessage name="last_name" />
                </div>
            </div>

            <div className="my-14 w-full">
                <div className="flex items-center">
                    <img src="/icons/email_at.svg" alt="at" />
                    
                    <input
                        type="email"
                        {...register('email', { pattern: { value: /\S+@\S+\.\S+/, message: 'Email is required' } })}
                        className="bordered-input w-full"
                        placeholder="* Email"
                    />
                    <ErrorMessage name="email" />
                </div>
            </div>

            <div className="flex items-center">
                <img src="/icons/key.svg" alt="key" />
                
                <div className="flex justify-between gap-1 flex-grow-[1]">
                    <select
                        {...register('role', { required: "Role is required" })}
                        className="bordered-input text-[#C6C6C6] flex-grow-[1] max-w-[50%]"
                    // defaultValue=""
                    >
                        <option value="" disabled>* Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <div className="flex-grow-[1]"></div>
                </div>
                <ErrorMessage name="role" />
            </div>

            <div className="flex justify-between mt-9 items-center">
                <button
                    className="rounded-[24px] px-4 py-3"
                    disabled={!isValid}
                    style={{
                        backgroundColor: !isValid ? '#C6C6C6' : '#44A0D3',
                        color: !isValid ? '#979797' : '#fff'
                    }}
                >Send Invitation</button>

                <div className="font-italic">
                    {!isValid ? <span className="text-[#F89797]">Fill in all the fields</span> : <span className="text-[#44D36A]">Good to go</span>}
                </div>

            </div>
        </form>
    )
}

export default InviteForm