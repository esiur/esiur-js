"use strict";  

var demo = null;

class JSResource extends IResource
{
    static get template()
    {
        return {
                namespace: "JS",
                properties: [{name: "message", recordable: true}],
                functions: [{name: "send", void: true, expansion: null}],
                events: [{name: "published", expansion: null}]
            }
    }

    constructor()
    {
        super();
        this.message = "hi";
    }

    send(message)
    {
        console.log(message);
    }
}


function init() {


    var local = new MemoryStore();

    var con = new DistributedConnection("ws://localhost:5001/iip/system/iip", "localhost", "demo", "1234");
    Warehouse.put(con, "remote");
    Warehouse.put(local, "local");

    Warehouse.put(new JSResource(), "js", local);

    
    con.on("ready",  async function (d) {

       // var list = await con.query("").task;
        
          //      console.log(list);
          //      debugger;

        Warehouse.get("remote/db/my").then(async function(rt){
        console.log("Object received.");
        demo = rt;
          rt.on("LevelUp", function(v){
             console.log("LevelUp", v);
          });

        con.getRecord(rt, new Date(new Date() - 60000000), new Date()).then(function(h){
            console.log(h);
        });
        
        var l = await rt.Subtract(3).task;
        console.log("Await", l);

        //rt.Stream(10).then(x=> console.log("finished S"))
        //                 .chunk(x => console.log ("chunk", x))
        //                 .progress((x,y,z) => console.log("progress", x, y, z));

        //rt.Enum(4).then(x=> console.log("Enum finished"))
          //              .chunk(x => console.log ("Enum chunk", x))
          //              .progress((x,y,z) => console.log("progress", x, y, z));

  
      });
    }).on("error", function(sender, code, msg){
        console.log(sender, code, msg);
    });
    
}