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
                <div  id="modalLogin" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content modalStyle">
            <div className="modal-header">
              <img src="img/logo.png" width={50} height={50} />
              <h5 className="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" className="btn-close btn-close-white" data-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="m-3">
                Email<br />
                <input type="text" placeholder="E-mail" className="form-control" id="email_register" />
              </div>
              <div className="m-3">
                Password<br />
                <input type="password" placeholder="Password" className="form-control" id="password_register" />
              </div>
            </div>
            <div className="modal-footer flex-column">
              {/*<button type="button" class="btn btn-secondary btn-greyNormalState" data-dismiss="modal">Close</button>*/}
              <div><button type="button" className="btn btn-style2" id="loginBtn">Login</button></div>
              <div>Dont have an account? <a href="#" data-toggle="modal" data-target="#modalSingUp" id="singUpLink"><u>Sign
                    up</u></a></div>
              <div><a><u>Forgot password</u></a></div>
            </div>
          </div>
        </div>
      </div>
      
                
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