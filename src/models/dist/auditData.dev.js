'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _antd = require('antd');

var _audit = require('../sevice/audit');

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
  namespace: 'audit',
  state: {
    audit_wait_list: [],
    //列表
    audit_finish_list: [],
    //列表
    audit_special_list: [],
    //列表
    loading: false,
    //列表加载状态
    totalPage: 0,
    //总页数,
    audit_history_list: [],
    //付款申请跟踪列表
    selectedRowKeys: [],
    //选中的申请单编号
    remarkModal: false, //不通过原因弹框
  },
  reducers: {
    //loading状态
    setLoading: function setLoading(state, action) {
      return _objectSpread({}, state, {
        loading: action.payload,
      });
    },
    //列表
    set_wait_list: function set_wait_list(state, action) {
      var _action$payload = action.payload,
        data = _action$payload.data,
        total = _action$payload.total;
      return _objectSpread({}, state, {
        audit_wait_list: data,
        totalPage: total,
      });
    },
    set_finish_list: function set_finish_list(state, action) {
      var _action$payload2 = action.payload,
        data = _action$payload2.data,
        total = _action$payload2.total;
      return _objectSpread({}, state, {
        audit_finish_list: data,
        totalPage: total,
      });
    },
    set_special_list: function set_special_list(state, action) {
      var _action$payload3 = action.payload,
        data = _action$payload3.data,
        total = _action$payload3.total;
      return _objectSpread({}, state, {
        audit_special_list: data,
        totalPage: total,
      });
    },
    set_history_list: function set_history_list(state, action) {
      var _action$payload4 = action.payload,
        data = _action$payload4.data,
        total = _action$payload4.total;
      return _objectSpread({}, state, {
        audit_history_list: data,
        totalPage: total,
      });
    },
    setSelectedRowKeys: function setSelectedRowKeys(state, action) {
      return _objectSpread({}, state, {
        selectedRowKeys: action.payload,
      });
    },
    setRemarkModal: function setRemarkModal(state, action) {
      return _objectSpread({}, state, {
        remarkModal: action.payload,
      });
    },
  },
  effects: {
    //付款申请申批列表
    getPaymentRequestListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getPaymentRequestListModel(_ref, _ref2) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getPaymentRequestListModel$(
          _context,
        ) {
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
                  _audit.paymentRequestList,
                  value,
                  '/apply/' + value.flag,
                );

              case 6:
                res = _context.sent;
                _context.next = 9;
                return put({
                  type: 'set_' + value.flag,
                  payload: {
                    data: [],
                  },
                });

              case 9:
                if (!(res.code == 0)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 12;
                return put({
                  type: 'setLoading',
                  payload: false,
                });

              case 12:
                if (!(res.data && res.data.length)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 15;
                return put({
                  type: 'set_' + value.flag,
                  payload: _objectSpread({}, res),
                });

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        },
        getPaymentRequestListModel);
      }),
    //付款申请跟踪列表
    paymentHistoryListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function paymentHistoryListModel(_ref3, _ref4) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function paymentHistoryListModel$(
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
                return call(_audit.paymentHistoryList, value);

              case 6:
                res = _context2.sent;

                if (!(res.code == 0)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 10;
                return put({
                  type: 'setLoading',
                  payload: false,
                });

              case 10:
                if (!(res.data && res.data.length)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 13;
                return put({
                  type: 'set_history_list',
                  payload: res,
                });

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        },
        paymentHistoryListModel);
      }),
    //付款申请跟踪审核
    handleAuditModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function handleAuditModel(_ref5, _ref6) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function handleAuditModel$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                value = _ref5.value;
                (call = _ref6.call), (put = _ref6.put);
                _context3.next = 4;
                return call(_audit.auditUpdate, value);

              case 4:
                res = _context3.sent;

                if (!(res.code == 0)) {
                  _context3.next = 13;
                  break;
                }

                _antd.message.success(res.msg || '操作成功');

                _context3.next = 9;
                return put({
                  type: 'setSelectedRowKeys',
                  payload: [],
                });

              case 9:
                _context3.next = 11;
                return put({
                  type: 'setRemarkModal',
                  payload: false,
                });

              case 11:
                _context3.next = 14;
                break;

              case 13:
                _antd.message.warning(res.msg || '操作失败');

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, handleAuditModel);
      }),
    //设置选中的行数
    setSelectedRowKeysModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function setSelectedRowKeysModel(_ref7, _ref8) {
        var value, call, put;
        return regeneratorRuntime.wrap(function setSelectedRowKeysModel$(
          _context4,
        ) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                value = _ref7.value;
                (call = _ref8.call), (put = _ref8.put);
                _context4.next = 4;
                return put({
                  type: 'setSelectedRowKeys',
                  payload: value,
                });

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        },
        setSelectedRowKeysModel);
      }),
    //打开或关闭--审核不通过原因弹框
    setRemarkModalModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function setRemarkModalModel(_ref9, _ref10) {
        var value, call, put;
        return regeneratorRuntime.wrap(function setRemarkModalModel$(
          _context5,
        ) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                value = _ref9.value;
                (call = _ref10.call), (put = _ref10.put);
                _context5.next = 4;
                return put({
                  type: 'setRemarkModal',
                  payload: value,
                });

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        },
        setRemarkModalModel);
      }),
  },
  subscriptions: {},
};
exports['default'] = _default;
