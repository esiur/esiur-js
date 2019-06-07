@echo off

del "build\esiur-debug.js"
del "build\esiur.js"

type "src\CustomResourceEvent.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\NetworkBuffer.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\AsyncException.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\Authentication.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\Session.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\DistributedPropertyContext.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\IPermissionsManager.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\KeyList.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\PropertyValue.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\IEventHandler.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\SHA256.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\IDestructible.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\AutoList.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\IResource.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\IStore.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\Structure.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\StructureArray.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\ResourceArray.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\MemberTemplate.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\AsyncReply.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\AsyncBag.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\AsyncQueue.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\BinaryList.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\Codec.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\DataConverter.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\DataType.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\DistributedConnection.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\DistributedResource.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\DistributedResourceQueueItem.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\EventTemplate.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\FunctionTemplate.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\Guid.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\IIPAuthPacket.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\IIPPacket.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\Instance.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
 
type "src\NotModified.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\PropertyTemplate.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\ResourceTemplate.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\SendList.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js
type "src\Warehouse.js" >> build\esiur-debug.js
echo.  >> build\esiur-debug.js

copy build\esiur-debug.js build\esiur-debug-node.js
type "module.js" >> build\esiur-debug-node.js
echo. >> build\esiur-debug-node.js

REM minify build/esiur-debug.js -o build/esiur.js
uglifyjs build/esiur-debug.js -c -o build/esiur.js
