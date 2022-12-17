import MQTTServer_Service from './MQTTServer.Service.g.js';
import MQTTServer_Model_Generator from './MQTTServer.Model.Generator.g.js';
import MQTTServer_Model_Unit from './MQTTServer.Model.Unit.g.js';
import MQTTServer_Model_Readings_Messages_PowerInfo from './MQTTServer.Model.Readings.Messages.PowerInfo.g.js';
import MQTTServer_Model_Readings_Messages_PowerInfoType from './MQTTServer.Model.Readings.Messages.PowerInfoType.g.js';
import MQTTServer_Model_LevelSensor from './MQTTServer.Model.LevelSensor.g.js';
import MQTTServer_Model_Readings_Messages_LevelVolumeInfo from './MQTTServer.Model.Readings.Messages.LevelVolumeInfo.g.js';



let module = {}; 
Esiur.define(module, MQTTServer_Service, 'MQTTServer.Service');
new Esiur.Resource.Template.TypeTemplate(MQTTServer_Service, true);
Esiur.define(module, MQTTServer_Model_Generator, 'MQTTServer.Model.Generator');
new Esiur.Resource.Template.TypeTemplate(MQTTServer_Model_Generator, true);
Esiur.define(module, MQTTServer_Model_Unit, 'MQTTServer.Model.Unit');
new Esiur.Resource.Template.TypeTemplate(MQTTServer_Model_Unit, true);
Esiur.define(module, MQTTServer_Model_Readings_Messages_PowerInfo, 'MQTTServer.Model.Readings.Messages.PowerInfo');
new Esiur.Resource.Template.TypeTemplate(MQTTServer_Model_Readings_Messages_PowerInfo, true);
Esiur.define(module, MQTTServer_Model_Readings_Messages_PowerInfoType, 'MQTTServer.Model.Readings.Messages.PowerInfoType');
new Esiur.Resource.Template.TypeTemplate(MQTTServer_Model_Readings_Messages_PowerInfoType, true);
Esiur.define(module, MQTTServer_Model_LevelSensor, 'MQTTServer.Model.LevelSensor');
new Esiur.Resource.Template.TypeTemplate(MQTTServer_Model_LevelSensor, true);
Esiur.define(module, MQTTServer_Model_Readings_Messages_LevelVolumeInfo, 'MQTTServer.Model.Readings.Messages.LevelVolumeInfo');
new Esiur.Resource.Template.TypeTemplate(MQTTServer_Model_Readings_Messages_LevelVolumeInfo, true);

export default module;