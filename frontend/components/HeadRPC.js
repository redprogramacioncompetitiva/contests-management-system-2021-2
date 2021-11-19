import React from 'react';
import Head from 'next/head';
import StyleRPC from '../components/StyleRPC'
import LoginForm from './LoginForm';

class HeadRPC extends React.Component {

    
 

    render() {
        return(

            <div>

                <Head>
                
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>


<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="   crossorigin="anonymous"> </script>

                </Head>
                
<nav className="navbar navbar-expand-lg bg-navbar">
    <div className="container-fluid">
      <img src="img/logo.png" width="50" height="50"/>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
        <form className="d-flex ">
          <button className="btn btn-style" type="button" data-toggle="modal" data-target="#modalLogin" >Login</button>
          <button className="btn btn-style2" type="button" data-toggle="modal" data-target="#modalSingUp">Sign-Up</button>
        </form>
      </div>
    </div>
  </nav>
            
  
  <StyleRPC/>


            </div>
        )
    }
}

export default HeadRPC