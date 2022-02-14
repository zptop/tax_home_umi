'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getWallet = getWallet;
exports.getWalletList = getWalletList;

var _request = _interopRequireDefault(require('../util/request'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

//获取通用钱包和开票资金额度
function getWallet(params) {
  return regeneratorRuntime.async(function getWallet$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          return _context.abrupt(
            'return',
            (0, _request['default'])('/wallet/get_wallet', {
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
} //通用钱包交易记录,开票资金交易记录

function getWalletList(params, url) {
  return regeneratorRuntime.async(function getWalletList$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          return _context2.abrupt(
            'return',
            (0, _request['default'])(url, {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  });
}
