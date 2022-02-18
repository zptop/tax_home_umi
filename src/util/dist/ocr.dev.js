'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.scanIdCard = scanIdCard;

var _request = _interopRequireDefault(require('./request'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function scanIdCard(params, url) {
  return regeneratorRuntime.async(function scanIdCard$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          return _context.abrupt(
            'return',
            (0, _request['default'])(url, {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  });
}
