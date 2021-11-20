import React from 'react';
import Link from 'next/link'
import FormInput from './FormInput';
import Dropdown from './DropDown';

class RegisterForm extends React.Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        nickName: '',
        firstName: '',
        lastName: '',
        birthDate: ''
    };

    handleChange = event => {

    }

    handleSubmit = event => {

    }

    render() {
        return (

            <div className="modal fade " id="modalSingUp" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Register</h5>
                  <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <form action>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="firstname">First Name:</label>
                      <div className="col-md-10">
                        <FormInput type = "text" name = "fisrtname" id = "firstname" hint = "First Name" />
                        
                        </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-md-2 col-form-label" htmlFor="lastname">Last Name:</label>
                      <div className="col-md-10">
                        <FormInput type = "text" name = "lastname" id = "lastname" hint = "Last Name" />
                        
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="email">Email:</label>
                      <div className="col-md-10">
                        <FormInput type = "text" name = "emailR" id ="emailR" hint = "Email" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="password">Password:</label>
                      <div className="col-md-10">
                        <FormInput type = "password" name = "passwordR" id = "passwordR" hint = "Password" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="CPassword">confirm Password:</label>
                      <div className="col-md-10">
                        <FormInput type = "password" name = "cPasswordR" id = "cPasswordR" hint = "Confirm password" />
                        </div>
                    </div>
                    <Dropdown/>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="username">Nickname:</label>
                      <div className="col-md-10"><input type="text" name id="username" placeholder="Username" className="form-control" /></div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-style3" data-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-style2">Submit</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default RegisterForm;