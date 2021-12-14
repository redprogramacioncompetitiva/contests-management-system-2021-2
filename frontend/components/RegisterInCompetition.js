import React from 'react';
import Link from 'next/link';
import { Button, Form} from "react-bootstrap"


class RegisterInCompetition extends React.Component {

    constructor(props) {
        super(props)
    }

    handleSubmit = async e =>{
        e.preventDefault();

        let teamName1 = document.getElementById('teamName');
        let codeCompetition1 = document.getElementById('codeCompetition');

        let tempData = {
            teamName : teamName1.value,
            keyComp: codeCompetition1.value
        }

        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tempData)
            }


            let response = await fetch('http://localhost:8080/registerInCompetition', config)
            let json = await response.json();
            if (json.flag == true){
                alert(json.message)
            }else{
                alert(json.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    /*html*/

    render() {
        return(

            <body className="register-body2">
            <nav className="nav bg-navbar btn-style:hover">
            <a href="/" className="nav-link a-text-register" role="button">Home</a>
            <a href="/contests" className="nav-link a-text-register" role="button">Competition</a>
            </nav>

            <div className="col-8 position-absolute top-50 start-50 translate-middle ">
                <div class="container-form container ">
                    <h2 className="h2-tittle-register"> Register Competition</h2>
                    <p className="p-text-welcome">Thank you for choosing the <font color="#FFA901">{this.props.nameComp}</font> competition</p>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="teamName" className="label-team-name p-text-welcome col-12">Team name *</Form.Label>
                            <Form.Control className="text-input"  type="text" name="teamName" id="teamName" required placeholder="Team name"/>
                        </Form.Group><br></br>

                        <Form.Group>
                            <Form.Label htmlFor="codeCompetition" className="label-team-name p-text-welcome col-12">Code Competition *</Form.Label>
                            <Form.Control className="text-input"  type="text" name="codeCompetition" id="codeCompetition" required placeholder="Code competition"/>
                        </Form.Group>

                        <div className="position-relative m-2">
                            <Button className="btn-style2 btn-style2:hover position-absolute right-0 end-0" type="submit">Submit</Button>
                        </div>
                    </Form>
                </div>
                
            </div>
            
           
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossOrigin="anonymous"></script>
            </body>

        )
    }
}

export default RegisterInCompetition;