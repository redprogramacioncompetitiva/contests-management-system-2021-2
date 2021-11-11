import React, { Component } from 'react'
import Verifier from "../model/Verifier";
import { useRouter } from 'next/router'



class LoginForm extends React.Component {

    

    state = {
        email: '',
        password: ''
    }

    

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        const { email, password } = this.state;
        
        event.preventDefault();
        
        
    }

    
   


    render() {

        

        
        return (
            <div className = "card shadow w-50 m-auto p-3">

                <h1 className="py-1 text-center">Sign in</h1>
                <form className="w-50 mx-auto p-2"  method = "POST"  action = "http://localhost:8080/authenticate">

                    <div className="form-group">

                        <label htmlFor="email">Email:</label><br />

                        <input onChange={this.handleChange} type="email" id="email" name="email" className="form-control" placeholder="Email" required /><br />

                        <label htmlFor="password">Password:</label><br />

                        <input onChange={this.handleChange} type="password" id="password" className="form-control" name="password" placeholder="Password" required /><br />

                        <input  type="submit" className="btn btn-primary m-auto " value="Login" />
                    </div>

                </form>
                

            </div>
        );
    }
}

export default LoginForm;