class ResourceBrowser extends IUIWidget
{

    loadClass(className)
    {
        var rt = new AsyncReply();

        if (this.scripts[className] != null)
        {
            rt.trigger(true);
        }
        else
        {
            var script = document.createElement('script');
            var self = this;
            script.onload = function () {
                self.scripts[classsName] = script;
                rt.trigger(true);
            };

            script.src = className + ".js";
            document.head.appendChild(script);    
        }
    }

    constructor(el, properties)
    {
        super(el, IUI.extend(properties, 
                    {
                        customClass: "browser", 
                        visible: false
                    })
            );

        var treeLayout = [
                            {width: '200px', field: "instance", title: "Name", formatter: function(d, v){

                                    if(v.instance.attributes.item("name") == null)
                                        return v.instance.name;
                                    else
                                        return v.instance.attributes.item("name");
                                }},
                        ];

                        /*
        var contentLayout = [
            {field: "instance", title: "Name", formatter: function(d, v){
                    return v.instance.attributes.item("name");
                }},
            {field: "instance", title: "Type", formatter: function(d, v){
                    return v.instance.template.name;
                }}
        ];
*/


        this.tree = iui(document.createElement("div")).table({tree: true, layout: treeLayout});
//        this.content = iui(document.createElement("div")).table({layout: contentLayout});
        this.bar = iui(document.createElement("div")).bar();
        this.el.classList.add(this.customClass);
        this.el.appendChild(this.bar.el);
        this.el.appendChild(this.tree.el);
       // this.el.appendChild(this.content.el);

        var self = this;
        this.tree.on("dblclick", function(item){
            
            self.tree.clear();
            self.connection.getAttributes(item, ["name", "parents", "type"]).then(function(attrs){
                self.tree.add(item);
              //  self.content.add(item);
             });

        }).on("expand", function(e){
            self.connection.getAttributes(e.item, ["children"]).then(function(attrs){

                attrs.children.forEach(function(child){
                    self.connection.getAttributes(child, ["name", "parents", "childrenCount", "type"]).then(function(cAttars){
                        self.tree.add(child, cAttars.childrenCount > 0);
                        e.success();
                    });
                });

                    
            });
        });
    }

    setConnection(connection, query = "")
    {
        var self = this;
        this.connection = connection;
        this.connection.query(query).then(function(rt)
        {
            rt.forEach(function(item){
                connection.getAttributes(item, ["name", "childrenCount", "type"]).then(function(attrs){

                //connection.getAttributes(item, ["name", "children", "type"]).then(function(attrs){
                   self.tree.add(item, attrs.childrenCount > 0);

                    /*
                   var children = attrs.children;

                   for(var i = 0; i < children.length; i++)
                   {
                     
                        if (!children[i].instance.attributes.contains("parents"))
                            children[i].instance.attributes.add("parents", []);
                        
                        children[i].instance.attributes.item("parents").push(item);

                        self.tree.add(children[i]);
                   }
                    */
                });
            });

            /*
            for(var i = 0; i < rt.length; i++)
            {
                var item = rt[i];
                connection.getAttributes(rt[i]).then(function(attrs){
                    self.tree.add(rt[i]);
                    self.content.add(rt[i]);  
                });
            }
            */
        });
    }
}

IUI.module("browser", ResourceBrowser);