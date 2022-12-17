import MQTTServer_Model_Unit from './MQTTServer.Model.Unit.g.js';

export default class Generator extends MQTTServer_Model_Unit {
	/* Esiur.Data.Float32 */ Freq;

	/* Esiur.Data.Float32 */ KVA;

	/* Esiur.Data.Float32 */ KVAMax;

	/* Esiur.Data.Float32 */ KW;

	/* Esiur.Data.Float32 */ KWMax;

	/* Esiur.Data.Float32 */ L1A;

	/* Esiur.Data.Float32 */ L1AMax;

	/* Esiur.Data.Float32 */ L1V;

	/* Esiur.Data.Float32 */ L1VMax;

	/* Esiur.Data.Float32 */ L2A;

	/* Esiur.Data.Float32 */ L2AMax;

	/* Esiur.Data.Float32 */ L2V;

	/* Esiur.Data.Float32 */ L2VMax;

	/* Esiur.Data.Float32 */ L3A;

	/* Esiur.Data.Float32 */ L3AMax;

	/* Esiur.Data.Float32 */ L3V;

	/* Esiur.Data.Float32 */ L3VMax;

	/* Esiur.Data.Float32 */ PowerFactor;



	static get template() {
		return new Esiur.Resource.Template.TemplateDescriber('MQTTServer.Model', [
			new Esiur.Resource.Template.Prop('Altitude', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('Id', Esiur.Data.Int32, "Int32", null),
			new Esiur.Resource.Template.Prop('LastUpdate', Date, "DateTime", null),
			new Esiur.Resource.Template.Prop('Latitude', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('Longitude', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('ModbusId', Esiur.Data.UInt8, "Byte", null),
			new Esiur.Resource.Template.Prop('Name', Esiur.Data.Nullable.of(String), "String", null),
			new Esiur.Resource.Template.Prop('Freq', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('KVA', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('KVAMax', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('KW', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('KWMax', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L1A', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L1AMax', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L1V', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L1VMax', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L2A', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L2AMax', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L2V', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L2VMax', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L3A', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L3AMax', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L3V', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('L3VMax', Esiur.Data.Float32, "Single", null),
			new Esiur.Resource.Template.Prop('PowerFactor', Esiur.Data.Float32, "Single", null)], 
			MQTTServer_Model_Unit, 0, null, Esiur.Data.Guid.parse('d4fcb4c902842cb0453f39df0077fa37'), 'Generator');
	}
}