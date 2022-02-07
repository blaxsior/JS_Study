import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";

interface genshinTypes {
    types: string[];
};

export const getStaticProps: GetStaticProps<genshinTypes> = async (ctx: GetStaticPropsContext) => {
    const data = await fetch('https://api.genshin.dev/', {
        method: 'GET'
    });

    let types: string[] = [];

    if (data.ok) {
        const json: genshinTypes = await data.json();
        types = json.types;
    }

    return {
        props: {
            types: types
        }
    }
}

const genshinIndex: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
    return (
        <>
            <div className="container card text-center">
                <div className="card-body">

                <h1 className='card-title'>Type Lists</h1>
                {props.types && props.types.length > 0 &&
                    <div className='row'>
                        {
                            props.types.map(type => {
                                return (
                                    <div key={type}
                                        className='card col-sm-4'>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <Link href={`/genshin/${type}`}>
                                                    <a>{type}</a>
                                                </Link>
                                            </h5>
                                        </div>
                                    </div>)
                            })
                        }
                    </div>
                }
                </div>

            </div>
        </>
    )
}

export default genshinIndex;