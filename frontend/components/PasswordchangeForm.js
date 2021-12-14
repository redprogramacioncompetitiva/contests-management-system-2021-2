import React from 'react'
import CodeForm from './codeForm';

import FormInput from './FormInput'
import SubmitButton from './SubmitButton';



class PasswordchangeForm extends React.Component {

  constructor(props){
    super(props);
    
  }

  message = ""
  


  state = {
    form: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleChange = e =>{
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name] : e.target.value
      }
    })
  }

  handleSubmit = async e =>{
    e.preventDefault();
    try {
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.form)
      }

      

      let response = await fetch('http://localhost:8080/recuperation/password/change', config)
      let json = await response.json();

      if (json.flag == true){
        alert("Password recovered successfully")
        location.href = "/";
      }else{

        alert("email incorrect")
      }
      
    } catch (error) {
      
    }
  }

    email = React.createRef();

    complete(){
      console.log("funciona");
    }

    

    

    render() {
        return (
            <div>
                 <div  className="modal fade" id="modalPasswordchange" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Password Recovery</h5>
              <button type="button" className="btn-close btn-close-white" data-dismiss="modal" aria-label="Close" />
            </div>
            <form onSubmit = {this.handleSubmit} onChange = {this.handleChange} >
            <div className="modal-body">
            <div className="m-3">
                Email<br />
              <FormInput type = "text" hint = "E-mail"  name = "email" value = {this.state.email} onChange = {this.handleChange}   />
               
              </div>
              <div className="m-3">
                Email<br />
              <FormInput type = "password" hint = "Password"  name = "password" value = {this.state.password} onChange = {this.handleChange}   />
               
              </div>
              <div className="m-3">
                Email<br />
              <FormInput type = "password" hint = "confirmPassword"  name = "confirmpassword" value = {this.state.confirmpassword} onChange = {this.handleChange}   />
               
              </div>
            </div>
            <div className="modal-footer flex-column">
              {/*<button type="button" class="btn btn-secondary btn-greyNormalState" data-dismiss="modal">Close</button>*/}
              <span class = "text-danger text-center" id = "errorMessage"> <b>{this.message}</b> </span>
              <div>

              <SubmitButton  layout = "2" id = "sendcode" > Change Password</SubmitButton>
                
                </div>
            </div>
            </form>
            
          </div>
        </div>
      </div>  
    
            </div>
        );
    }
}



export default PasswordchangeForm;