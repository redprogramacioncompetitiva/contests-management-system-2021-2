import {sendStatusCode} from "next/dist/server/api-utils";

export default async function handler(req, res) {

	// const response = fetch("http://localhost:8080/pc/"+slug.join('/'))
    await fetch("http://localhost:8081/download")

	res.send(200)
}
