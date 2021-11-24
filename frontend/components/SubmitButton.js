import React, {Component} from 'react'

class SubmitButton extends Component {


    chioce(a){
        if (a == "style") return "btn btn-style";
        else return "btn btn-style2";
    }
    
    render(){
        return(
            <button className={this.chioce(this.props.layout)} type="submit"  >{this.props.children}</button>
        );
    }
}

export default SubmitButton;