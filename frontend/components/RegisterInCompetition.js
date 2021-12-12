import React from 'react';
import Link from 'next/link'

class RegisterInCompetition extends React.Component {

    render() {
        return(

            <body className="register-body">
            <nav className="nav bg-navbar btn-style:hover ">
                <a className="nav-link a-text-register" href="#">Home</a>
                <a className="nav-link a-text-register" href="#">Competition</a>
            </nav>

            <div className="col-8 position-absolute top-50 start-50 translate-middle ">
                <div class="container-form container ">
                    <h2 className="h2-tittle-register"> Register Competition</h2>
                    <p className="p-text-welcome">Thank you for choosing the "PepitoGanador" competition</p>
                    <forms>
                        <label for="teamName" className="label-team-name p-text-welcome col-2">Team name*: </label>
                        <input className="text-input col-5" type="text" name="teamName" id="teamName" required placeholder="Team name" /><br/>
                        <div className="col-12">
                            <button className="btn-style2 btn-style2:hover" type="submit">Submit</button>
                        </div>
                    </forms>
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