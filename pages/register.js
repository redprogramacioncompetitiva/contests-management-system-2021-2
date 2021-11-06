import Head from 'next/head'
import Link from 'next/link'

export default function Register() {
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />
                <title>User Login</title>
                <link rel="icon" href="/rpcLogo.ico" />
            </Head>
            <body>
                <div class="py-1 text-center">
                    <img src="https://pbs.twimg.com/profile_images/493847405670850561/qslkfHlq_400x400.jpeg" alt="RPC_Logo" width="100" height="100" />
                    <h1 class="display-2">RPC :: Red de Programación Competitiva</h1>
                </div>
                <h2 class="text-center">Account Registration</h2><br />
                <form class="w-50 mx-auto p-2" action="/registerauth" method="POST">
                    <div class="alert alert-warning rounded" role="alert">
                        <ul>
                            <li>nicknames must contain only letters or numbers</li>
                            <li>nicknames must be longer than 4 characters but shorter than 51</li>
                            <li>passwords must contain a uppercase letter, lowercase letter, number, and special character</li>
                            <li>passwords must be greater than 5 characters but less than 60</li>
                            <li>no field should contain spaces</li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="Email">Email:</label>
                        <input type="email" class="form-control" id="email" name="email" required /><br /><br />
                    </div>

                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" class="form-control" required /><br /><br />
                    </div>

                    <div class="form-group">
                        <label for="password2">Confirm password:</label>
                        <input type="password" id="password2" class="form-control" name="password2" required /><br /><br />
                    </div>

                    <div class="form-group">
                        <label for="nickname">Nickname:</label>
                        <input type="text" id="nickname" name="nickname" class="form-control" required /><br /><br />
                    </div>

                    <div class="form-group">
                        <label for="firstname">Firstname: </label>
                        <input type="text" id="firstname" name="firstname" class="form-control" required /><br /><br />
                    </div>

                    <div class="form-group">
                        <label for="lastname">Lastname: </label>
                        <input type="text" id="lastname" name="lastname" class="form-control" required /><br /><br />
                    </div>

                    <div class="form-group">
                        <label for="birthdate">Birthdate: </label>
                        <input type="date" id="birthdate" name="birthdate" class="form-control" min="" max="" required /><br /><br />
                    </div>

                    <input type="submit" class="btn btn-primary" value="Save" />
                    <br/><br/>
                    <a class="btn btn-primary" href="/login" role="button">Cancel</a>

                </form>
            </body>

        </>
    )
}