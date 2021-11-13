import { useRouter } from 'next/router'
import Head from 'next/head'
import RegisterForm from '../../components/RegisterForm'

export default function register() {

  const router = useRouter()
  let message = ''

  switch (router.query.msg) {
    case 'msg1':
      message = 'Las contraseñas no coinciden!'
      break
    case 'msg2':
      message = 'El email especificado ya existe!'
      break
    case 'msg3':
      message = 'El nickname especificado ya existe!'
      break
    case 'msg4':
      message = 'El usuario fue registrado exitosamete. Antes de iniciar sesión, verifique su cuenta con el enlace enviado a su correo.'
      break
  }

  return (

    <div className="container">

      <Head>

        <meta charSet="UTF-8" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />

        <title>RPC - Sign up</title>

        <link rel="icon" href="/public/rpcLogo.ico" />

      </Head>

      <RegisterForm />

      <p className="text-center">{message}</p>

    </div>
  )
}