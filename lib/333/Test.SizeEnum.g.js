import Test_MyService from './Test.MyService.g.js';
import Test_MyGenericRecordOfTest_MyResource from './Test.MyGenericRecordOfTest_MyResource.g.js';
import Test_MyResource from './Test.MyResource.g.js';
import Test_MyRecord from './Test.MyRecord.g.js';
import Test_MyChildRecord from './Test.MyChildRecord.g.js';
import Test_MyChildResource from './Test.MyChildResource.g.js';

class SizeEnum extends IEnum {
static SizeEnum Large = SizeEnum(0, 1, 'Large');
static SizeEnum Medium = SizeEnum(1, 0, 'Medium');
static SizeEnum Small = SizeEnum(2, -10, 'Small');
static SizeEnum XLarge = SizeEnum(3, 22, 'XLarge');
static SizeEnum xSmall = SizeEnum(4, -11, 'xSmall');

SizeEnum([int index = 0, value, String name = '']) : super(index, value, name);TemplateDescriber get template => TemplateDescriber('Test.SizeEnum', constants: [Const('Large', getTypeOf<undefined>(), 1, null), Const('Medium', getTypeOf<undefined>(), 0, null), Const('Small', getTypeOf<undefined>(), -10, null), Const('XLarge', getTypeOf<undefined>(), 22, null), Const('xSmall', getTypeOf<undefined>(), -11, null)], annotation: null);
}