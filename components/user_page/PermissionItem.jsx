import { useState } from 'react'

function PermissionItem({ permissionItemKey }) {
    const [checked, setChecked] = useState(false)

    const handleUserPermissionChange = e => {
        const { checked } = e.target;
        setChecked(checked)
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