import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from './Header'
function Layout({ children }) {
    const [isUserPage, setIsUserPage] = useState(false)

    const router = useRouter()

    useEffect(() => {
        router.query.id ? setIsUserPage(true) : setIsUserPage(false)
    }, [router])

    return (
        <div>
            <Header isUserPage={isUserPage} title={isUserPage ? 'User Setup' : 'Project Access'} />
            {children}
        </div>
    )
}

export default Layout