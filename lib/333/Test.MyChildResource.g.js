import Test_MyService from './Test.MyService.g.js';
import Test_MyGenericRecordOfTest_MyResource from './Test.MyGenericRecordOfTest_MyResource.g.js';
import Test_MyResource from './Test.MyResource.g.js';
import Test_MyRecord from './Test.MyRecord.g.js';
import Test_MyChildRecord from './Test.MyChildRecord.g.js';
import Test_SizeEnum from './Test.SizeEnum.g.js';

export default class MyChildResource extends Test_MyResource {
/* Esiur.Data.Int32 */ Hell2o(/* String */ childName) {
var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({new Esiur.Data.UInt8(0) :childName});
var rt = new Esiur.Core.AsyncReply();
this._invoke(2, args).then((x) => rt.trigger(x))
.error((x) => rt.triggerError(x))
.chunk((x) => rt.triggerChunk(x));
return rt; }
/* String */ HelloChild() {
var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({});
var rt = new Esiur.Core.AsyncReply();
this._invoke(3, args).then((x) => rt.trigger(x))
.error((x) => rt.triggerError(x))
.chunk((x) => rt.triggerChunk(x));
return rt; }
/* String */ get ChildName() { return this._get(2); }
set ChildName(/* String */ value) { this._set(2, value); }

static get template() {return new Esiur.Resource.Template.TemplateDescriber('Test', [
new Esiur.Resource.Template.Prop('CategoryId', Esiur.Data.Int32, 'Int32', null),
new Esiur.Resource.Template.Prop('Description', String, 'Comment', null),
new Esiur.Resource.Template.Prop('ChildName', String, 'String', null),
new Esiur.Resource.Template.Func('Hello', String, [], '() -> String'),
new Esiur.Resource.Template.Func('HelloParent', String, [], '() -> String'),
new Esiur.Resource.Template.Func('Hell2o', Esiur.Data.Int32, [new Esiur.Resource.Template.Arg('childName', String, false)], '([String] childName) -> Int32'),
new Esiur.Resource.Template.Func('HelloChild', String, [], '() -> String')], 
Test_MyResource, 0, null, Esiur.Data.Guid.parse('a884cf07481805fe97e6713175a99320'), 'MyChildResource');
}
}
new Esiur.Resource.Template.TypeTemplate(MyChildResource, true);
