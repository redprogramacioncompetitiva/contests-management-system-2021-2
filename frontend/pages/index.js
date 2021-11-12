import HeadRPC from '../components/HeadRPC'
import Link from 'next/Link'
import LoginForm from '../components/LoginForm'

export default function Home() {

  return (

    <div className="container">

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