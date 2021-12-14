import React from 'react'

import FormInput from './FormInput'
import NormalButton from './NormalButton';
import SubmitButton from './SubmitButton';



class CodeForm extends React.Component {

  constructor(props) {
    super(props);

  }

  message = ""



  state = {
    form: {
      email: '',
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  modal(){
    $('#modalcode').modal().hide();
  }

  handleSubmit = async e => {
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



      let response = await fetch('http://localhost:8080/recuperation/password/code', config)
      let json = await response.json();

      if (!json.flag == true) {
        alert("code successfully")
      } else {

        alert("code incorrect")
      }

    } catch (error) {

    }
  }





  render() {
    return (
      <div>
        <div className="modal fade" id="modalcode" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Password Recovery</h5>
                <button type="button" className="btn-close btn-close-white" data-dismiss="modal" aria-label="Close" />
              </div>
              <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                <div className="modal-body">
                  <div className="m-3">
                    Code<br />
                    <FormInput type="text" hint="code" name="code" value={this.state.code} onChange={this.handleChange} />

                  </div>
                </div>
                <div className="modal-footer flex-column">
                  {/*<button type="button" class="btn btn-secondary btn-greyNormalState" data-dismiss="modal">Close</button>*/}
                  <span class="text-danger text-center" id="errorMessage"> <b>{this.message}</b> </span>
                  <div>

                    <SubmitButton layout="2" id="loginBtn"> Verify code</SubmitButton>
                    

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



export default CodeForm;