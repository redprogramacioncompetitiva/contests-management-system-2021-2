import React from 'react';
import Link from 'next/link'
import FormInput from './FormInput';
import Dropdown from './DropDown';
import NormalButton from './NormalButton';
import SubmitButton from './SubmitButton';

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
          <form action = "http://localhost:8080/register" method = "POST">
            <div className="modal fade " id="modalSingUp" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Register</h5>
                  <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
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
                      <div className="col-md-10"><input type="text" name = "nicknameR" id="username" placeholder="Username" className="form-control" /></div>
                    </div>
                </div>
                <div className="modal-footer">
                  <NormalButton layout = "3">Cancel</NormalButton>
                  <SubmitButton layout = "2">Submit</SubmitButton>
                  
                </div>
              </div>
            </div>
          </div>
          </form>
        )
    }
}

export default RegisterForm;