'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _walletl = require('../sevice/walletl');

function _readOnlyError(name) {
  throw new Error('"' + name + '" is read-only');
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var _default = {
  namespace: 'wallet',
  state: {
    wallet: null,
    //通用钱包,税金现金余额
    loading: false,
    //列表加载状态
    totalPage: 0,
    //总条数,
    wallet_list: [],
    //通用钱包交易记录列表
    wallet_tax_list: [],
    //开票资金交易记录列表
    couponList: [],
    //优惠券列表
    couponCash: null,
    //优惠券余额
    isExpired: false,
  },
  //同步方法
  reducers: {
    //loading状态
    setLoading: function setLoading(state, action) {
      return _objectSpread({}, state, {
        loading: action.payload,
      });
    },
    //设置通用钱包,税金现金余额
    setWallet: function setWallet(state, action) {
      return _objectSpread({}, state, {
        wallet: action.payload,
      });
    },
    //通用钱包交易记录-列表
    set_list: function set_list(state, action) {
      var _action$payload = action.payload,
        data = _action$payload.data,
        total = _action$payload.total;
      return _objectSpread({}, state, {
        wallet_list: data,
        totalPage: total,
      });
    },
    //开票资金交易记录-列表
    set_tax_list: function set_tax_list(state, action) {
      var _action$payload2 = action.payload,
        data = _action$payload2.data,
        total = _action$payload2.total;
      return _objectSpread({}, state, {
        wallet_tax_list: data,
        totalPage: total,
      });
    },
    //设置优惠券列表
    setCouponList: function setCouponList(state, action) {
      return _objectSpread({}, state, {
        couponList: action.payload,
      });
    },
    //设置优惠券余额
    setCouponCash: function setCouponCash(state, action) {
      return _objectSpread({}, state, {
        couponCash: action.payload,
      });
    },
    setIsExpired: function setIsExpired(state, action) {
      return _objectSpread({}, state, {
        isExpired: action.payload,
      });
    },
  },
  //异步方法
  effects: {
    //获取通用钱包,税金现金余额
    getWalletModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getWalletModel(_ref, _ref2) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getWalletModel$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                value = _ref.value;
                (call = _ref2.call), (put = _ref2.put);
                _context.next = 4;
                return call(_walletl.getWallet, value);

              case 4:
                res = _context.sent;

                if (!(res.code == 0)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return put({
                  type: 'setWallet',
                  payload: res.data,
                });

              case 8:
                _context.next = 11;
                break;

              case 10:
                message.warning(res.msg);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, getWalletModel);
      }),
    //获取通用钱包交易记录列表
    getWalletListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getWalletListModel(_ref3, _ref4) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getWalletListModel$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                value = _ref3.value;
                (call = _ref4.call), (put = _ref4.put);
                _context2.next = 4;
                return put({
                  type: 'setLoading',
                  payload: true,
                });

              case 4:
                _context2.next = 6;
                return call(
                  _walletl.getWalletList,
                  value,
                  '/wallet/get_' + value.flag,
                );

              case 6:
                res = _context2.sent;

                if (!(res.code == 0)) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 10;
                return put({
                  type: 'setLoading',
                  payload: false,
                });

              case 10:
                _context2.next = 12;
                return put({
                  type: 'set_' + value.flag,
                  payload: res,
                });

              case 12:
                _context2.next = 15;
                break;

              case 14:
                message.warning(res.msg);

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, getWalletListModel);
      }),
    //转入开票资金-充值
    taxFundRechargeModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function taxFundRechargeModel(_ref5, _ref6) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function taxFundRechargeModel$(
          _context3,
        ) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                value = _ref5.value;
                (call = _ref6.call), (put = _ref6.put);
                _context3.next = 4;
                return call({
                  taxFundRecharge: _walletl.taxFundRecharge,
                  value: value,
                });

              case 4:
                res = _context3.sent;

                if (res.code == 0) {
                  message.success(res.msg || '恭喜您，充值成功！');
                } else {
                  message.warning(res.msg || '系统错误');
                }

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        },
        taxFundRechargeModel);
      }),
    //获取优惠券列表
    getCouponListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getCouponListModel(_ref7, _ref8) {
        var value, call, put, res, cashObj, i;
        return regeneratorRuntime.wrap(function getCouponListModel$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                value = _ref7.value;
                (call = _ref8.call), (put = _ref8.put);
                _context4.next = 4;
                return call(_walletl.getCouponList, value);

              case 4:
                res = _context4.sent;

                if (!(res.code == 0)) {
                  _context4.next = 25;
                  break;
                }

                if (!(res.data && res.data.length)) {
                  _context4.next = 23;
                  break;
                }

                _context4.next = 9;
                return put({
                  type: 'setCouponList',
                  payload: res.data,
                });

              case 9:
                cashObj = null;
                i = 0;

              case 11:
                if (!(i < res.data.length)) {
                  _context4.next = 21;
                  break;
                }

                if (!(res.data[i].is_valid == 0)) {
                  _context4.next = 14;
                  break;
                }

                return _context4.abrupt('continue', 18);

              case 14:
                cashObj +=
                  (_readOnlyError('cashObj'),
                  Number(
                    (res.data[i].real_amount * res.data[i].coupon_cnt) / 100,
                  ));

                if (!(res.data[i].will_expire == 1)) {
                  _context4.next = 18;
                  break;
                }

                _context4.next = 18;
                return put({
                  type: 'setIsExpired',
                  payload: true,
                });

              case 18:
                i++;
                _context4.next = 11;
                break;

              case 21:
                _context4.next = 23;
                return put({
                  type: 'setCouponCash',
                  payload: Number(cashObj),
                });

              case 23:
                _context4.next = 26;
                break;

              case 25:
                message.warning(res.msg || '系统错误');

              case 26:
              case 'end':
                return _context4.stop();
            }
          }
        }, getCouponListModel);
      }),
  },
  subscriptions: {
    setup: function setup(_ref9) {
      var dispatch = _ref9.dispatch,
        history = _ref9.history;
      return history.listen(function(_ref10) {
        var pathname = _ref10.pathname;

        if (pathname == '/wallet/index') {
          dispatch({
            type: 'getWalletModel',
          });
        }

        if (pathname == '/wallet/coupon') {
          dispatch({
            type: 'getCouponListModel',
          });
        }
      });
    },
  },
};
exports['default'] = _default;
