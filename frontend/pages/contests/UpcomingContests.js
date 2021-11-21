import HeadRPC from '../../components/HeadRPC'
import Link from "next/link";
import {useRouter} from "next/router";

export default function UpcomingContests({upcomingContestObjects}) {

    const router = useRouter()

    return(



        <div className="container">

            <HeadRPC/>


            <div className="py-1 text-center">

                <Link href="/">

                    <a className="btn btn-primary" role="button">Logout</a>

                </Link>
                <br/>
                <br/>
                <div>


                    <div style={{display:"flex"}}>
                        <input type="text" id="searchField" name="searchField" placeholder="Search..."  />
                        <a className="btn btn-primary" role="button">Search</a>

                        <div className="m-20">
                            <Link href="/contests/PastContests">


                                <a>See past contests</a>

                            </Link>
                        </div>
                    </div>





                </div>


            </div>



            <table className="table table-hover table-striped text-center">

                <thead>

                <tr>
                    <th>
                        Contest name
                    </th>
                    <th>
                        Start Date
                    </th>
                    <th>
                        Registration end date
                    </th>
                </tr>

                </thead>

                <tbody>

                {upcomingContestObjects.map(e => (
                    <tr onClick={()=>router.push(e.name)}>
                        <td>
                            {e.name}
                        </td>
                        <td>
                            {e.startDate}
                        </td>
                        <td>
                            {e.registerEndDate}
                        </td>
                    </tr>
                ))}

                </tbody>

            </table>

        </div>



    )

}

// UpcomingContests.getServerSideProps = async () => {
//     const response = await fetch('http://localhost:8081/uc')
//     const upcomingContestObjects = await response.json()
//     return { upcomingContestObjects: upcomingContestObjects }
// }

export async function getServerSideProps(){
    const response = await fetch('http://localhost:8081/uc')
    const upcomingContestObjects = await response.json()
    return {props: { upcomingContestObjects: upcomingContestObjects }}
}