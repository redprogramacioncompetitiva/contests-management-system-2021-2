export default async function handler(req, res) {
	const { slug } = req.query
	console.log(slug)

	// const response = fetch("http://localhost:8080/pc/"+slug.join('/'))
	const response = await fetch("http://localhost:8081/pc/2121")
	const data = await response.json()
	res.send(data)
}
