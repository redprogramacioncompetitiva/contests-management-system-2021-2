import React from 'react'
import Link from 'next/link'

class LoginForm extends React.Component {

    email = React.createRef();
    password = React.createRef();

    handleChange = event => {

    }

    handleSubmit = event => {
        fetch('http://localhost:8080/',)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                prompt(response);
            })
            .then(function (stories) {
                console.log(stories);
            });
    }

    render() {
        return (
            <div>
                <div className="card shadow w-50 m-auto p-3">

                    <h1 className="py-1 text-center">Sign in</h1>

                    <span className={this.props.style} >

                        {this.props.message}

                    </span>

                    <form className="w-50 mx-auto p-2" method="POST" action="http://localhost:8080/authenticate" >

                        <div className="form-group">

                            <label htmlFor="email">Email:</label><br />

                            <input onChange={this.handleChange} type="email" id="email" name="email" className="form-control" placeholder="Email" required /><br />

                            <label htmlFor="password">Password:</label><br />

                            <input onChange={this.handleChange} type="password" id="password" className="form-control" name="password" placeholder="Password" required /><br />

                            <input type="submit" className="btn btn-primary m-auto " value="Login" />

                        </div>

                    </form>

                </div>

                <br />

                <h1 className="py-1 text-center">Sign up</h1>

                <br />

                <Link href="/register">

                    <center><a className="btn btn-primary">Create new account</a></center>

                </Link>

                <br /><br />

            </div>
        );
    }
}

LoginForm.getInitalProps = async (ctx) => {
    const res = await fetch("http://localhost://list");
    const data = await res.json();
    console.log(data);
    return {};
}

export default LoginForm;