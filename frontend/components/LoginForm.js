import React from 'react';
import Link from 'next/link'
import { loginAuth } from '../posts/loginAuth';
import fetch from 'isomorphic-fetch'
import users from '../util/users.json'





class LoginForm extends React.Component {

    state = {
        email: '',
        password: ''
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        
        LoginForm.getInitialProps = async (ctx) =>{
            const res = await fetch('http://localhost:8080/saludo')
            const data =  await res.json();
            console.log(data);
        }
  
    }

    

    render(){
        return (

            <main>

                <div className="py-1 text-center">

                    <center><a href="https://redprogramacioncompetitiva.com/"><img src="https://pbs.twimg.com/profile_images/493847405670850561/qslkfHlq_400x400.jpeg" alt="RPC_Logo" width="100" height="100" /></a></center>

                    <h1 className="display-2">RPC :: Red de Programación Competitiva</h1>

                </div>

                <br />

                <h1 className="py-1 text-center">Sign in</h1>

                <form  onSubmit={this.handleSubmit} className="w-50 mx-auto p-2" method="POST">

                    <div className="form-group">

                        <label htmlFor="email">Email:</label><br />

                        <input type="email" id="email" name="email" className="form-control" placeholder="Email" onChange={this.handleChange} /><br />

                        <label htmlFor="password">Password:</label><br />

                        <input type="password" id="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} /><br />

                        <center><input type="submit" className="btn btn-primary" value="Login" /></center>

                    </div>

                </form>

                <br />

                <h1 className="py-1 text-center">Sign up</h1>

                <br />

                <Link href="/register">

                    <center><a className="btn btn-primary">Create new account</a></center>

                </Link>

                <br /><br />

            </main>
        )
    }
}

export default LoginForm;