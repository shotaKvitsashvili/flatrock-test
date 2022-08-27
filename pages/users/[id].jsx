import Head from "next/head";

function User({ data }) {
    
    return (
        <>
            <Head>
                <title>{data.first_name + ' ' + data.last_name}</title>
            </Head>
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

