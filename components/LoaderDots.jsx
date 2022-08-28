import { motion } from 'framer-motion'

function LoaderDots() {
    return (
        <div className='w-full flex justify-center items-center gap-1'>
            {
                [...Array(3)].map(index => (
                    <motion.div
                        key={index}
                        className='w-[15px] h-[15px] rounded-full'
                        initial={{ backgroundColor: 'transparent', opacity: .4 }}
                        animate={{ backgroundColor: '#305ECA', opacity: 1 }}
                        transition={{ delay: index / 10, repeat: Infinity, duration: .7 }}
                    >

                    </motion.div>
                ))
            }
        </div>
    )
}

export default LoaderDots