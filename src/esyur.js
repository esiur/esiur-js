
import wh from './Resource/Warehouse.js';
import Structure from './Data/Structure.js';
import DistributedResource from './Net/IIP/DistributedResource.js'
import MemoryStore from './Stores/MemoryStore.js';
import IResource from './Resource/IResource.js';

if (window) {
    window.wh = wh;
    window.Structure = Structure;
    window.DistributedResource = DistributedResource;
    window.MemoryStore = MemoryStore;
    window.IResource = IResource;
}
else if (global)
{
    global.wh = wh;
    global.Structure = Structure;
    global.DistributedResource = DistributedResource;
    global.MemoryStore = MemoryStore;
    global.IResource = IResource;

}

export default wh;