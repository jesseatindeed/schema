var doc = require('./mappings/document');

var schema = {
  settings: require('./settings')(),
  mappings: {
    record: doc,
  }
};

module.exports = schema;
