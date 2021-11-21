import HeadRPC from '../../components/HeadRPC'
import Link from "next/link";
import home from "../home/[user]";

export default function PastContests({pastContestObjects}) {

    console.log(pastContestObjects)

    return(

        <div className="container">

            <HeadRPC/>


            <div className="py-1 text-center">

                <div style={{display:"flex"}}>
                    <input type="text" id="searchField" name="searchField" placeholder="Search..."  />
                    <a className="btn btn-primary" role="button">Search</a>
                    <label className="m-3">Year: </label>
                    <input type="text" id="year" name="year" placeholder="Year..."  />

                    <div className="m-20">
                        <Link href="/contests/UpcomingContests">


                            <a>See upcoming contests</a>

                        </Link>
                    </div>
                </div>
                <br></br>
                <br></br>


            </div>



            <table className="table table-hover table-striped text-center">

                <thead>

                <tr>
                    <th>
                        Contest name
                    </th>
                    <th>
                        End Date
                    </th>
                    <th>
                        #teams
                    </th>
                </tr>

                </thead>

                <tbody>

                {pastContestObjects.map(e => (
                    <tr>
                        <td>
                            {e.name}
                        </td>
                        <td>
                            {e.endDate}
                        </td>
                        <td>
                            2
                        </td>
                    </tr>
                ))}

                </tbody>

            </table>

        </div>



    )

}
//
// PastContests.getInitialProps = async () => {
//     const response = await fetch('http://localhost:8081/pc')
//     const pastContestObjects = await response.json()
//     return { pastContestObjects: pastContestObjects }
// }

export async function getServerSideProps(){
    const response = await fetch('http://localhost:8081/pc')
    const pastContestObjects = await response.json()
    return {props: { pastContestObjects: pastContestObjects }}
}