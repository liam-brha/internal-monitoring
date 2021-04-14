
const fs = require("fs");
const http = require("http");
const express = require("express");
const htttps = require("httpsServer");
const fetch = require('node-fetch');

httpsOptions = {
	cert: fs.readFileSync("./ssl/back_textedit_dev.crt"),
	ca: fs.readFileSync("./ssl/back_textedit_dev.ca-bundle"),
	key: fs.readFileSync("./ssl/back_textedit_dev.key")
}

const app = express();
app.use(express.static("./public"));

app.get("/", (req, res) => {
	fetch("http://interstatus:50001/status")
	.then(data => data.json()).then(data => res.json({status: "INTERMEDIATE SERVER UP", data: data}))
	.catch(e => { res.json({ status: "INTERMEDIATE SERVER DOWN", data: null }) })
})

// status server code
setInterval(() => {
	fetch("http://interstatus:50001/update", {
		method: "post",
		body: JSON.stringify({ name: "statAPI" }),
		headers: { 'Content-Type': 'application/json' }
	}).catch(e => { console.log("status server down") })
}, 20000)

const httpsServer = https.createServer(httpsOptions, app)
httpsServer.listen(60000, "0.0.0.0", () => console.log("listening 80"))
