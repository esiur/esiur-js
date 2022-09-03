import Test_MyService from './Test.MyService.g.js';
import Test_MyResource from './Test.MyResource.g.js';
import Test_MyRecord from './Test.MyRecord.g.js';
import Test_MyChildRecord from './Test.MyChildRecord.g.js';
import Test_MyChildResource from './Test.MyChildResource.g.js';
import Test_SizeEnum from './Test.SizeEnum.g.js';

class MyGenericRecordOfTest_MyResource extends IRecord { 
/* Esiur.Data.Int32 */ Needed;

/* TypedList.of(Test_MyResource) */ Results;

/* Esiur.Data.Int32 */ Start;

/* Esiur.Data.Int32 */ Total;



static get template() {return new TemplateDescriber('Test.MyGenericRecordOfTest_MyResource', [
new Prop('Needed', Esiur.Data.Int32, 'Int32', null),
new Prop('Results', TypedList.of(Test_MyResource), 'MyResource[]', null),
new Prop('Start', Esiur.Data.Int32, 'Int32', null),
new Prop('Total', Esiur.Data.Int32, 'Int32', null)], 
undefined, 0, null);
}
}