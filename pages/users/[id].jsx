import Head from "next/head";
import { useDispatch } from 'react-redux'

import UserInfo from "../../components/user_page";
import { getUsers } from '../../components/redux/reducers/userSlice'
import { useEffect } from "react";

function User({ data }) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers([data]))
    }, [])

    return (
        <>
            <Head>
                <title>{data.first_name + ' ' + data.last_name}</title>
            </Head>

            <UserInfo data={data} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query

    const res = await fetch('http://localhost:3002/api/users/' + id)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data
        }
    }
}

export default User

