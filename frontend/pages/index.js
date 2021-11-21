import HeadRPC from '../components/HeadRPC'
import LoginForm from '../components/LoginForm'

export default function Home() {

  return (

    <div className="container">

      <HeadRPC />

      <LoginForm />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Roboto,
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