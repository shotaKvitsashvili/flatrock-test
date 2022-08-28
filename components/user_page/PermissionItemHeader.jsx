function PermissionItemHeader({ permission }) {
    return (
        <div className='capitalize flex justify-between items-center mt-6'>
            <div className="flex items-center font-semibold relative -left-8">
                <img src="/icons/arrow_down_empty.svg" alt="arrow" className='mr-2' />

                {
                    permission.split('_').join(' ')
                }
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

export default PermissionItemHeader