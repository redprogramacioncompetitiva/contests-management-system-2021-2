import React from 'react'
import Link from 'next/link'
import FormInput from './FormInput'
import NormalButton from './NormalButton';
import SubmitButton from './SubmitButton';


class LoginForm extends React.Component {

    email = React.createRef();
    password = React.createRef();

    complete(){
      console.log("funciona");
    }

    

    render() {
        return (
            <div>
                 <div  className="modal fade" id="modalLogin" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content modalStyle">
            <div className="modal-header">
              <img src="img/logo.png" width={50} height={50} />
              <h5 className="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" className="btn-close btn-close-white" data-dismiss="modal" aria-label="Close" />
            </div>
            <form action = "http://localhost:8080/authenticate" method = "POST" >
            <div className="modal-body">
              <div className="m-3">
                Email<br />
              <FormInput type = "text" hint = "E-mail"  name = "email"/>
               
              </div>
              <div className="m-3">
                Password<br />
                <FormInput type = "password" hint = "Password"  name = "password"/> 
               
              </div>
            </div>
            <div className="modal-footer flex-column">
              {/*<button type="button" class="btn btn-secondary btn-greyNormalState" data-dismiss="modal">Close</button>*/}
              <div>
                <SubmitButton  layout = "style2" > Login</SubmitButton>
                
                </div>
              <div>Dont have an account? <a href="#" data-toggle="modal" data-target="#modalSingUp" id="singUpLink"  data-dismiss = "modal"><u>Sign
                    up</u></a></div>
              <div><a><u>Forgot password</u></a></div>
            </div>
            </form>
            
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