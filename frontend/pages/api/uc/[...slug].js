export default async function handler(req, res) {
	const { slug } = req.query

	let url = "http://localhost:8081/"+slug[0]

	if(slug.length === 2){
		url = url+"/"+slug[1]
	}

	const response =await fetch(url)
	const data = await response.json()
	res.send(data)
}
