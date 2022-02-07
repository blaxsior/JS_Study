import { NextPage } from "next";
import { ErrorProps } from 'next/error';
interface AppErrorProps extends ErrorProps {
    statusCode: number;
}
// 커스텀 에러 페이지입니다.

const Error: NextPage<AppErrorProps> = ({ statusCode }) => {
    return (
        <p>
            {statusCode
                ? `Error Code : ${statusCode}`
                : `An Error occured on client`
            }
        </p>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode! : 600;
    return {
        statusCode
    }
}

export default Error;