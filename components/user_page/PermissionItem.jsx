import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { editUser } from '../redux/reducers/userSlice'

function PermissionItem({ permissionItemKey, user, permission }) {
    const [checked, setChecked] = useState(false)

    const dispatch = useDispatch()

    const handleUserPermissionChange = e => {
        const { checked } = e.target;
        setChecked(checked)

        const u = { ...user }

            ;
        // u.permissions[permission][permissionItemKey] = { ...u.permissions[permission][permissionItemKey], [permissionItemKey]: u['permissions'][permission][permissionItemKey] }
        // u.permissions = { ...u.permissions, : u['permissions'][permission][permissionItemKey] }
        u.permissions = { ...u.permissions, [permissionItemKey]: checked }

        console.log(u['permissions'][permission]);

        // const subPermissions = { ...u.permissions[permission] };

        // for (const key in subPermissions) {
        //     checked ? (subPermissions[key] = true) : (subPermissions[key] = false)
        // }

        // u.permissions = { ...u.permissions, [permission][permissionItemKey]: }
        // dispatch(editUser(u))

        // axios.put(`https://flatrock-api.herokuapp.com/api/users/${id}`, u)
    }

    return (
        <div className='capitalize flex items-center justify-between ml-4 my-3'>
            <div className="flex items-center gap-3">
                <div className={`w-[10px] h-[10px] rounded-full ${checked ? 'bg-[#44A0D3]' : 'bg-[#FF0000]'}`}></div>
                <div className={`${checked ? 'font-semibold' : 'font-light'}`}>
                    {permissionItemKey.split('_').join(' ')}
                </div>
            </div>

            <label className={`user__status__switch ${checked ? 'user-active' : 'user-inactive'}`}
                style={{ margin: 'unset' }}
            >
                <input
                    type="checkbox"
                    className='user__status__switch__checkbox'
                    onChange={e => handleUserPermissionChange(e)}
                    defaultChecked={checked}
                />
            </label>
        </div>
    )
}

export default PermissionItem