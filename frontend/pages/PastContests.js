import HeadRPC from '../components/HeadRPC'
import Link from "next/link";
import {useRouter} from 'next/router';
import {useState} from "react";
import useSWR from "swr"

export default function PastContests() {

    const today = new Date()

    const [test1, setTest1] = useState("")
    const [test2, setTest2] = useState(today.getFullYear())
    const [searchField, setSearchField] = useState("")
    const [yearField, setYearField] = useState(today.getFullYear())

    const handleYearChange = (e) => {
        setYearField(e.target.value.trim())
        console.log(yearField)
    }
    const handleSearchChange = (e) => {
        setSearchField(e.target.value.trim())
        console.log(searchField)
    }

    const handleRefresh = (e) =>{
        setTest1(searchField)
        setTest2(yearField)
    }

    return (
        <div className="container">
            <HeadRPC/>

            <div className="py-1 text-center">

                <div style={{display: "flex"}}>
                    <input onChange={handleSearchChange} type="text" id="searchField" name="searchField" placeholder="Search..."/>
                    <a onClick={handleRefresh} className="btn btn-primary" role="button">Search</a>

                    <label className="m-3">Year: </label>
                    <input onChange={handleYearChange} type="number" id="year" name="year" placeholder="Year..."/>
                    <div className="m-20">
                        <Link href="/UpcomingContests">
                            <a>See upcoming contests</a>
                        </Link>
                    </div>
                </div>
                <br/>
                <br/>

            </div>
            {getContent(test2, test1)}

        </div>


    )

}

const fetcher = async (url) => {
    const response = await fetch("/api/pc/"+url)
    console.log(response)
    return response.json()
}

export function getContent(year, search) {
    const router = useRouter()

    const url = year + "/" + search

    console.log(url)

    const {data, error} = useSWR(url, fetcher)

    if (error) return <div>Error loading the data</div>
    if (!data) return <div>Loading...</div>

    return (
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

            {data.map(e => (
                <tr onClick={() => router.push("contest/"+e.name)}>
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
    )
}