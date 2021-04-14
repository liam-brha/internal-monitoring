const fs = require("fs");
const http = require("http");
const express = require("express");
const htttp = require("http");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function dateGrab() { return new Date() }

let currentServers = [
	{ name: "timetable", lastCheckIn: dateGrab(), state: "UP" },
	{ name: "statAPI", lastCheckIn: dateGrab(), state: "UP" }
]

app.post("/update", (req, res) => {
	console.log("update requested")
	for(i in currentServers) {
		if(currentServers[i].name == req.body.name) {
			currentServers[i].lastCheckIn = new Date()
			currentServers[i].state = "UP"
			return
		}
 	}
 	res.json("OK")
})

app.get("/status", (req, res) => {
	res.json(currentServers)
})

// every 20 seconds, check if a server in the list has not responded within the last 35 seconds
// servers are set to auto-poll this server every 20 seconds.

setInterval(() => {
	for(i in currentServers) {
		let dateCache = new Date(currentServers[i].lastCheckIn)
		dateCache.setSeconds(dateCache.getSeconds() + 35 )
		if(dateCache < new Date()) { currentServers[i].state = "DOWN" }
	}
}, 20000)


const httpServer = http.createServer(app)
httpServer.listen(50001)