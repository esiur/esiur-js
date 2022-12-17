
export default class PowerInfo extends Esiur.Data.IEnum {

	static options = [];

	static get template() {
		return new Esiur.Resource.Template.TemplateDescriber('MQTTServer.Model.Readings.Messages', [
], 
			null, 0, null, Esiur.Data.Guid.parse('60844a9ca7bf4f73be886713aa10c04f'), 'PowerInfo');
	}
}