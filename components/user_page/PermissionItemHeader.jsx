import axios from 'axios'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { editUser } from '../redux/reducers/userSlice'

function PermissionItemHeader({ permission, user, id }) {
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()

    const handleUserPermissionChange = e => {
        const { checked } = e.target;
        setChecked(checked)

        const u = { ...user }
        const subPermissions = { ...u.permissions[permission] };

        for (const key in subPermissions) {
            checked ? (subPermissions[key] = true) : (subPermissions[key] = false)
        }

        u.permissions = { ...u.permissions, [permission]: subPermissions }
        dispatch(editUser(u))

        axios.put(`http://localhost:3002/api/users/${id}`, u)
    }
    
    return (
        <div className='capitalize flex justify-between items-center mt-6'>
            <div className="flex items-center font-semibold relative -left-8">
                <img src="/icons/arrow_down_empty.svg" alt="arrow" className='mr-2' />

                {
                    permission.split('_').join(' ')
                }
            </div>

            <label className={`user__status__switch ${checked ? 'user-active' : 'user-inactive'}`}
                style={{ margin: 'unset' }}
            >
                <input
                    type="checkbox"
                    className='user__status__switch__checkbox'
                    onChange={e => handleUserPermissionChange(e)}
                    defaultChecked={user[permission]}
                />
            </label>
        </div>
    )
}

export default PermissionItemHeader