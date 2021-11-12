import React, {Component} from 'react';
import HeadRPC from '../components/HeadRPC';
import LoginF from '../components/LoginForm';
import Head from 'next/head'

class Login extends Component{
    render(){
        return(
            <div>
                 
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