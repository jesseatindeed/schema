// validate bounding box behaves as expected

var tape = require('tape'),
    elastictest = require('elastictest'),
    schema = require('../schema'),
    punctuation = require('../punctuation');

module.exports.tests = {};

module.exports.tests.index_and_retrieve = function(test, common){
  test( 'index and retrieve', function(t){

    var suite = new elastictest.Suite( null, { schema: schema } );
    suite.action( function( done ){ setTimeout( done, 500 ); }); // wait for es to bring some shards up

    // index a document with a bbox
    suite.action( function( done ){
      suite.client.index({
        index: suite.props.index,
        type: 'test',
        id: '1',
        body: {
          bounding_box: '{"min_lat":-47.75,"max_lat":-33.9,"min_lon":163.82,"max_lon":179.42}'
        }
      }, done);
    });

    // retrieve document by id
    suite.assert( function( done ) {
      suite.client.get(
        {
          index: suite.props.index,
          type: 'test',
          id: '1'
        },
        function (err, res) {
          t.equal(err, undefined);
          t.deepEqual(res._source.bounding_box, '{"min_lat":-47.75,"max_lat":-33.9,"min_lon":163.82,"max_lon":179.42}');
          done();
        }
      );
    });

    suite.run( t.end );
  });
};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('bounding box: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
};
