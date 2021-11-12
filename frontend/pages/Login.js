import React, {Component} from 'react';
import HeadRPC from '../components/HeadRPC';
import LoginF from '../components/LoginForm';
import Head from 'next/head'

class Login extends Component{
    render(){
        return(
            <div>
                 <Head>

                    <meta charSet="UTF-8" />

                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />

                    <title>RPC - Sign in</title>

                    <link rel="icon" href="/logo.ico" />

                </Head>
                <HeadRPC/>
                <LoginF message = "Por favor verifique su correo y contraseña"  style = "card p-3 bg-danger w-50 shadow  text-white w-auto text-center " />

                <script>
                    alert("Credenciales incorrectas")
                </script>
            </div>
        );
    }
}

export default Login;