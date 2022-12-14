import { useRef } from 'react'
import { motion } from 'framer-motion'


function Modal({ children, setOpenModal, title }) {
    const containerRef = useRef()
    return (
        <div
            className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#0000008F] z-10'
            ref={containerRef}
            onClick={e => e.target === containerRef.current && setOpenModal(false)}
        >
            <motion.div
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -200 }}
                transition={{ duration: .3 }}
                className="bg-white shadow-[0px_0px_30px_#00000029] p-9 lg:p-[72px] min-w-[unset] lg:min-w-[650px] relative m-[0_20px] lg:m-0"
            >
                <div className='cursor-pointer absolute top-[24px] right-[24px]' onClick={() => setOpenModal(false)}>
                    <img src='/icons/close.svg' alt='close' />
                </div>
                <h2 className='pt-6 pb-12 pl-6 text-[24px] lg:text-[48px] font-semibold text-left'>
                    {title}
                </h2>
                {children}
            </motion.div>
        </div>
    )
}

export default Modal