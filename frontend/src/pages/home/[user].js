import HeadRPC from '../../components/HeadRPC'
import { useRouter } from 'next/router'
import Link from 'next/Link'
import  Navbar  from '../../components/Navbar'

export default function home({ users }) {

    const router = useRouter()
    let nickname = router.query.user
    
    console.log(users)

    return (

        <div className="container">

            <HeadRPC title = "Home"/>
            <Navbar/>

            <div className="py-1 text-center">

                <Link href="../../">

                    <a className="btn btn-primary" role="button">Logout</a>

                </Link>

                <p className="p-2">{router.query.user}</p>

            </div>

            <table className="table table-hover table-striped text-center">

                <thead>

                    <tr>
                        <th>
                            Username
                        </th>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Apellido
                        </th>
                        <th>
                            Descripción
                        </th>
                        <th>
                            Codigo Institución
                        </th>
                        <th>
                            Codigo Rol
                        </th>
                        <th>
                            Codigo Pais
                        </th>
                        <th>
                            Correo Electronico
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {users.map(e => (
                        <tr>
                            <td>
                                {e.username}
                            </td>
                            <td>
                                {e.nombre}
                            </td>
                            <td>
                                {e.apellido}
                            </td>
                            <td>
                                {e.descripcion}
                            </td>
                            <td>
                                {e.codigo_institucion}
                            </td>
                            <td>
                                {e.codigo_rol}
                            </td>
                            <td>
                                {e.codigo_pais}
                            </td>
                            <td>
                                {e.correouser}
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    )
}

home.getInitialProps = async () => {
    const response = await fetch('http://localhost:3000/api/ejemplo')
    const users = await response.json()
    return { users: users }
}
