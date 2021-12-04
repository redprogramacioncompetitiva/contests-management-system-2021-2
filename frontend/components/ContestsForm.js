import HeadRPC from '../components/HeadRPC'
import React from 'react';
import Link from 'next/link'
import { useEffect, useState } from 'react';

class ContestsForm extends React.Component {


    handleChange = event => {

    }

    handleSubmit = event => {

    }
    
    render() {
        
        return (
            

            <div className="container">
                

                <HeadRPC />
                
                <div className="py-1 text-center">

                     <Link href="../../">

                       <a className="btn btn-primary" role="button">Logout</a>

                     </Link>
                </div>

                <br />

                

                <form className="w-50 mx-auto p-2" method="POST" action = "http://localhost:8080/contests">
                
                </form>
                

            </div>
        )
    }
}
export default ContestsForm;