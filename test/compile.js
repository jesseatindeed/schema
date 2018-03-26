var path = require('path'),
    schema = require('../');

module.exports.tests = {};

module.exports.tests.compile = function(test, common) {
  test('valid schema file', function(t) {
    t.equal(typeof schema, 'object', 'schema generated');
    t.equal(Object.keys(schema).length>0, true, 'schema has body');
    t.end();
  });
};

// admin indeces are explicitly specified in order to specify a custom
// dynamic_template and to avoid 'type not found' errors when deploying
// the api codebase against an index without admin data
module.exports.tests.indeces = function(test, common) {
  test('contains "record" type definition', function(t) {
    t.equal(typeof schema.mappings.record, 'object', 'mappings present');
    t.equal(schema.mappings.record.dynamic_templates[0].nameGram.mapping.analyzer, 'peliasIndexOneEdgeGram');
    t.end();
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('compile: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
