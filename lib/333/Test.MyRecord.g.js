import Test_MyService from './Test.MyService.g.js';
import Test_MyGenericRecordOfTest_MyResource from './Test.MyGenericRecordOfTest_MyResource.g.js';
import Test_MyResource from './Test.MyResource.g.js';
import Test_MyChildRecord from './Test.MyChildRecord.g.js';
import Test_MyChildResource from './Test.MyChildResource.g.js';
import Test_SizeEnum from './Test.SizeEnum.g.js';

class MyRecord extends IRecord { 
/* Esiur.Data.Int32 */ Id;

/* String */ Name;

/* Esiur.Data.Float64 */ Score;



static get template() {return new TemplateDescriber('Test.MyRecord', [
new Prop('Id', Esiur.Data.Int32, 'Int32', null),
new Prop('Name', String, 'String', null),
new Prop('Score', Esiur.Data.Float64, 'Double', null)], 
undefined, 0, null);
}
}