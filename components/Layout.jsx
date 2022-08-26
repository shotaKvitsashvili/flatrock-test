import Header from './Header'
function Layout({ children }) {
    return (
        <div>
            <Header title="Project Access" />
            {children}
        </div>
    )
}

export default Layout