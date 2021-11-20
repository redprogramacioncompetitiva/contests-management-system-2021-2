import HeadRPC from '../../components/HeadRPC'
import Link from "next/link";
import home from "../home/[user]";

export default function PastContests({pastContestObjects}) {

    console.log(pastContestObjects)

    return(

        <div className="container">

            <HeadRPC/>


            <div className="py-1 text-center">

                <Link href="../../..">

                    <a className="btn btn-primary" role="button">Logout</a>

                </Link>
                <br></br>
                <br></br>
                <div>

                    <Link href="/UpcomingContests">


                        <a>See upcoming contests</a>

                    </Link>
                    <input type="text" id="searchField" name="searchField" className="form-control" placeholder="Search..."  />
                    <a className="btn btn-primary" role="button">Search</a>


                </div>


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
                    </tr>
                ))}

                </tbody>

            </table>

        </div>



    )

}

PastContests.getInitialProps = async () => {
    const response = await fetch('http://localhost:8080/pc')
    const pastContestObjects = await response.json()
    return { pastContestObjects: pastContestObjects }
}