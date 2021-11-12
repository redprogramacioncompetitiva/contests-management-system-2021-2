import React from 'react';
import Head from 'next/head';

class HeadRPC extends React.Component {
    render() {
        return (
            <div className="py-1 text-center">

                <center><a href="https://redprogramacioncompetitiva.com/"><img src="https://pbs.twimg.com/profile_images/493847405670850561/qslkfHlq_400x400.jpeg" alt="RPC_Logo" width="100" height="100" /></a></center>

                <h1 className="display-2">RPC :: Red de Programación Competitiva</h1>

                <br />

                <Head>

                <meta charSet="UTF-8" />

                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />

                <title>RPC - Sign in</title>

                <link rel="icon" href="/logo.ico" />

                </Head>

            </div>
                        )
                    }
                }

export default HeadRPC