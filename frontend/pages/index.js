import HeadRPC from '../components/HeadRPC'
import LoginForm from '../components/LoginForm'
import StyleRPC from '../components/StyleRPC'
import I from '../components/Imports'
import RegisterForm from '../components/RegisterForm'
import Carousel from '../components/Carousel'
import Navbar from '../components/Navbar'


export default function Home() {

  return (

<<<<<<< HEAD
  
      <div className="  m-auto ">

<HeadRPC/>

  
 
<Navbar/>
    <Carousel/>
    <LoginForm/>
    <RegisterForm/>
    <StyleRPC/>
    <I/>
    
</div>
   
=======
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
>>>>>>> create-contest
  )
}