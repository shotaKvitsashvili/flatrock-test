import Head from "next/head";
import { useDispatch } from 'react-redux'

import UserInfo from "../../components/user_page";
import { getUsers } from '../../components/redux/reducers/userSlice'
import { useEffect } from "react";

function User({ data, userList }) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(userList))
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

    // const res = await fetch('http://localhost:3002/api/users/' + id)
    // const data = await res.json()

    const users = await fetch('http://localhost:3002/api/users')
    const userList = await users.json()

    const data = userList.find(user => user._id === id)

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data,
            userList
        }
    }
}

export default User

