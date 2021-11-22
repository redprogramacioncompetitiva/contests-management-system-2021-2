import HeadRPC from '../components/HeadRPC'
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";
import useSWR from "swr"

export default function UpcomingContests({upcomingContestObjects}) {

	const [test1, setTest1] = useState()
	const [searchField, setSearchField] = useState()

	const handleSearchChange = (e) => {
		setSearchField(e.target.value.trim())
		console.log(searchField)
	}

	const handleRefresh = (e) => {
		setTest1("uc/"+searchField)
	}

	return (

		<div className="container" onLoad={()=>setTest1("uc")}>

			<HeadRPC/>

			<div className="py-1 text-center">

				<Link href="/">

					<a className="btn btn-primary" role="button">Logout</a>

				</Link>
				<br/>
				<br/>
				<div>

					<div style={{display: "flex"}}>
						<input onChange={handleSearchChange} type="text" id="searchField" name="searchField" placeholder="Search..."/>
						<a onClick={handleRefresh} className="btn btn-primary" role="button">Search</a>

						<div className="m-20">
							<Link href="/PastContests">
								<a>See past contests</a>

							</Link>
						</div>
					</div>


				</div>


			</div>

			{getContent(test1)}

		</div>


	)

}

const fetcher = async (url) => {
	const response = await fetch("/api/uc/"+url)
	console.log(response)
	return response.json()
}

export function getContent(url) {
	const router = useRouter()

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
					Start Date
				</th>
				<th>
					Registration end date
				</th>
			</tr>

			</thead>

			<tbody>

			{data.map(e => (
				<tr onClick={() => router.push("/contest/" + e.name)}>
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
	)
}