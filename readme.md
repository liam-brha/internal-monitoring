# Docker container custom monitoring

This was an experiment more than anything. It seeks to provide a page where you can view all services running on my VPS.

"Services" refers to the node server instances that run in containers.

# How it works

The intermediary server allows servers on the user defined docker network bridge to make POST requests with information about the server.

This should include
- uptime
- and status.

In future the list should be expanded.

The API server has a public endpoint where data available about the servers are able to be fetched. 

# Why are the servers split?
Lack of authentication. If the public endpoint was hosted on the same server, I would need to add some kind of authentication so that I could verify it was my own server sending the update request.
By internalising the server status update endpoint, I don't have to worry about unwanted requests. The easist way to do this is an intermediary server with no public endpoints.
Hence, the front facing API server was born.

# This is terrible.
I'm a hobbiest playing around with the tools I only partially know. Though a lecture on how to build a proper status server and container based ecosystem is appreciated, I don't care enough to seek advice myself.
