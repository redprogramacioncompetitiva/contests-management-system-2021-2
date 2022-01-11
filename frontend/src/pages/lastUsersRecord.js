import HeadRPC from '../components/HeadRPC';
import Link from 'next/Link';
import Head from 'next/head';



export default function lastsUsersRecords({users}) {

    return (

        <div className="container">
            
            <div>
                <HeadRPC title = "Lista accesos cuentas registradas" />
            </div>

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

        .searchBar{
            height: 38.00011444091797px;
            width: 200px;
            left: 168.000244140625px;
            top: 1923px;
            border-radius: 10px;
            
           

        }
      `}</style>
            <div>
                <table className="table table-hover table-striped text-center">

                    <thead>

                        <tr>
                            <th>
                                <Link href="/generalReports">
                                    <a className="btn btn-primary" role="button">Reportes Generales</a>
                                </Link>
                            </th>
                            <th>
                                <input className="searchBar" type="search" placeholder="Buscar">

                                </input>
                            </th>

                        </tr>

                    </thead>

                </table>



            </div>

            <table className="table table-hover table-striped text-center">

                <thead>

                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Usuario
                        </th>
                        <th>
                            Tipo
                        </th>
                        <th>
                            Corrreo
                        </th>
                        <th>
                            Reportes
                        </th>
                        <th>
                            Fecha Acceso
                        </th>
                    </tr>

                </thead>
                <tbody>

                    {users.map(e => (
                        <tr>
                            <td>
                                {e.id}
                            </td>
                            <td>
                                {e.nickname}
                            </td>
                            <td>
                                {e.type}
                            </td>
                            <td>
                                {e.email}
                            </td>
                            <td>
                                {e.rep}
                            </td>
                            <td>
                                {e.date}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <div>
                <Link href="../../">

                    <a className="btn btn-primary" role="button">Atras</a>

                </Link>
            </div>
        </div>




    );
}

lastsUsersRecords.getInitialProps = async () => {
    const response = await fetch('http://localhost:3000/api/lastUsersRecord')
    const users = await response.json()
    return { users: users }
}

