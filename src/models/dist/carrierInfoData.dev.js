'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _antd = require('antd');

var _carrierInfo = require('../sevice/carrierInfo');

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
    //承运人列表（全部或待处理）
    getCarrierListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getCarrierListModel(_ref, _ref2) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getCarrierListModel$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                value = _ref.value;
                (call = _ref2.call), (put = _ref2.put);
                _context.next = 4;
                return put({
                  type: 'setLoading',
                  payload: true,
                });

              case 4:
                _context.next = 6;
                return call(
                  _carrierInfo.getCarrierList,
                  value,
                  '/carrierInfo/' + value.flag,
                );

              case 6:
                res = _context.sent;

                if (!(res.code == 0)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 10;
                return put({
                  type: 'setLoading',
                  payload: false,
                });

              case 10:
                if (!(res.data && res.data.lists.length)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return put({
                  type: '_' + value.flag,
                  payload: res.data,
                });

              case 13:
                _context.next = 16;
                break;

              case 15:
                _antd.message.warning(res.msg || '系统错误');

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, getCarrierListModel);
      }),
    //删除或撤回承运人
    delOrRejectCarrierModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function delOrRejectCarrierModel(_ref3, _ref4) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function delOrRejectCarrierModel$(
          _context2,
        ) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                value = _ref3.value;
                (call = _ref4.call), (put = _ref4.put);
                _context2.next = 4;
                return call(_carrierInfo.delOrRejectCarrier, value, value.url);

              case 4:
                res = _context2.sent;

                if (!(res.code == 0)) {
                  _context2.next = 11;
                  break;
                }

                _antd.message.success(res.msg || '删除成功');

                _context2.next = 9;
                return put({
                  type: 'getCarrierListModel',
                  value: value,
                });

              case 9:
                _context2.next = 12;
                break;

              case 11:
                _antd.message.warning(res.msg || '系统错误');

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        },
        delOrRejectCarrierModel);
      }),
  },
  subscriptions: {},
};
exports['default'] = _default;
