import React, {Component} from 'react';


class FormInput extends Component {
    render(){
        return(

            <input type={this.props.type} placeholder={this.props.hint} className="form-control" name = {this.props.name} id = {this.props.id} />
        );
    }
}
export default FormInput;