/* */ 
var $ = require('./_'),
    has = require('./_has'),
    $export = require('./_export'),
    isObject = require('./_is-object'),
    anObject = require('./_an-object');
function get(target, propertyKey) {
  var receiver = arguments.length < 3 ? target : arguments[2],
      desc,
      proto;
  if (anObject(target) === receiver)
    return target[propertyKey];
  if (desc = $.getDesc(target, propertyKey))
    return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
  if (isObject(proto = $.getProto(target)))
    return get(proto, propertyKey, receiver);
}
$export($export.S, 'Reflect', {get: get});
