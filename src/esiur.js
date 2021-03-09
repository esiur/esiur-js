
import wh from './Resource/Warehouse.js';
import Structure from './Data/Structure.js';
import DistributedResource from './Net/IIP/DistributedResource.js'
import MemoryStore from './Stores/MemoryStore.js';
import IndexedDBStore from './Stores/IndexedDBStore.js';
import IResource from './Resource/IResource.js';
import ResourceProxy from './Proxy/ResourceProxy.js';
import DistributedConnection from './Net/IIP/DistributedConnection.js';

if (typeof window !== 'undefined') 
{
    window.wh = wh;
    window.Structure = Structure;
    window.DistributedResource = DistributedResource;
    window.MemoryStore = MemoryStore;
    window.IndexedDBStore = IndexedDBStore;
    window.IResource = IResource;
    window.ResourceProxy = ResourceProxy;
    window.DistributedConnection = DistributedConnection;
}
else if (typeof global !== 'undefined') 
{
    global.wh = wh;
    global.Structure = Structure;
    global.DistributedResource = DistributedResource;
    global.MemoryStore = MemoryStore;
    global.IndexedDBStore = IndexedDBStore;
    global.IResource = IResource;
    global.DistributedConnection = DistributedConnection;
}

export default wh;