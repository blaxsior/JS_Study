import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextPage } from 'next'
import Script from 'next/script'
import Layout from '../layout/Layout'

// 모든 페이지에서 사용되는 레이아웃이나 컴포넌트, css 스타일 등을 지정할 때 사용됩니다.

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <>
    <Layout>
      <Head>
        {/* bootstrap 코드 */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous" defer></Script>
      <Component {...pageProps} />
    </Layout>
  </>
}

export default MyApp
