
export default class LevelVolumeInfo extends Esiur.Data.IEnum {

	static options = [];

	static get template() {
		return new Esiur.Resource.Template.TemplateDescriber('MQTTServer.Model.Readings.Messages', [
], 
			null, 0, null, Esiur.Data.Guid.parse('3052ef8d1dff5cc2186284f3a7c38c19'), 'LevelVolumeInfo');
	}
}