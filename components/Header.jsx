import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useSelector, useDispatch } from 'react-redux'
import Modal from './modal'
import { filterUser } from './redux/reducers/userSlice'
import InviteForm from './InviteForm'


function Header({ title }) {
    const [openModal, setOpenModal] = useState(false)
    const [filterValue, setFilterValue] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        filterValue.trim().length > 0 && dispatch(filterUser(filterValue))
    }, [filterValue])

    return (
        <>
            <div className="bg-white shadow-[0px_3px_6px_#00000029]">
                <div className='container'>
                    <div className="mx-side-gap pt-24 pb-16 flex justify-between items-center">
                        <h1 className='font-semibold text-[48px]'>{title}</h1>

                        <div className="bordered-input">
                            <input
                                type="text"
                                onChange={e => setFilterValue(e.target.value)}
                                value={filterValue}
                                className="outline-none placeholder:font-italic"
                                placeholder='Type to filter the table'
                            />
                            <img src="/icons/search.svg" alt="search" />
                        </div>
                    </div>
                    <div
                        onClick={() => setOpenModal(true)}
                        className="bg-[#305ECA] header-button"
                    >
                        <span className='mb-3'>+</span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {
                    openModal && <Modal setOpenModal={setOpenModal} title="Invite New User">
                        <InviteForm />
                    </Modal>
                }
            </AnimatePresence>
        </>
    )
}

export default Header