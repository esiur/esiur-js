
import wh from './Resource/Warehouse.js';
import Structure from './Data/Structure.js';
import DistributedResource from './Net/IIP/DistributedResource.js'

if (window) {
    window.wh = wh;
    window.Structure = Structure;
    window.DistributedResource = DistributedResource;
}

export default wh;