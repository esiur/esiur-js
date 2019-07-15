var demo;

import IStore from '../src/Resource/IStore.js';
import wh from '../src/Resource/Warehouse.js';

class MyStore extends IStore
{

}



wh.get("iip://localhost:5001/db/my").then(x=>{
  console.log("connected", x);
}).error(x=>{
  console.log("error", x);
});

/*
var con = new DistributedConnection("ws://localhost:5001/iip/system/iip", "localhost", "demo", "1234");
Warehouse.put(con, "remote");

con.on("ready", function (d) {
  con.get("db/my").then(function(rt){
    console.log("Object received.");
    demo = rt;
      rt.on("LevelUp", function(a, b, c){
          console.log("LevelUp", a, b, c);
      });

      rt.Add(3);

      rt.Divide({nominator: 10, denominator: 50}).then(x=>{
          console.log(x);
      });

  });
}).on("error", function(sender, code, msg){
    console.log(sender, code, msg);
});
*/