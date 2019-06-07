const http = require('http');

const esiur = require('./build/esiur-debug-node.js');

var IIP_LINK = "ws://media.delta.iq:5001/iip/system/iip";

var connection = new esiur.DistributedConnection(IIP_LINK, "sawadland", "guest", "guest");
esiur.Warehouse.put(connection, "remote");

connection.on("ready", function (d) {
	console.log(d);
	connection.get("vod/home").then(function(rt){
		
		console.log("Home");
		rt.getMyList().then(x => x.map(y=>console.log(y.name)));
})});
	
	
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
