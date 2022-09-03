import Test_MyService from './Test.MyService.g.js';
import Test_MyGenericRecordOfTest_MyResource from './Test.MyGenericRecordOfTest_MyResource.g.js';
import Test_MyResource from './Test.MyResource.g.js';
import Test_MyRecord from './Test.MyRecord.g.js';
import Test_MyChildResource from './Test.MyChildResource.g.js';
import Test_SizeEnum from './Test.SizeEnum.g.js';

class MyChildRecord extends Test_MyRecord {
/* String */ ChildName;



static get template() {return new TemplateDescriber('Test.MyChildRecord', [
new Prop('Id', Esiur.Data.Int32, 'Int32', null),
new Prop('Name', String, 'String', null),
new Prop('Score', Esiur.Data.Float64, 'Double', null),
new Prop('ChildName', String, 'String', null)], 
Test_MyRecord, 0, null);
}
}