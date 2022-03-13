import Warehouse from "../../src/Resource/Warehouse.js";

import { createRequire } from 'module'

const require = createRequire(import.meta.url);

const WebSocket = require('ws');

var remote = await Warehouse.get('iip://localhost/mem/service');

// remote?.instance?.template.properties.forEach((element) => {
//   console.log(element.name);
//   console.log(remote[element.name]);
// });

await remote?.Void();
await remote?.Connection('ss', 33);
await remote?.ConnectionOptional('Test 2', 88);
var rt = await remote?.Optional('Optional', 311);
console.log(rt);

var t2 = await remote?.GetTuple2(1, 'A');
console.log(t2);
var t3 = await remote?.GetTuple3(1, 'A', 1.3);
console.log(t3);
var t4 = await remote?.GetTuple4(1, 'A', 1.3, true);
console.log(t4);

remote?.on('StringEvent', (args) => console.log(`StringEvent ${args}`));

remote?.on('ArrayEvent', (args) => console.log(`ArrayEvent ${args}`));

await remote?.InvokeEvents('Hello');

// var mcr = MyChildRecord()
//   ..ChildName = "I'm Child"
//   ..Name = 'Dad'
//   ..Score = 332
//   ..Id = 44;

// var rec = await remote?.SendRecord(mcr);

// print(rec);
