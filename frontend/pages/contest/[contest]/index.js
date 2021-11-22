import HeadRPC from '../../../components/HeadRPC'
import {useRouter} from 'next/router'
import Link from 'next/Link'

export default function home({teamObjects, contestName}) {

	const router = useRouter()

	const handle = async () => {
		await fetch("/api/download").then((res) => {
			alert("Tu archivo ha sido descargado (en la carpeta public)")
		})
	}

	return (

		<div className="container">

			<HeadRPC/>

			<div style={{display: "flex", alignItems: "center"}}>

				<img src="/goBackArrow.svg" width="30" height="30"
					 onClick={() => router.push("/UpcomingContests")}/>
				<h1 style={{marginLeft: "20px"}}>{contestName}</h1>
			</div>

			<div className="text-center">

				<div style={{display: "flex", justifyContent:"space-between"}}>
					<div>
						<input type="text" id="searchField" name="searchField" placeholder="Search..."/>
						<a style={{marginLeft:"20px"}} className="btn btn-primary" role="button">Search</a>
					</div>

					<a className="link" onClick={handle}>Download as text file</a>


				</div>
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
					<tr onClick={() => router.push("/contest/" + contestName + "/team/" + e.name)}>
						<td>
							{e.name}
						</td>
						<td>
							{e.members.map(m => (
								m.nickname + "   "
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

export async function getServerSideProps(ctx) {
	const response = await fetch('http://localhost:8081/contestTeams/' + ctx.params.contest)
	const teamObjects = await response.json()
	return {props: {teamObjects: teamObjects, contestName: ctx.params.contest}}
}