import { Html, Head, Main, NextScript } from 'next/document'

//_document 파일입니다. 현재 프로젝트에서는 없어도 상관 없습니다. 보통 모든 페이지에서 공유하는 메타데이터 등을 지정할 때 사용합니다.

export default function Document() {
    return (
        <Html lang='kr'>
            <Head>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}