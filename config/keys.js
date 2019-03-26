if (process.env.NODE_ENV === 'rpdocution') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
