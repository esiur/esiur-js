import Test_MyService from './Test.MyService.g.js';
import Test_MyGenericRecordOfTest_MyResource from './Test.MyGenericRecordOfTest_MyResource.g.js';
import Test_MyRecord from './Test.MyRecord.g.js';
import Test_MyChildRecord from './Test.MyChildRecord.g.js';
import Test_MyChildResource from './Test.MyChildResource.g.js';
import Test_SizeEnum from './Test.SizeEnum.g.js';

export default class MyResource extends Esiur.Net.IIP.DistributedResource {
/* String */ Hello() {
var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({});
var rt = new Esiur.Core.AsyncReply();
this._invoke(0, args).then((x) => rt.trigger(x))
.error((x) => rt.triggerError(x))
.chunk((x) => rt.triggerChunk(x));
return rt; }
/* String */ HelloParent() {
var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({});
var rt = new Esiur.Core.AsyncReply();
this._invoke(1, args).then((x) => rt.trigger(x))
.error((x) => rt.triggerError(x))
.chunk((x) => rt.triggerChunk(x));
return rt; }
/* Esiur.Data.Int32 */ get CategoryId() { return this._get(0); }
set CategoryId(/* Esiur.Data.Int32 */ value) { this._set(0, value); }
/* String */ get Description() { return this._get(1); }
set Description(/* String */ value) { this._set(1, value); }

static get template() {return new Esiur.Resource.Template.TemplateDescriber('Test', [
new Esiur.Resource.Template.Prop('CategoryId', Esiur.Data.Int32, 'Int32', null),
new Esiur.Resource.Template.Prop('Description', String, 'Comment', null),
new Esiur.Resource.Template.Func('Hello', String, [], '() -> String'),
new Esiur.Resource.Template.Func('HelloParent', String, [], '() -> String')], 
null, 0, "A\nB\nC\nD", Esiur.Data.Guid.parse('99ce4d8acdf8ab959b8328d636b98ba9'), 'MyResource');
}
}
new Esiur.Resource.Template.TypeTemplate(MyResource, true);
