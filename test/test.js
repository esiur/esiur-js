var demo;

import IStore from '../src/Resource/IStore.js';
import wh from '../src/esiur.js';

class MyStore extends IStore
{

}

wh.get("iip://localhost:5001/db/my", {username: "demo", password: "1234"})
    .then(x=>{
      console.log("connected", x);

      window.x = x;
    }).catch(x=>{
      console.log("error", x);
    });