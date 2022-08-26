import { Provider } from 'react-redux'
import store from '../components/redux/store'

import '../styles/globals.css'
import Layout from '../components/Layout'

import '../styles/main.css'

function MyApp({ Component, pageProps }) {
    return <Provider store={store}>
        <Layout>
            <main>
                <div className='container'>
                    <Component {...pageProps} />
                </div>
            </main>
        </Layout >
    </Provider>
}

export default MyApp
