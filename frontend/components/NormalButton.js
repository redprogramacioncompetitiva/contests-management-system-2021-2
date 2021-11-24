import React, {Component} from 'react';



class NormalButton extends Component {

    chioce(a){
        if (a == "style") return "btn btn-style";
        else return "btn btn-style2";
    }
    
    
    render(){
        return (
            <button  onLoad = "click" className={this.chioce(this.props.layout)} type="button" data-toggle={this.props.toggle} data-target={this.props.target} id = {this.props.id}>{this.props.children}</button>

        );
    }
}

export default NormalButton;