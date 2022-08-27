import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { Provider } from 'react-redux'

import store from '../components/redux/store'

import '../styles/globals.css'
import Layout from '../components/Layout'

import '../styles/main.css'


function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <title>Users</title>
        </Head>
        <Provider store={store}>
            <Layout>
                <NextNProgress
                    color="#305ECA"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={2}
                    options={{ showSpinner: false }}
                />
                <main>
                    <div className='container'>
                        <Component {...pageProps} />
                    </div>
                </main>
            </Layout >
        </Provider>
    </>
}

export default MyApp
