import Head from 'next/head'
import HeadRPC from '../components/HeadRPC'
import Link from 'next/Link'
import LoginForm from '../components/LoginForm'

export default function Home() {

  return (

    <div className="container">

      <Head>

        <meta charSet="UTF-8" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />

        <title>RPC - Sign in</title>

        <link rel="icon" href="/logo.ico" />

      </Head>

      <HeadRPC />

      <LoginForm />

      <br />

      <h1 className="py-1 text-center">Sign up</h1>

      <br />

      <Link href="/register">

        <center><a className="btn btn-primary">Create new account</a></center>

      </Link>

      <br /><br />


      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

    </div>
  )
}