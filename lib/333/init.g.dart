import 'dart:async';
import 'package:esiur/esiur.dart';
import 'Test.MyService.g.js' as myservice;import 'Test.MyGenericRecordOfTest_MyResource.g.js' as mygenericrecordoftest_myresource;import 'Test.MyResource.g.js' as myresource;import 'Test.MyRecord.g.js' as myrecord;import 'Test.MyChildRecord.g.js' as mychildrecord;import 'Test.MyChildResource.g.js' as mychildresource;import 'Test.SizeEnum.g.js' as sizeenum;

 void init_333(){ 
  
  
  Warehouse.defineType<myservice.MyService>(() => myservice.MyService(), RepresentationType(RepresentationTypeIdentifier.TypedResource, false, Guid.parse('')));

Warehouse.defineType<mygenericrecordoftest_myresource.MyGenericRecordOfTest_MyResource>(() => mygenericrecordoftest_myresource.MyGenericRecordOfTest_MyResource(), RepresentationType(RepresentationTypeIdentifier.TypedRecord, false, Guid.parse('')));

Warehouse.defineType<myresource.MyResource>(() => myresource.MyResource(), RepresentationType(RepresentationTypeIdentifier.TypedResource, false, Guid.parse('')));

Warehouse.defineType<myrecord.MyRecord>(() => myrecord.MyRecord(), RepresentationType(RepresentationTypeIdentifier.TypedRecord, false, Guid.parse('')));

Warehouse.defineType<mychildrecord.MyChildRecord>(() => mychildrecord.MyChildRecord(), RepresentationType(RepresentationTypeIdentifier.TypedRecord, false, Guid.parse('')));

Warehouse.defineType<mychildresource.MyChildResource>(() => mychildresource.MyChildResource(), RepresentationType(RepresentationTypeIdentifier.TypedResource, false, Guid.parse('')));

Warehouse.defineType<sizeenum.SizeEnum>(() => sizeenum.SizeEnum(), RepresentationType(RepresentationTypeIdentifier.Enum, false, Guid.parse('')));
 
 Esiur.Resource.Warehouse.putTemplate(Esiur.Resource.Template.TypeTemplate.fromType(myservice.MyService));

 
Warehouse.putTemplate(TypeTemplate.fromType(mygenericrecordoftest_myresource.MyGenericRecordOfTest_MyResource));
Warehouse.putTemplate(TypeTemplate.fromType(myresource.MyResource));
Warehouse.putTemplate(TypeTemplate.fromType(myrecord.MyRecord));
Warehouse.putTemplate(TypeTemplate.fromType(mychildrecord.MyChildRecord));
Warehouse.putTemplate(TypeTemplate.fromType(mychildresource.MyChildResource));
Warehouse.putTemplate(TypeTemplate.fromType(sizeenum.SizeEnum));}