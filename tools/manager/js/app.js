
function init()
{
    iui("dlgLogin").dialog().show();
 
    var local = new MemoryStore();    
    Warehouse.put(local, "local");

    iui("divContent").browser();
}

function connect()
{
    var url = document.getElementById("txtURL").value;
    var domain = document.getElementById("txtDomain").value;
    var username = document.getElementById("txtUsername").value;
    var password = document.getElementById("txtPassword").value;

    iui("dlgLogin").setLoading(true);

    var con = new DistributedConnection(url, domain, username, password);
    Warehouse.put(con, "remote");
    
    con.on("ready", function (d) {
        iui("divContent").setConnection(con);
        iui("dlgLogin").hide();
        }).on("error", function(sender, code, msg){
        console.log(sender, code, msg);
    });
}