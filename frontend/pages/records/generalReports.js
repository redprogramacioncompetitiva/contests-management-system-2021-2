import HeadRPC from '../../components/HeadRPC'
import Link from 'next/Link'



export default function generalReports() {

    return (

        <div className="container">
            <HeadRPC />

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
            <div>
                <table className="table table-hover table-striped text-center" id="OrderingTable">
                    <thead>

                        <tr>
                            <th id="statisticsPanel">
                                <h2 >Reportes - Sistema</h2>
                                <table className="table table-hover table-striped text-center" id="statisticsTable">
                                    <tr>

                                        <td>Total ingresos de competidores: </td>

                                        <td>Celda 2</td>

                                    </tr>
                                    <tr>

                                        <td>Total ingresos de administradores: </td>

                                        <td>Celda 2</td>

                                    </tr>
                                    <tr>

                                        <td>Total ingresos de rep. Sedes: </td>

                                        <td>Celda 2</td>

                                    </tr>
                                    <tr>

                                        <td>Total ingresos: </td>

                                        <td>Celda 2</td>

                                    </tr>
                                    <tr>

                                        <td>Tiempo promedio en sesion: </td>

                                        <td>Celda 2</td>

                                    </tr>
                                    <tr>

                                        <td>Promedio de intentos fallidos de ingreso: </td>

                                        <td>Celda 2</td>

                                    </tr>
                                </table>
                            </th>
                            <th id="filterOptionsAnd2Grafics">
                                <Link href="/records/generalReports">
                                    <a className="btn btn-primary" role="button">Opciones de filtrado</a>
                                </Link>
                            </th>
                            <th id="ResetFiltersAnd1Grafic">
                            <Link href="/records/generalReports">
                                    <a className="btn btn-primary" role="button">Eliminar filtros</a>
                                </Link>
                            </th>

                        </tr>

                    </thead>

                </table>
            </div>

            <a className="btn btn-primary" role="button">Atras</a>



        </div>





    );
}


