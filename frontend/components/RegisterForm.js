import React from 'react';
import Link from 'next/link'

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

            <div className="modal fade" id="modalSingUp" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Register</h5>
                  <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <form action>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="name">Name:</label>
                      <div className="col-md-10"><input type="text" name id="name" placeholder="Name" className="form-control" /></div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="email">Email:</label>
                      <div className="col-md-10"><input type="text" name id="email" placeholder="Email" className="form-control" /></div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="country">Country:</label>
                      <div className="col-md-10">
                        <select name="select" className="form-select" id="country_register">
                          <option value="Colombia">Colombia</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="age">Age:</label>
                      <div className="col-md-10"><input type="text" name id="age" placeholder="Age" className="form-control" /></div>
                      <label className htmlFor="gender">Gender:</label>
                      <div className="col-md-10">
                        <label>
                          <input className="form-check-input" type="radio" name="opcionGender" defaultValue="Male" /> Male
                        </label>
                        <label>
                          <input className="form-check-input" type="radio" name="opcionGender" defaultValue="Female" /> Female
                        </label>
                        <label>
                          <input className="form-check-input" type="radio" name="opcionGender" defaultValue="Other" /> Other
                        </label>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="username">Username:</label>
                      <div className="col-md-10"><input type="text" name id="username" placeholder="Username" className="form-control" /></div>
                    </div>
                    <div className="form-group row">
                      <label className htmlFor="teacher?">Are you a teacher?:</label>
                      <div className="col-md-10 m-2">
                        <label>
                          <input className="form-check-input" type="radio" name="opcionTeacher" defaultValue="Yes" /> Yes
                        </label>
                        <label>
                          <input className="form-check-input" type="radio" name="opcionTeacher" defaultValue="No" /> No
                        </label>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label" htmlFor="name">Description:</label>
                      <div className="col-md-10">
                        <textarea className="form-control m-1" name id cols={30} rows={10} defaultValue={""} />
                      </div>
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