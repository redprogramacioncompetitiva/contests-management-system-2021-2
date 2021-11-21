import HeadRPC from '../../components/HeadRPC'
import { useRouter } from 'next/router'
import Link from 'next/Link'

export default function home({ teamObjects, contestName}) {

     console.log(teamObjects)

    return(

        <div className="container">

            <HeadRPC/>


            <div className="py-1 text-center">

                <div style={{display:"flex"}}>
                    <input type="text" id="searchField" name="searchField" placeholder="Search..."  />
                    <a className="btn btn-primary" role="button">Search</a>


                </div>
                <br/>
                <br/>


            </div>



            <table className="table table-hover table-striped text-center">

                <thead>

                <tr>
                    <th>
                        Team name
                    </th>
                    <th>
                        Team members
                    </th>
                    <th>
                        Score
                    </th>
                </tr>

                </thead>

                <tbody>

                {teamObjects.map(e => (
                    <tr>
                        <td>
                            {e.name}
                        </td>
                        <td>
                            {e.members.map(m=>(
                                m.nickname
                            ))}
                        </td>
                        <td>
                            152
                        </td>
                    </tr>
                ))}

                </tbody>

            </table>

        </div>



    )

}
export async function getServerSideProps(ctx){
    const response = await fetch('http://localhost:8081/contestTeams/'+ctx.params.contest)
    const teamObjects = await response.json()
    return {props: { teamObjects: teamObjects , contestName: ctx.params.contest}}
}