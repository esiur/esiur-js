
export default class Unit extends Esiur.Data.IRecord { 
	/* Esiur.Data.Float32 */ Altitude;

	/* Esiur.Data.Int32 */ Id;

	/* Date */ LastUpdate;

	/* Esiur.Data.Float32 */ Latitude;

	/* Esiur.Data.Float32 */ Longitude;

	/* Esiur.Data.UInt8 */ ModbusId;

	/* Esiur.Data.Nullable.of(String) */ Name;



	static get template() {
		return new Esiur.Resource.Template.TemplateDescriber('MQTTServer.Model', [
			new Esiur.Resource.Template.Prop('Altitude', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('Id', Esiur.Data.Int32, "Int32", null),
			new Esiur.Resource.Template.Prop('LastUpdate', Date, "DateTime", null),
			new Esiur.Resource.Template.Prop('Latitude', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('Longitude', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('ModbusId', Esiur.Data.UInt8, "Byte", null),
			new Esiur.Resource.Template.Prop('Name', Esiur.Data.Nullable.of(String), "String", null)], 
			undefined, 0, null, Esiur.Data.Guid.parse('f751e9cc6c1a846888eeb66607427a48'), 'Unit');
	}
}