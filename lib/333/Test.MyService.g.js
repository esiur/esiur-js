import Test_MyGenericRecordOfTest_MyResource from './Test.MyGenericRecordOfTest_MyResource.g.js';
import Test_MyResource from './Test.MyResource.g.js';
import Test_MyRecord from './Test.MyRecord.g.js';
import Test_MyChildRecord from './Test.MyChildRecord.g.js';
import Test_MyChildResource from './Test.MyChildResource.g.js';
import Test_SizeEnum from './Test.SizeEnum.g.js';

export default class MyService extends Esiur.Net.IIP.DistributedResource {
/* TypedList.of(Esiur.Data.Nullable.of(TypedMap.of(Esiur.Data.Int32,Esiur.Data.Nullable.of(String)))) */ AsyncHello() {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({});
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(0, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Object */ Connection(/* Object */ a1,/* Esiur.Data.Int32 */ a2) {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({ (new Esiur.Data.UInt8(0)) : a1, new Esiur.Data.UInt8(1) : a2 });
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(1, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Object */ ConnectionOptional(/* Object */ a1,/* Esiur.Data.Int32 */ a2,/* Esiur.Data.Nullable.of(String) */ a3 = null) {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({ new Esiur.Data.UInt8(0) : a1, new Esiur.Data.UInt8(1) : a2 });
        if (a3 != null) args.set(new Esiur.Data.UInt8(2), a3);
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(2, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Test_MyGenericRecordOfTest_MyResource */ GetGenericRecord() {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({});
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(3, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Tuple.of(Object,Object) */ GetTuple2(/* Esiur.Data.Int32 */ a1,/* String */ a2) {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({ new Esiur.Data.UInt8(0) : a1, new Esiur.Data.UInt8(1) : a2 });
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(4, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Tuple.of(Object,Object,Object) */ GetTuple3(/* Esiur.Data.Int32 */ a1,/* String */ a2,/* Esiur.Data.Float64 */ a3) {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({ new Esiur.Data.UInt8(0) : a1, new Esiur.Data.UInt8(1) : a2, new Esiur.Data.UInt8(2) : a3 });
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(5, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Tuple.of(Object,Object,Object,Object) */ GetTuple4(/* Esiur.Data.Int32 */ a1,/* String */ a2,/* Esiur.Data.Float64 */ a3,/* Boolean */ a4) {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({ new Esiur.Data.UInt8(0) : a1, new Esiur.Data.UInt8(1) : a2, new Esiur.Data.UInt8(2) : a3, new Esiur.Data.UInt8(3) : a4 });
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(6, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Object */ InvokeEvents(/* String */ msg) {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({ new Esiur.Data.UInt8(0) : msg });
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(7, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Esiur.Data.Float64 */ Optional(/* Object */ a1,/* Esiur.Data.Int32 */ a2,/* Esiur.Data.Nullable.of(String) */ a3 = null,/* Esiur.Data.Nullable.of(String) */ a4 = null) {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({ new Esiur.Data.UInt8(0) : a1, new Esiur.Data.UInt8(1) : a2 });
        if (a3 != null) args.set(new Esiur.Data.UInt8(2), a3);
        if (a4 != null) args.set(new Esiur.Data.UInt8(3), a4);
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(8, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Test_MyRecord */ SendRecord(/* Test_MyRecord */ record) {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({ new Esiur.Data.UInt8(0) : record });
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(9, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
    static /* String */ staticFunction(connection, /* String */ name) {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({ new Esiur.Data.UInt8(0) : name });
        var rt = new Esiur.Core.AsyncReply();
        connection.staticCall(Guid.parse('c4250e9a35c707e9280c7ff2f46d3654'), 10, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }
/* Object */ Void() {
        var args = new (Esiur.Data.TypedMap.of(Esiur.Data.UInt8, Object))({});
        var rt = new Esiur.Core.AsyncReply();
        this._invoke(11, args).then((x) => rt.trigger(x))
            .error((x) => rt.triggerError(x))
            .chunk((x) => rt.triggerChunk(x));
        return rt;
    }

    /* TypedList.of(Boolean) */ get BooleanArray() { return this._get(1); }
    set BooleanArray(/* TypedList.of(Boolean) */ value) { this._set(1, value); }
/* String */ get Char16() { return this._get(2); }
    set Char16(/* String */ value) { this._set(2, value); }
/* TypedList.of(String) */ get Char16Array() { return this._get(3); }
    set Char16Array(/* TypedList.of(String) */ value) { this._set(3, value); }
/* Test_MyChildRecord */ get ChildRecord() { return this._get(4); }
    set ChildRecord(/* Test_MyChildRecord */ value) { this._set(4, value); }
/* Test_MyChildResource */ get ChildResource() { return this._get(5); }
    set ChildResource(/* Test_MyChildResource */ value) { this._set(5, value); }
/* Test_SizeEnum */ get Enum() { return this._get(6); }
    set Enum(/* Test_SizeEnum */ value) { this._set(6, value); }
/* Esiur.Data.Float128 */ get Float128() { return this._get(7); }
    set Float128(/* Esiur.Data.Float128 */ value) { this._set(7, value); }
/* TypedList.of(Esiur.Data.Float128) */ get Float128Array() { return this._get(8); }
    set Float128Array(/* TypedList.of(Esiur.Data.Float128) */ value) { this._set(8, value); }
/* Esiur.Data.Float32 */ get Float32() { return this._get(9); }
    set Float32(/* Esiur.Data.Float32 */ value) { this._set(9, value); }
/* TypedList.of(Esiur.Data.Float32) */ get Float32Array() { return this._get(10); }
    set Float32Array(/* TypedList.of(Esiur.Data.Float32) */ value) { this._set(10, value); }
/* Esiur.Data.Float64 */ get Float64() { return this._get(11); }
    set Float64(/* Esiur.Data.Float64 */ value) { this._set(11, value); }
/* TypedList.of(Esiur.Data.Float64) */ get Float64Array() { return this._get(12); }
    set Float64Array(/* TypedList.of(Esiur.Data.Float64) */ value) { this._set(12, value); }
/* Esiur.Data.Int16 */ get Int16() { return this._get(13); }
    set Int16(/* Esiur.Data.Int16 */ value) { this._set(13, value); }
/* TypedList.of(Esiur.Data.Int16) */ get Int16Array() { return this._get(14); }
    set Int16Array(/* TypedList.of(Esiur.Data.Int16) */ value) { this._set(14, value); }
/* TypedList.of(Esiur.Data.Int32) */ get Int32Array() { return this._get(15); }
    set Int32Array(/* TypedList.of(Esiur.Data.Int32) */ value) { this._set(15, value); }
/* Esiur.Data.Int32 */ get Int32Prop() { return this._get(16); }
    set Int32Prop(/* Esiur.Data.Int32 */ value) { this._set(16, value); }
/* Esiur.Data.Int64 */ get Int64() { return this._get(17); }
    set Int64(/* Esiur.Data.Int64 */ value) { this._set(17, value); }
/* TypedList.of(Esiur.Data.Int64) */ get Int64Array() { return this._get(18); }
    set Int64Array(/* TypedList.of(Esiur.Data.Int64) */ value) { this._set(18, value); }
/* Esiur.Data.Int8 */ get Int8() { return this._get(19); }
    set Int8(/* Esiur.Data.Int8 */ value) { this._set(19, value); }
/* TypedList.of(Esiur.Data.Int8) */ get Int8Array() { return this._get(20); }
    set Int8Array(/* TypedList.of(Esiur.Data.Int8) */ value) { this._set(20, value); }
/* TypedList.of(Esiur.Data.Int32) */ get IntList() { return this._get(21); }
    set IntList(/* TypedList.of(Esiur.Data.Int32) */ value) { this._set(21, value); }
/* TypedMap.of(Esiur.Data.Int32,String) */ get IntStringMap() { return this._get(22); }
    set IntStringMap(/* TypedMap.of(Esiur.Data.Int32,String) */ value) { this._set(22, value); }
/* undefined */ get Me() { return this._get(23); }
    set Me(/* undefined */ value) { this._set(23, value); }
/* TypedList.of(Test_MyResource) */ get MyResources() { return this._get(24); }
    set MyResources(/* TypedList.of(Test_MyResource) */ value) { this._set(24, value); }
/* Object */ get Object() { return this._get(25); }
    set Object(/* Object */ value) { this._set(25, value); }
/* Esiur.Data.List */ get ObjectArray() { return this._get(26); }
    set ObjectArray(/* Esiur.Data.List */ value) { this._set(26, value); }
/* Esiur.Data.Int32 */ get PropertyContext() { return this._get(27); }
    set PropertyContext(/* Esiur.Data.Int32 */ value) { this._set(27, value); }
/* Test_MyRecord */ get Record() { return this._get(28); }
    set Record(/* Test_MyRecord */ value) { this._set(28, value); }
/* TypedList.of(Esiur.Data.IRecord) */ get RecordsArray() { return this._get(29); }
    set RecordsArray(/* TypedList.of(Esiur.Data.IRecord) */ value) { this._set(29, value); }
/* TypedList.of(Test_MyRecord) */ get RecordsList() { return this._get(30); }
    set RecordsList(/* TypedList.of(Test_MyRecord) */ value) { this._set(30, value); }
/* Test_MyResource */ get Resource() { return this._get(31); }
    set Resource(/* Test_MyResource */ value) { this._set(31, value); }
/* TypedList.of(Esiur.Resource.IResource) */ get Resources() { return this._get(32); }
    set Resources(/* TypedList.of(Esiur.Resource.IResource) */ value) { this._set(32, value); }
/* TypedList.of(String) */ get StringArray() { return this._get(33); }
    set StringArray(/* TypedList.of(String) */ value) { this._set(33, value); }
/* TypedMap.of(String,Object) */ get StringMap() { return this._get(34); }
    set StringMap(/* TypedMap.of(String,Object) */ value) { this._set(34, value); }
/* String */ get Text() { return this._get(35); }
    set Text(/* String */ value) { this._set(35, value); }
/* Date */ get Time() { return this._get(36); }
    set Time(/* Date */ value) { this._set(36, value); }
/* Esiur.Data.UInt16 */ get UInt16() { return this._get(37); }
    set UInt16(/* Esiur.Data.UInt16 */ value) { this._set(37, value); }
/* TypedList.of(Esiur.Data.UInt16) */ get UInt16Array() { return this._get(38); }
    set UInt16Array(/* TypedList.of(Esiur.Data.UInt16) */ value) { this._set(38, value); }
/* Esiur.Data.UInt32 */ get UInt32() { return this._get(39); }
    set UInt32(/* Esiur.Data.UInt32 */ value) { this._set(39, value); }
/* TypedList.of(Esiur.Data.UInt32) */ get UInt32Array() { return this._get(40); }
    set UInt32Array(/* TypedList.of(Esiur.Data.UInt32) */ value) { this._set(40, value); }
/* Esiur.Data.UInt64 */ get UInt64() { return this._get(41); }
    set UInt64(/* Esiur.Data.UInt64 */ value) { this._set(41, value); }
/* TypedList.of(Esiur.Data.UInt64) */ get UInt64Array() { return this._get(42); }
    set UInt64Array(/* TypedList.of(Esiur.Data.UInt64) */ value) { this._set(42, value); }
/* TypedList.of(Esiur.Data.UInt8) */ get UInt8Array() { return this._get(43); }
    set UInt8Array(/* TypedList.of(Esiur.Data.UInt8) */ value) { this._set(43, value); }
/* TypedList.of(Esiur.Data.Nullable.of(Esiur.Data.UInt8)) */ get UInt8ArrayNull() { return this._get(44); }
    set UInt8ArrayNull(/* TypedList.of(Esiur.Data.Nullable.of(Esiur.Data.UInt8)) */ value) { this._set(44, value); }
/* Esiur.Data.Nullable.of(Esiur.Data.UInt8) */ get UInt8Null() { return this._get(45); }
    set UInt8Null(/* Esiur.Data.Nullable.of(Esiur.Data.UInt8) */ value) { this._set(45, value); }
/* Esiur.Data.UInt8 */ get UInt8Test() { return this._get(46); }
    set UInt8Test(/* Esiur.Data.UInt8 */ value) { this._set(46, value); }

    static get template() {
        return new Esiur.Resource.Template.TemplateDescriber('Test', [
            new Esiur.Resource.Template.Prop('Boolean', Boolean, 'Boolean', null),
            new Esiur.Resource.Template.Prop('BooleanArray', TypedList.of(Boolean), 'Boolean[]', null),
            new Esiur.Resource.Template.Prop('Char16', String, 'Char', null),
            new Esiur.Resource.Template.Prop('Char16Array', TypedList.of(String), 'Char[]', null),
            new Esiur.Resource.Template.Prop('ChildRecord', Test_MyChildRecord, 'MyChildRecord', null),
            new Esiur.Resource.Template.Prop('ChildResource', Test_MyChildResource, 'MyChildResource', null),
            new Esiur.Resource.Template.Prop('Enum', Test_SizeEnum, 'SizeEnum', null),
            new Esiur.Resource.Template.Prop('Float128', Esiur.Data.Float128, 'Decimal', null),
            new Esiur.Resource.Template.Prop('Float128Array', TypedList.of(Esiur.Data.Float128), 'Decimal[]', null),
            new Esiur.Resource.Template.Prop('Float32', Esiur.Data.Float32, 'Single', null),
            new Esiur.Resource.Template.Prop('Float32Array', TypedList.of(Esiur.Data.Float32), 'Single[]', null),
            new Esiur.Resource.Template.Prop('Float64', Esiur.Data.Float64, 'Double', null),
            new Esiur.Resource.Template.Prop('Float64Array', TypedList.of(Esiur.Data.Float64), 'Double[]', null),
            new Esiur.Resource.Template.Prop('Int16', Esiur.Data.Int16, 'Int16', null),
            new Esiur.Resource.Template.Prop('Int16Array', TypedList.of(Esiur.Data.Int16), 'Int16[]', null),
            new Esiur.Resource.Template.Prop('Int32Array', TypedList.of(Esiur.Data.Int32), 'Int32[]', null),
            new Esiur.Resource.Template.Prop('Int32Prop', Esiur.Data.Int32, 'Int32', null),
            new Esiur.Resource.Template.Prop('Int64', Esiur.Data.Int64, 'Int64', null),
            new Esiur.Resource.Template.Prop('Int64Array', TypedList.of(Esiur.Data.Int64), 'Int64[]', null),
            new Esiur.Resource.Template.Prop('Int8', Esiur.Data.Int8, 'SByte', null),
            new Esiur.Resource.Template.Prop('Int8Array', TypedList.of(Esiur.Data.Int8), 'SByte[]', null),
            new Esiur.Resource.Template.Prop('IntList', TypedList.of(Esiur.Data.Int32), 'List`1', null),
            new Esiur.Resource.Template.Prop('IntStringMap', TypedMap.of(Esiur.Data.Int32, String), 'Map`2', null),
            new Esiur.Resource.Template.Prop('Me', undefined, 'MyService', null),
            new Esiur.Resource.Template.Prop('MyResources', TypedList.of(Test_MyResource), 'MyResource[]', null),
            new Esiur.Resource.Template.Prop('Object', Object, 'Object', null),
            new Esiur.Resource.Template.Prop('ObjectArray', Esiur.Data.List, 'Object[]', null),
            new Esiur.Resource.Template.Prop('PropertyContext', Esiur.Data.Int32, 'DistributedPropertyContext`1', null),
            new Esiur.Resource.Template.Prop('Record', Test_MyRecord, 'MyRecord', null),
            new Esiur.Resource.Template.Prop('RecordsArray', TypedList.of(Esiur.Data.IRecord), 'IRecord[]', null),
            new Esiur.Resource.Template.Prop('RecordsList', TypedList.of(Test_MyRecord), 'List`1', null),
            new Esiur.Resource.Template.Prop('Resource', Test_MyResource, 'MyResource', null),
            new Esiur.Resource.Template.Prop('Resources', TypedList.of(Esiur.Resource.IResource), 'IResource[]', null),
            new Esiur.Resource.Template.Prop('StringArray', TypedList.of(String), 'String[]', null),
            new Esiur.Resource.Template.Prop('StringMap', TypedMap.of(String, Object), 'Map`2', null),
            new Esiur.Resource.Template.Prop('Text', String, 'String', null),
            new Esiur.Resource.Template.Prop('Time', Date, 'DateTime', null),
            new Esiur.Resource.Template.Prop('UInt16', Esiur.Data.UInt16, 'UInt16', null),
            new Esiur.Resource.Template.Prop('UInt16Array', TypedList.of(Esiur.Data.UInt16), 'UInt16[]', null),
            new Esiur.Resource.Template.Prop('UInt32', Esiur.Data.UInt32, 'UInt32', null),
            new Esiur.Resource.Template.Prop('UInt32Array', TypedList.of(Esiur.Data.UInt32), 'UInt32[]', null),
            new Esiur.Resource.Template.Prop('UInt64', Esiur.Data.UInt64, 'UInt64', null),
            new Esiur.Resource.Template.Prop('UInt64Array', TypedList.of(Esiur.Data.UInt64), 'UInt64[]', null),
            new Esiur.Resource.Template.Prop('UInt8Array', TypedList.of(Esiur.Data.UInt8), 'Byte[]', null),
            new Esiur.Resource.Template.Prop('UInt8ArrayNull', TypedList.of(Esiur.Data.Nullable.of(Esiur.Data.UInt8)), 'Nullable`1[]', null),
            new Esiur.Resource.Template.Prop('UInt8Null', Esiur.Data.Nullable.of(Esiur.Data.UInt8), 'Nullable`1?', null),
            new Esiur.Resource.Template.Prop('UInt8Test', Esiur.Data.UInt8, 'Byte', null),
            new Esiur.Resource.Template.Func('AsyncHello', TypedList.of(Esiur.Data.Nullable.of(TypedMap.of(Esiur.Data.Int32, Esiur.Data.Nullable.of(String)))), [], '() -> AsyncReply`1'),
            new Esiur.Resource.Template.Func('Connection', Object, [new Esiur.Resource.Template.Arg('a1', Object, false), new Esiur.Resource.Template.Arg('a2', Esiur.Data.Int32, false)], '([Object] a1,[Int32] a2) -> Void'),
            new Esiur.Resource.Template.Func('ConnectionOptional', Object, [new Esiur.Resource.Template.Arg('a1', Object, false), new Esiur.Resource.Template.Arg('a2', Esiur.Data.Int32, false), new Esiur.Resource.Template.Arg('a3', String, true)], '([Object] a1,[Int32] a2,[String] a3) -> Void'),
            new Esiur.Resource.Template.Func('GetGenericRecord', Test_MyGenericRecordOfTest_MyResource, [], '() -> MyGenericRecord`1'),
            new Esiur.Resource.Template.Func('GetTuple2', Tuple.of(Object, Object), [new Esiur.Resource.Template.Arg('a1', Esiur.Data.Int32, false), new Esiur.Resource.Template.Arg('a2', String, false)], '([Int32] a1,[String] a2) -> ValueTuple`2'),
            new Esiur.Resource.Template.Func('GetTuple3', Tuple.of(Object, Object, Object), [new Esiur.Resource.Template.Arg('a1', Esiur.Data.Int32, false), new Esiur.Resource.Template.Arg('a2', String, false), new Esiur.Resource.Template.Arg('a3', Esiur.Data.Float64, false)], '([Int32] a1,[String] a2,[Double] a3) -> ValueTuple`3'),
            new Esiur.Resource.Template.Func('GetTuple4', Tuple.of(Object, Object, Object, Object), [new Esiur.Resource.Template.Arg('a1', Esiur.Data.Int32, false), new Esiur.Resource.Template.Arg('a2', String, false), new Esiur.Resource.Template.Arg('a3', Esiur.Data.Float64, false), new Esiur.Resource.Template.Arg('a4', Boolean, false)], '([Int32] a1,[String] a2,[Double] a3,[Boolean] a4) -> ValueTuple`4'),
            new Esiur.Resource.Template.Func('InvokeEvents', Object, [new Esiur.Resource.Template.Arg('msg', String, false)], '([String] msg) -> Void'),
            new Esiur.Resource.Template.Func('Optional', Esiur.Data.Float64, [new Esiur.Resource.Template.Arg('a1', Object, false), new Esiur.Resource.Template.Arg('a2', Esiur.Data.Int32, false), new Esiur.Resource.Template.Arg('a3', String, true), new Esiur.Resource.Template.Arg('a4', String, true)], '([Object] a1,[Int32] a2,[String] a3,[String] a4) -> Double'),
            new Esiur.Resource.Template.Func('SendRecord', Test_MyRecord, [new Esiur.Resource.Template.Arg('record', Test_MyRecord, false)], '([MyRecord] record) -> MyRecord'),
            new Esiur.Resource.Template.Func('staticFunction', String, [new Esiur.Resource.Template.Arg('name', String, false)], '([String] name) -> String'),
            new Esiur.Resource.Template.Func('Void', Object, [], '() -> Void'),
            new Esiur.Resource.Template.Evt('ArrayEvent', Esiur.Data.List, false, null),
            new Esiur.Resource.Template.Evt('StringEvent', String, false, null)],
            null, 0, null, Esiur.Data.Guid.parse('c4250e9a35c707e9280c7ff2f46d3654'), 'MyService');
    }
}
new Esiur.Resource.Template.TypeTemplate(MyService, true);
