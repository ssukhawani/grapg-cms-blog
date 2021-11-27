import Document from "next/document";
import {Html, Head, Main, NextScript } from "next/document";
class AppDocument extends Document {
    render() {
        return(
            <Html lang="en">
                <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet"></link>
                <meta name="description" content="FrontendFreck helps you to make your dev journey more exciting with cool resources"/>
                <meta name="a.validate.01" content="25266fe4a74005982391266db7d330a1d544" />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        )
    }
}
export default AppDocument