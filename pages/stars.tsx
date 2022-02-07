import { GetServerSideProps, InferGetServerSidePropsType} from 'next';
import Error from 'next/error';

// 공식사이트에서 제공하는 예제입니다.

export const getServerSideProps : GetServerSideProps = async (context) => {

    const res = await fetch('https://api.github.com/repos/vercel/next.js');
    const errCode = res.ok? false : res.status;
    const json = await res.json();

    return {
        props: {
            errCode,
            stars: json.stargazers_count ?? null
        }
    }
}

export default function Page({errCode, stars} : InferGetServerSidePropsType<typeof getServerSideProps>)
{
    if (errCode) {
        return <Error statusCode={errCode}/>
    }

    return <div>Next stars: {stars}</div>
}