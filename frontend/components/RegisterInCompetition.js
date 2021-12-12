import React from 'react';
import Link from 'next/link'

class RegisterInCompetition extends React.Component {

    render() {
        return(

            <body className = "body-register container" >

            <nav className="nav bg-navbar">
                <a className="nav-link a-text-register" href="#">Home</a>
                <a className="nav-link a-text-register" href="#">Competition</a>
                <a className="nav-link a-text-register" href="#">Ranking</a>
            </nav>

            <div className="container">
                <div class="container-form">
                    <h2 className="h2-tittle-register"> Register Competition</h2>
                    <p className="p-text-welcome">Thank you for choosing the "PepitoGanador" competition</p>
                    <forms>
                        <label name="teamN" className="label-team-name p-text-welcome">Team name: </label>
                        <input className="text-input" type="text" name="teamName" placeholder="Team name"/><br/>
                    </forms>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
            </body>
        )
    }
}

export default RegisterInCompetition;