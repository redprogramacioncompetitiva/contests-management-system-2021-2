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

                <center><a href="https://redprogramacioncompetitiva.com/"><img src="https://pbs.twimg.com/profile_images/493847405670850561/qslkfHlq_400x400.jpeg" alt="RPC_Logo" width="100" height="100" /></a></center>

                <center><h1 className="display-2">RPC :: Red de Programación Competitiva</h1></center>
                </div>

                <br />
                <div className="py-1 text-center">
                <Link href="http://localhost:3000/createContest">

                    <a className="btn btn-primary" role="button">Create Contest</a>

                </Link>
                </div>  
                <br>
                </br>
                <div className="py-1 text-center">
                <Link href="http://localhost:3000/registerInCompetition">

                    <a className="btn btn-primary" role="button">Register a Contest</a>

                </Link>
                </div>  

                <form className="w-50 mx-auto p-2" method="GET" action = "http://localhost:8080/contests">
                
                </form>
                

            </div>
        )
    }
}
export default ContestsForm;