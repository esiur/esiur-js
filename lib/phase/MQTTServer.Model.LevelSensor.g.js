import MQTTServer_Model_Unit from './MQTTServer.Model.Unit.g.js';

export default class LevelSensor extends MQTTServer_Model_Unit {
	/* Esiur.Data.Float64 */ Level;

	/* Esiur.Data.Float64 */ MaxLevel;

	/* Esiur.Data.Float64 */ MaxVolume;

	/* Esiur.Data.Float64 */ Volume;



	static get template() {
		return new Esiur.Resource.Template.TemplateDescriber('MQTTServer.Model', [
			new Esiur.Resource.Template.Prop('Altitude', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('Id', Esiur.Data.Int32, "Int32", null),
			new Esiur.Resource.Template.Prop('LastUpdate', Date, "DateTime", null),
			new Esiur.Resource.Template.Prop('Latitude', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('Longitude', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('ModbusId', Esiur.Data.UInt8, "Byte", null),
			new Esiur.Resource.Template.Prop('Name', Esiur.Data.Nullable.of(String), "String", null),
			new Esiur.Resource.Template.Prop('Level', Esiur.Data.Float64, "Double", null),
			new Esiur.Resource.Template.Prop('MaxLevel', Esiur.Data.Float64, "Double", null),
			new Esiur.Resource.Template.Prop('MaxVolume', Esiur.Data.Float64, "Double", null),
			new Esiur.Resource.Template.Prop('Volume', Esiur.Data.Float64, "Double", null)], 
			MQTTServer_Model_Unit, 0, null, Esiur.Data.Guid.parse('b563e52891a13f91e032a027f4b647f0'), 'LevelSensor');
	}
}