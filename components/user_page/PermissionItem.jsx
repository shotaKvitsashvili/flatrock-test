import React from 'react'

function PermissionItem({ permissionItem, permissionItemKey }) {
    return (
        <div className='capitalize flex items-center justify-between ml-4 my-3'>
            <div className="flex items-center gap-3">
                <div className={`w-[10px] h-[10px] rounded-full ${permissionItem[permissionItemKey] ? 'bg-[#44A0D3]' : 'bg-[#FF0000]'}`}></div>
                <div className={`${permissionItem[permissionItemKey] ? 'font-semibold' : 'font-light'}`}>
                    {permissionItemKey.split('_').join(' ')}
                </div>
            </div>

            <label className={`user__status__switch user-active`}
                style={{ margin: 'unset' }}
            >
                <input
                    type="checkbox"
                    className='user__status__switch__checkbox'
                    // onChange={e => handleUserStatusChange(e)}
                    defaultChecked={true}
                />
            </label>
        </div>
    )
}

export default PermissionItem