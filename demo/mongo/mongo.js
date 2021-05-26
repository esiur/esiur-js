import Warehouse from "../../src/Resource/Warehouse.js";

import { createRequire } from 'module'
import AsyncReply from "../../src/Core/AsyncReply.js";
import DistributedServer from "../../src/Net/IIP/DistributedServer.js";
import IMembership from "../../src/Security/Membership/IMembership.js";
import WSSocket from "../../src/Net/Sockets/WSSocket.js";
import MemoryStore from "../../src/Stores/MemoryStore.js";
import DC from "../../src/Data/DataConverter.js";
import IResource from "../../src/Resource/IResource.js";
import Structure from "../../src/Data/Structure.js";
import MongoDBStore from "../../src/Stores/MongoDBStore.js";


class User extends IResource {
    static get template() {
        return {
            properties: [{name: "username"}, {name: "password"}]
        };
    }
}

let db  = await Warehouse.new(MongoDBStore, "db");

await Warehouse.open();

let admin = await Warehouse.new(User, "admin", db, null, null, null, {username: "admin", password: "1234"});

let old = await db.get("id/6053437f389bee15089d8f85");

console.log("Count : " + db.resources.size);
