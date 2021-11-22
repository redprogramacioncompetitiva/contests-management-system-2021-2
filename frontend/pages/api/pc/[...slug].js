export default async function handler(req, res) {
	const { slug } = req.query
	console.log(slug)

	let url = "http://localhost:8081/pc/"

	if(slug.length===2){
		url = url+slug[0]+"/"+slug[1]
	}else {
		url = url+slug[0]
	}

	console.log(url)

	const response =await fetch(url)
	const data = await response.json()
	res.send(data)
}
