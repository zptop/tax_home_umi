'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _antd = require('antd');

var _carrierInfo = require('../sevice/carrierInfo');

var _ocr = require('../util/ocr');

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
  namespace: 'carrierInfo',
  state: {
    c_getCarrierList: [],
    //承运人列表(全部)
    c_getWaitCarrierList: [],
    //承运人列表(待处理)
    loading: false,
    //列表加载状态
    totalNum: 0, //总条数,
  },
  reducers: {
    //loading状态
    setLoading: function setLoading(state, action) {
      return _objectSpread({}, state, {
        loading: action.payload,
      });
    },
    //承运人列表
    _getCarrierList: function _getCarrierList(state, action) {
      var _action$payload = action.payload,
        lists = _action$payload.lists,
        totalNum = _action$payload.totalNum;
      return _objectSpread({}, state, {
        c_getCarrierList: lists,
        totalNum: totalNum,
      });
    },
    _getWaitCarrierList: function _getWaitCarrierList(state, action) {
      var _action$payload2 = action.payload,
        lists = _action$payload2.lists,
        totalNum = _action$payload2.totalNum;
      return _objectSpread({}, state, {
        c_getWaitCarrierList: lists,
        totalNum: totalNum,
      });
    },
  },
  effects: {
    //ocr识别
    scanIdCardModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function scanIdCardModel(_ref, _ref2) {
        var value, callback, call, put, res;
        return regeneratorRuntime.wrap(function scanIdCardModel$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (value = _ref.value), (callback = _ref.callback);
                (call = _ref2.call), (put = _ref2.put);
                _context.next = 4;
                return call(_ocr.scanIdCard, value, value.scanUrl);

              case 4:
                res = _context.sent;
                return _context.abrupt('return', res);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, scanIdCardModel);
      }),
    //承运人列表（全部或待处理）
    getCarrierListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getCarrierListModel(_ref3, _ref4) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getCarrierListModel$(
          _context2,
        ) {
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
                  _carrierInfo.getCarrierList,
                  value,
                  '/carrierInfo/' + value.flag,
                );

              case 6:
                res = _context2.sent;

                if (!(res.code == 0)) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 10;
                return put({
                  type: 'setLoading',
                  payload: false,
                });

              case 10:
                if (!(res.data && res.data.lists.length)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 13;
                return put({
                  type: '_' + value.flag,
                  payload: res.data,
                });

              case 13:
                _context2.next = 16;
                break;

              case 15:
                _antd.message.warning(res.msg || '系统错误');

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        },
        getCarrierListModel);
      }),
    //删除或撤回承运人
    delOrRejectCarrierModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function delOrRejectCarrierModel(_ref5, _ref6) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function delOrRejectCarrierModel$(
          _context3,
        ) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                value = _ref5.value;
                (call = _ref6.call), (put = _ref6.put);
                _context3.next = 4;
                return call(_carrierInfo.delOrRejectCarrier, value, value.url);

              case 4:
                res = _context3.sent;

                if (!(res.code == 0)) {
                  _context3.next = 11;
                  break;
                }

                _antd.message.success(res.msg || '删除成功');

                _context3.next = 9;
                return put({
                  type: 'getCarrierListModel',
                  value: value,
                });

              case 9:
                _context3.next = 12;
                break;

              case 11:
                _antd.message.warning(res.msg || '系统错误');

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        },
        delOrRejectCarrierModel);
      }),
    //获取承运人详情
    getCarrierInfoModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getCarrierInfoModel(_ref7, _ref8) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getCarrierInfoModel$(
          _context4,
        ) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                value = _ref7.value;
                (call = _ref8.call), (put = _ref8.put);
                _context4.next = 4;
                return call(_carrierInfo.getCarrierInfo, value);

              case 4:
                res = _context4.sent;
                return _context4.abrupt('return', res);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        },
        getCarrierInfoModel);
      }),
    //获取司机详情
    getDriverInfoModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getDriverInfoModel(_ref9, _ref10) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getDriverInfoModel$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                value = _ref9.value;
                (call = _ref10.call), (put = _ref10.put);
                _context5.next = 4;
                return call(_carrierInfo.getDriverInfo, value);

              case 4:
                res = _context5.sent;
                return _context5.abrupt('return', res);

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, getDriverInfoModel);
      }),
    //新增车队老板
    addCarrierBossModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function addCarrierBossModel(_ref11, _ref12) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function addCarrierBossModel$(
          _context6,
        ) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                value = _ref11.value;
                (call = _ref12.call), (put = _ref12.put);
                _context6.next = 4;
                return call(_carrierInfo.addCarrierBoss, value);

              case 4:
                res = _context6.sent;
                return _context6.abrupt('return', res);

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        },
        addCarrierBossModel);
      }),
  },
  subscriptions: {},
};
exports['default'] = _default;
