import { useEffect, useState } from 'react'

import { useRouter } from 'next/dist/client/router'
import { AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'


import Modal from './modal'
import { filterKeyword } from './redux/reducers/userSlice'
import InviteForm from './InviteForm'


function Header({ title, isUserPage }) {
    const [openModal, setOpenModal] = useState(false)
    const [userAdded, setUserAdded] = useState(false)
    const [filterValue, setFilterValue] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(filterKeyword(filterValue))
    }, [filterValue])

    return (
        <>
            <div className="bg-white shadow-[0px_3px_6px_#00000029]">
                <div className='container'>
                    <div className="mx-side-gap pt-16 pb-11 flex justify-between items-center flex-col lg:flex-row">
                        <h1 className='font-semibold mx-auto lg:mx-[unset] text-[24px] lg:text-[48px]'>{title}</h1>

                        {
                            !isUserPage && <div className="bordered-input min-w-[180px] justify-between mt-4 lg:mt-0">
                                <input
                                    type="text"
                                    onChange={e => setFilterValue(e.target.value)}
                                    value={filterValue}
                                    className="outline-none placeholder:font-italic flex-grow-[1]"
                                    placeholder='Type to filter the table'
                                />
                                <img src="/icons/search.svg" alt="search" />
                            </div>
                        }
                    </div>

                    <div
                        onClick={() => !isUserPage ? setOpenModal(true) : router.push('/')}
                        className={`${isUserPage ? 'bg-[#C6C6C6]' : 'bg-[#305ECA]'}  header-button`}
                    >
                        {
                            isUserPage ? <img src='/icons/gear.svg' alt='gear' className='w-[45px]' /> : <span className='mb-3'>+</span>
                        }
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {
                    openModal && <Modal setOpenModal={setOpenModal} title={userAdded ? '' : 'Invite New User'}>
                        <InviteForm setOpenModal={setOpenModal} userAdded={userAdded} setUserAdded={setUserAdded} />
                    </Modal>
                }
            </AnimatePresence>
        </>
    )
}

export default Header