import "../src/esiur.js";

console.log("Starting test.");

let service = await wh.get("iip://localhost/sys/service");

console.log(service);