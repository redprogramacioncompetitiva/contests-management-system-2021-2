import react,{Component} from 'react';

class Entrada{
    render(){
        return(
            <div className="form-group">
                <input name = {this.props.name} placeholder = {this.props.hint}  />
            </div>
        );
    }
}