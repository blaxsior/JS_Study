import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    GetStaticPaths,
    GetStaticPathsContext,
    NextPage
} from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
    type: string;
}

interface IProps {
    type: string;
    values: string[];
    statusCode: number | null;
}

// export const getStaticPaths : GetStaticPaths<Params>  = async (ctx : GetStaticPathsContext) => {
//     const data = await fetch('https://api.genshin.dev', {
//         method: 'GET'
//     });

//     let types: string[] = [];

//     if (data.ok) {
//         const json = await data.json();
//         types = json.types;
//     }

//     const paths = types.map(type => {
//         return {
//             params: {
//                 type: type
//             }
//         }
//     });

//     return {
//         paths: paths,
//         fallback: false
//     }
// }

// export const getStaticProps : GetStaticProps<IProps> = async (ctx : GetStaticPropsContext) => {
//     const { type } = ctx.params as Params;

//     const data = await fetch(`https://api.genshin.dev/${type}`);
//     let values: string[] = [];
//     let statusCode = null;
//     if (data.ok) {
//         values = await data.json() as string[];
//     }
//     else {
//         statusCode = data.status;
//     }

//     return {
//         props: {
//             type,
//             values: values,
//             statusCode
//         }
//     }
// }



export const getServerSideProps: GetServerSideProps<IProps, Params> = async (ctx : GetServerSidePropsContext<Params>) => {
    let type = ctx.params!.type

    const data = await fetch(`https://api.genshin.dev/${type}`);
    let values: string[] = [];
    if (data.ok) {
        values = await data.json() as string[];
    }
    else {
        return {
            redirect: {
                destination: '/genshin',
                permanent: false
            }
        }
    }

    return {
        props: {
            type,
            values: values,
            statusCode: null
        }
    }
}

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
    return (
        <div className='container'>
            <div className='card text-center'>

                {props.statusCode === null ?
                    <div className="card-body">
                        <h1 className='card-title'>{props.type}</h1>
                        <div className='row'>{
                            props.values.map(value => {
                                return (
                                    <div className='card col-sm-4' key={value}>
                                        <div className='card-body'>
                                            <div className='card-title'>
                                                {value}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }</div>
                    </div>
                    : <div className="card-body">
                        <h1 className='card-title'>Page Not Found ...</h1>
                        <div className='card-text'>Error Code : {props.statusCode}</div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Page;