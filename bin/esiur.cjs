#!/usr/bin/env node

console.log("Esiur Shell");
console.log("\t use: 'await wh.get(url, <attributes>);' to get a resource.");

const { spawn } = require("child_process");
const { pathToFileURL } = require("url");

let url = pathToFileURL(__dirname).href + '/../src/esiur.js';

spawn('node', ["-i", "-e", `import('${url}');`], {
  stdio: 'inherit'
});