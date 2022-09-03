#!/usr/bin/env node

if (process.argv.length == 2) {
  console.log("Usage: <command> [arguments]");
  console.log("");
  console.log("Available commands:");
  console.log("\tget-template\t\tGet a template from an IIP link.");
  console.log("\tshell\t\tStart Node.js REPL with Esiur module loaded.");
  console.log("\tversion\t\tPrint Esiur version.");
  console.log("");
  console.log("Global options:");
  console.log("\t-u, --username\tAuthentication username.");
  console.log("\t-p, --password\tAuthentication password.");
  console.log("\t-d, --dir\tName of the directory to generate model inside.");
  process.exit();
}


const cmd = process.argv[2].toLowerCase();
const args = process.argv.slice(3);

if (cmd == "shell") {

    console.log("Esiur Shell");
    console.log("\t use: 'await wh.get(url, <attributes>);' to get a resource.");

    const { spawn } = require("child_process");
    const { pathToFileURL } = require("url");

    let url = pathToFileURL(__dirname).href + '/../src/esiur.js';

    spawn('node', ["-i", "-e", `import('${url}');`], {
      stdio: 'inherit'
    });
} 
else if (cmd == "get-template")
{
  // get username
  let username = getOption(args, "--username", "-u");
  let password = getOption(args, "--password", "-p");
  let dir = getOption(args, "--dir", "-d");

  if (args.length == 0){
    console.error("No URL specified.");
    process.exit();
  }

  let url = args[0];

  console.log(`Getting ${url} ${username} ${password} ${dir}`);

  let getTemplate = async () => {
    let Esiur  = (await import('../src/esiur.js')).default;
    await Esiur.Proxy.TemplateGenerator.getTemplate(url, dir, username, password, true);

    process.exit();
  }

  getTemplate();
}
else if (cmd == "version")
{
  var pkg = require('../package.json');
  console.log(pkg.version);
}

function getOption(args, option, abbreviation) {
  let index = args.indexOf(abbreviation);
  if (index == -1) index = args.indexOf(option);
  if (index > -1 && index + 1 < args.length) 
    return args.splice(index, 2)[1];
  return null;
}
