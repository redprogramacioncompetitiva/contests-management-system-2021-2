import React, {Component} from 'react';


class StyleRPC extends Component{
    render(){
        return(
            <style jsx global>{
                `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
        

                *{
                    margin: 0%;
                    padding: 0%;
                }
                .body{
                    font-family: 'Roboto', sans-serif;

                }
                
                .bg-navbar{
                    background-color: #001A33;
                }
                
                .modalStyle{
                    font-family: 'Roboto', sans-serif;
                    background-color: #001A33;
                    color:white;
                }
                
                .btn-style{
                    border-color: #FFFFFF;
                    color: #FFFFFF;
                    margin: 5px;
                    border-radius: 10pt;
                    width: 130px;
                    height: 40px;
                }
                
                .btn-style:hover{
                    color: #FFA901;
                    border-color: #FFA901;
                }
                
                .btn-style2{
                    background-color: #FFA901;
                    border-color: #FFA901;
                    color: #FFFFFF;
                    margin: 5px;
                    border-radius: 10pt;
                    width: 130px;
                    height: 40px;
                }
                
                .btn-style2:hover{
                    box-shadow: 2px 2px 2px 1px rgba(71, 71, 71, 0.2);
                }
                
                .btn-style3{
                    background-color: #8B8B8B;
                    border-color: #8B8B8B;
                    color: #FFFFFF;
                    border-radius: 10pt;
                }
                
                #loginBtn{
                    width: 250px;
                }`
              }</style>

              

        );
    }
}
export default StyleRPC;