'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _antd = require('antd');

var _waybill = require('../sevice/waybill');

var _tools = require('../util/tools');

var _umi = require('umi');

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
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

var confirm = _antd.Modal.confirm;
var _default = {
  namespace: 'waybill',
  state: {
    waybillList: [],
    totalPage: 0,
    //?????????
    total_wait_amount: 0,
    //?????????????????????
    total_labour_amount: 0,
    //??????????????????
    loading: false,
    //??????????????????
    waybill_load_place: [],
    //????????????????????????
    waybill_consi_info: [],
    //?????????????????????
    searchData: null,
    //?????????????????????????????????
    searchShow: false,
    //????????????????????????????????????
    okButtonDisabledModel: true,
    //?????????????????????????????????
    newPayerList: [],
    //??????????????????????????????????????????
    payeeInfo: {},
    //???????????????????????????
    waybillNoInfo: {},
    //?????????????????????????????????
    payMentFlowList: [],
    //?????????????????????????????????
    payChannelArr: [],
    //??????????????????
    isNoRequiredModalVisible: false,
    //?????????????????????????????????????????????
    contractData: '',
    //??????????????????
    elecContractFlag: false,
    //??????????????????
    batchImportList: [],
    //????????????????????????
    batch_loading: false,
    //????????????????????????loading
    batchTtotalPage: 0,
    //????????????????????????totalPage
    exportImportList: [],
    //??????????????????
    export_loading: false,
    //??????????????????loading
    exportTtotalPage: 0,
    //??????????????????totalPage
    payeeList: [],
    //??????????????????????????????
    applyRecordList: [],
    //?????????????????????????????????
    getBtnText: '???????????????',
    //????????????
    is_sms_disabled: false,
    //????????????,???????????????????????????
    payObjInfo: {}, //??????????????????????????????
  },
  //???????????????????????????
  reducers: {
    setWaybillList: function setWaybillList(state, result) {
      var obj = result.data;
      return _objectSpread({}, state, {
        waybillList: obj.data,
        totalPage: obj.total,
        total_wait_amount: obj.total_wait_amount,
        total_labour_amount: obj.total_labour_amount,
      });
    },
    setLoading: function setLoading(state, action) {
      return _objectSpread({}, state, {
        loading: action.payload,
      });
    },
    setCommonInfo: function setCommonInfo(state, result) {
      return _objectSpread({}, state, {
        waybill_load_place: result.data.data.waybill_load_place,
        waybill_consi_info: result.data.data.waybill_consi_info,
      });
    },
    setSearchData: function setSearchData(state, action) {
      return _objectSpread({}, state, {
        searchData: action.payload,
      });
    },
    setSearchShow: function setSearchShow(state, action) {
      return _objectSpread({}, state, {
        searchShow: action.payload,
      });
    },
    setNewPayerList: function setNewPayerList(state, action) {
      return _objectSpread({}, state, {
        newPayerList:
          action.payload == 'empty'
            ? []
            : [].concat(_toConsumableArray(state.newPayerList), [
                action.payload,
              ]),
      });
    },
    setPayeeInfo: function setPayeeInfo(state, action) {
      return _objectSpread({}, state, {
        payeeInfo: action.payload,
      });
    },
    setWaybillNoInfo: function setWaybillNoInfo(state, action) {
      return _objectSpread({}, state, {
        waybillNoInfo: action.payload,
      });
    },
    setPayMentFlowList: function setPayMentFlowList(state, action) {
      return _objectSpread({}, state, {
        payMentFlowList: action.payload,
      });
    },
    setPayChannelArr: function setPayChannelArr(state, action) {
      return _objectSpread({}, state, {
        payChannelArr: action.payload,
      });
    },
    setIsNoRequiredModalVisible: function setIsNoRequiredModalVisible(state) {
      return _objectSpread({}, state, {
        isNoRequiredModalVisible: false,
      });
    },
    setContractPic: function setContractPic(state, action) {
      return _objectSpread({}, state, {
        contractData: action.payload,
      });
    },
    setBatchLoadingTrue: function setBatchLoadingTrue(state) {
      return _objectSpread({}, state, {
        batch_loading: true,
      });
    },
    setBatchLoadingFalse: function setBatchLoadingFalse(state) {
      return _objectSpread({}, state, {
        batch_loading: false,
      });
    },
    setBatchImportList: function setBatchImportList(state, action) {
      return _objectSpread({}, state, {
        batchImportList: action.payload.data,
        batchTtotalPage: action.payload.total,
      });
    },
    setExportLoadingTrue: function setExportLoadingTrue(state) {
      return _objectSpread({}, state, {
        export_loading: true,
      });
    },
    setExportLoadingFalse: function setExportLoadingFalse(state) {
      return _objectSpread({}, state, {
        export_loading: false,
      });
    },
    setExportImportList: function setExportImportList(state, action) {
      return _objectSpread({}, state, {
        exportImportList: action.payload.data,
        exportTtotalPage: action.payload.total,
      });
    },
    setPayeeList: function setPayeeList(state, action) {
      return _objectSpread({}, state, {
        payeeList: action.payload,
      });
    },
    setApplyRecordList: function setApplyRecordList(state, action) {
      return _objectSpread({}, state, {
        applyRecordList: action.payload,
      });
    },
    setIsSmsDisabled: function setIsSmsDisabled(state, action) {
      return _objectSpread({}, state, {
        is_sms_disabled: action.payload,
      });
    },
    setGetBtnText: function setGetBtnText(state, action) {
      return _objectSpread({}, state, {
        getBtnText: action.payload,
      });
    },
    setPayObjInfo: function setPayObjInfo(state, action) {
      return _objectSpread({}, state, {
        payObjInfo: action.payload,
      });
    },
  },
  // ????????????????????????
  effects: {
    //??????????????????
    getWaybillListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getWaybillListModel(_ref, _ref2) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getWaybillListModel$(_context) {
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
                  _waybill.getWaybillList,
                  value,
                  value.transportType == 1 ? '/Car/get_list' : '/Ship/get_list',
                );

              case 6:
                res = _context.sent;

                if (!(res.code == 0)) {
                  _context.next = 14;
                  break;
                }

                _context.next = 10;
                return put({
                  type: 'setLoading',
                  payload: false,
                });

              case 10:
                _context.next = 12;
                return put({
                  type: 'setWaybillList',
                  data: res,
                });

              case 12:
                _context.next = 15;
                break;

              case 14:
                _antd.message.warning(res.msg);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, getWaybillListModel);
      }),
    //????????????
    submitFormModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function submitFormModel(_ref3, _ref4) {
        var value, call, put, url, res;
        return regeneratorRuntime.wrap(function submitFormModel$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                value = _ref3.value;
                (call = _ref4.call), (put = _ref4.put);
                url = null;

                if (value.transport_type == 1) {
                  if (
                    value.title.includes('??????') ||
                    value.title.includes('??????')
                  ) {
                    url = '/car/addnew';
                  } else {
                    url = '/car/update';
                  }
                } else {
                  if (
                    value.title.includes('??????') ||
                    value.title.includes('??????')
                  ) {
                    url = '/ship/addnew';
                  } else {
                    url = '/ship/update';
                  }
                }

                _context2.next = 6;
                return call(_waybill.submitForm, value, url);

              case 6:
                res = _context2.sent;

                if (res.code == 0) {
                  _antd.message.success(res.msg || '????????????');
                } else {
                  _antd.message.warning(res.msg);
                }

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, submitFormModel);
      }),
    //??????-??????????????????
    getWaybillDetailModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getWaybillDetailModel(_ref5, _ref6) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getWaybillDetailModel$(
          _context3,
        ) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                value = _ref5.value;
                (call = _ref6.call), (put = _ref6.put);
                _context3.next = 4;
                return call(_waybill.getWaybillDetail, value);

              case 4:
                res = _context3.sent;

                if (!(res.code == 0)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 8;
                return put({
                  type: 'setWaybillNoInfo',
                  payload: res.data,
                });

              case 8:
                _context3.next = 11;
                break;

              case 10:
                _antd.message.warning(res.msg || '????????????');

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        },
        getWaybillDetailModel);
      }),
    //????????????--?????????????????????????????????
    getPayinfoListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getPayinfoListModel(_ref7, _ref8) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getPayinfoListModel$(
          _context4,
        ) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                value = _ref7.value;
                (call = _ref8.call), (put = _ref8.put);
                _context4.next = 4;
                return call(
                  _waybill.getPayinfoList,
                  value,
                  value.paymentrequired != 1
                    ? '/payinfo/getPayinfoList'
                    : '/waybill/get_apply_list',
                );

              case 4:
                res = _context4.sent;

                if (!(res.code == 0)) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 8;
                return put({
                  type: 'setPayMentFlowList',
                  payload: res.data,
                });

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        },
        getPayinfoListModel);
      }),
    //????????????????????????
    getCommonInfoModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getCommonInfoModel(_ref9, _ref10) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getCommonInfoModel$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                value = _ref9.value;
                (call = _ref10.call), (put = _ref10.put);
                _context5.next = 4;
                return call(_waybill.getCommonInfo, value);

              case 4:
                res = _context5.sent;

                if (!(res.code == 0)) {
                  _context5.next = 10;
                  break;
                }

                _context5.next = 8;
                return put({
                  type: 'setCommonInfo',
                  data: res,
                });

              case 8:
                _context5.next = 11;
                break;

              case 10:
                if (res.code == 956322) {
                  _umi.history.push('/login');
                } else {
                  _antd.message.warning(res.msg);
                }

              case 11:
              case 'end':
                return _context5.stop();
            }
          }
        }, getCommonInfoModel);
      }),
    //????????????????????????????????????
    getSearchFromMobileModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getSearchFromMobileModel(
        _ref11,
        _ref12,
      ) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getSearchFromMobileModel$(
          _context6,
        ) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                value = _ref11.value;
                (call = _ref12.call), (put = _ref12.put);

                if (
                  !(
                    value.carrier_mobile == '' ||
                    !/^1[3456789]\d{9}$/.test(value.carrier_mobile)
                  )
                ) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 5;
                return put({
                  type: 'setSearchShow',
                  payload: false,
                });

              case 5:
                return _context6.abrupt('return');

              case 6:
                _context6.next = 8;
                return call(_waybill.getSearchFromMobile, value);

              case 8:
                res = _context6.sent;

                if (!(res.code == 0)) {
                  _context6.next = 16;
                  break;
                }

                _context6.next = 12;
                return put({
                  type: 'setSearchData',
                  payload: res.data,
                });

              case 12:
                _context6.next = 14;
                return put({
                  type: 'setSearchShow',
                  payload: true,
                });

              case 14:
                _context6.next = 19;
                break;

              case 16:
                _context6.next = 18;
                return put({
                  type: 'setSearchShow',
                  payload: false,
                });

              case 18:
                _antd.message.warning(res.msg);

              case 19:
              case 'end':
                return _context6.stop();
            }
          }
        },
        getSearchFromMobileModel);
      }),
    //?????????????????????-??????????????????
    setNewPayerListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function setNewPayerListModel(_ref13, _ref14) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function setNewPayerListModel$(
          _context7,
        ) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                value = _ref13.value;
                (call = _ref14.call), (put = _ref14.put);

                if (/^1[3456789]\d{9}$/.test(value.mobile)) {
                  _context7.next = 4;
                  break;
                }

                return _context7.abrupt('return');

              case 4:
                _context7.next = 6;
                return call(_waybill.getAddNewPayer, value);

              case 6:
                res = _context7.sent;
                _context7.next = 9;
                return put({
                  type: 'setNewPayerList',
                  payload: 'empty',
                });

              case 9:
                if (!(res.code == 0)) {
                  _context7.next = 14;
                  break;
                }

                _context7.next = 12;
                return put({
                  type: 'setNewPayerList',
                  payload: res.data,
                });

              case 12:
                _context7.next = 15;
                break;

              case 14:
                _antd.message.warning(res.msg);

              case 15:
              case 'end':
                return _context7.stop();
            }
          }
        },
        setNewPayerListModel);
      }),
    //???????????????????????????
    addpayeeModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function addpayeeModel(_ref15, _ref16) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function addpayeeModel$(_context8) {
          while (1) {
            switch ((_context8.prev = _context8.next)) {
              case 0:
                value = _ref15.value;
                (call = _ref16.call), (put = _ref16.put);
                _context8.next = 4;
                return call(_waybill.addpayee, value);

              case 4:
                res = _context8.sent;

                if (!(res.code == 0)) {
                  _context8.next = 10;
                  break;
                }

                _context8.next = 8;
                return put({
                  type: 'getPayeeListModel',
                  value: value,
                });

              case 8:
                _context8.next = 11;
                break;

              case 10:
                _antd.message.warning(res.msg || '????????????');

              case 11:
              case 'end':
                return _context8.stop();
            }
          }
        }, addpayeeModel);
      }),
    //??????????????????????????????
    getPayeeListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getPayeeListModel(_ref17, _ref18) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getPayeeListModel$(_context9) {
          while (1) {
            switch ((_context9.prev = _context9.next)) {
              case 0:
                value = _ref17.value;
                (call = _ref18.call), (put = _ref18.put);
                _context9.next = 4;
                return call(_waybill.getPayeeList, {
                  waybill_no: value.waybill_no,
                });

              case 4:
                res = _context9.sent;

                if (!(res.code == 0)) {
                  _context9.next = 10;
                  break;
                }

                _context9.next = 8;
                return put({
                  type: 'setPayeeInfo',
                  payload: res.data[0],
                });

              case 8:
                _context9.next = 12;
                break;

              case 10:
                _context9.next = 12;
                return put({
                  type: 'setPayeeInfo',
                  payload: {
                    payee_name: '',
                    payee_uin: '',
                  },
                });

              case 12:
              case 'end':
                return _context9.stop();
            }
          }
        }, getPayeeListModel);
      }),
    //???????????????????????????
    getRemovePayeeModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getRemovePayeeModel(_ref19, _ref20) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getRemovePayeeModel$(
          _context10,
        ) {
          while (1) {
            switch ((_context10.prev = _context10.next)) {
              case 0:
                value = _ref19.value;
                (call = _ref20.call), (put = _ref20.put);

                if (!value.payee_id) {
                  _context10.next = 15;
                  break;
                }

                _context10.next = 5;
                return call(_waybill.getRemovePayee, value);

              case 5:
                res = _context10.sent;

                if (!(res.code == 0)) {
                  _context10.next = 12;
                  break;
                }

                _antd.message.success(res.msg || '????????????');

                _context10.next = 10;
                return put({
                  type: 'setPayeeInfo',
                  payload: {
                    payee_name: '',
                    payee_uin: '',
                  },
                });

              case 10:
                _context10.next = 13;
                break;

              case 12:
                _antd.message.error(res.msg || '????????????');

              case 13:
                _context10.next = 19;
                break;

              case 15:
                _context10.next = 17;
                return put({
                  type: 'setNewPayerList',
                  payload: 'empty',
                });

              case 17:
                _context10.next = 19;
                return put({
                  type: 'setPayeeInfo',
                  payload: {
                    payee_name: '',
                    payee_uin: '',
                  },
                });

              case 19:
              case 'end':
                return _context10.stop();
            }
          }
        },
        getRemovePayeeModel);
      }),
    //??????????????????
    delImgFromWaybillModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function delImgFromWaybillModel(_ref21, _ref22) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function delImgFromWaybillModel$(
          _context11,
        ) {
          while (1) {
            switch ((_context11.prev = _context11.next)) {
              case 0:
                value = _ref21.value;
                (call = _ref22.call), (put = _ref22.put);
                _context11.next = 4;
                return call(_waybill.delImgFromWaybill, value);

              case 4:
                res = _context11.sent;
                return _context11.abrupt('return', res);

              case 6:
              case 'end':
                return _context11.stop();
            }
          }
        },
        delImgFromWaybillModel);
      }),
    //??????????????????
    delImgFromVehicleModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function delImgFromVehicleModel(_ref23, _ref24) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function delImgFromVehicleModel$(
          _context12,
        ) {
          while (1) {
            switch ((_context12.prev = _context12.next)) {
              case 0:
                value = _ref23.value;
                (call = _ref24.call), (put = _ref24.put);
                _context12.next = 4;
                return call(_waybill.delImgFromVehicle, value);

              case 4:
                res = _context12.sent;

                if (res.code == 0) {
                  console.log('????????????-????????????');
                } else {
                  _antd.message.warning(res.msg || '????????????');
                }

              case 6:
              case 'end':
                return _context12.stop();
            }
          }
        },
        delImgFromVehicleModel);
      }),
    //????????????-?????????????????????
    uploadNoRequiredSubmitModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function uploadNoRequiredSubmitModel(
        _ref25,
        _ref26,
      ) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function uploadNoRequiredSubmitModel$(
          _context13,
        ) {
          while (1) {
            switch ((_context13.prev = _context13.next)) {
              case 0:
                value = _ref25.value;
                (call = _ref26.call), (put = _ref26.put);
                _context13.next = 4;
                return call(
                  _waybill.uploadNoRequiredSubmit,
                  value,
                  value.transportType == 1
                    ? '/car/update_trade'
                    : '/ship/update_trade',
                );

              case 4:
                res = _context13.sent;

                if (!(res.code == 0)) {
                  _context13.next = 11;
                  break;
                }

                _antd.message.success('????????????');

                _context13.next = 9;
                return put({
                  type: 'setIsNoRequiredModalVisible',
                });

              case 9:
                _context13.next = 12;
                break;

              case 11:
                _antd.message.warning(res.msg || '????????????');

              case 12:
              case 'end':
                return _context13.stop();
            }
          }
        },
        uploadNoRequiredSubmitModel);
      }),
    //??????????????????
    getPayChannelModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getPayChannelModel(_ref27, _ref28) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getPayChannelModel$(
          _context14,
        ) {
          while (1) {
            switch ((_context14.prev = _context14.next)) {
              case 0:
                value = _ref27.value;
                (call = _ref28.call), (put = _ref28.put);
                _context14.next = 4;
                return call(_waybill.getPayChannel, value);

              case 4:
                res = _context14.sent;

                if (!(res.code == 0)) {
                  _context14.next = 8;
                  break;
                }

                _context14.next = 8;
                return put({
                  type: 'setPayChannelArr',
                  payload: res.data,
                });

              case 8:
              case 'end':
                return _context14.stop();
            }
          }
        },
        getPayChannelModel);
      }),
    //??????????????????
    getContractModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getContractModel(_ref29, _ref30) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getContractModel$(_context15) {
          while (1) {
            switch ((_context15.prev = _context15.next)) {
              case 0:
                value = _ref29.value;
                (call = _ref30.call), (put = _ref30.put);
                _context15.next = 4;
                return call(_waybill.getContract, value);

              case 4:
                res = _context15.sent;

                if (!(res.code == 0)) {
                  _context15.next = 8;
                  break;
                }

                _context15.next = 8;
                return put({
                  type: 'setContractPic',
                  payload: res.data,
                });

              case 8:
              case 'end':
                return _context15.stop();
            }
          }
        }, getContractModel);
      }),
    //??????????????????
    //yield call????????????????????????????????????store.runSaga?????????
    sureContractModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function sureContractModel(_ref31, _ref32) {
        var value, call, put, store;
        return regeneratorRuntime.wrap(function sureContractModel$(_context17) {
          while (1) {
            switch ((_context17.prev = _context17.next)) {
              case 0:
                value = _ref31.value;
                (call = _ref32.call), (put = _ref32.put);
                store = (0, _umi.getDvaApp)()._store;
                confirm({
                  title: '??????',
                  content: '?????????????????????????????????????????????????????????????????????',
                  okText: '?????????????????????',
                  cancelText: '??????',
                  onOk: function onOk() {
                    store.runSaga(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee() {
                        var res;
                        return regeneratorRuntime.wrap(function _callee$(
                          _context16,
                        ) {
                          while (1) {
                            switch ((_context16.prev = _context16.next)) {
                              case 0:
                                _context16.next = 2;
                                return call(_waybill.sureContract, value);

                              case 2:
                                res = _context16.sent;

                                if (res.code == 0) {
                                  _antd.message.success('????????????');
                                } else {
                                  _antd.message.warning('????????????');
                                }

                              case 4:
                              case 'end':
                                return _context16.stop();
                            }
                          }
                        },
                        _callee);
                      }),
                    );
                  },
                  onCancel: function onCancel() {
                    //??????
                  },
                });

              case 4:
              case 'end':
                return _context17.stop();
            }
          }
        }, sureContractModel);
      }),
    //??????????????????????????????
    getBatchImportListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getBatchImportListModel(_ref33, _ref34) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getBatchImportListModel$(
          _context18,
        ) {
          while (1) {
            switch ((_context18.prev = _context18.next)) {
              case 0:
                value = _ref33.value;
                (call = _ref34.call), (put = _ref34.put);
                _context18.next = 4;
                return put({
                  type: 'setBatchLoadingTrue',
                });

              case 4:
                _context18.next = 6;
                return call(_waybill.getBatchImportList, value);

              case 6:
                res = _context18.sent;

                if (!(res.code == 0)) {
                  _context18.next = 14;
                  break;
                }

                _context18.next = 10;
                return put({
                  type: 'setBatchLoadingFalse',
                });

              case 10:
                _context18.next = 12;
                return put({
                  type: 'setBatchImportList',
                  payload: res,
                });

              case 12:
                _context18.next = 15;
                break;

              case 14:
                _antd.message.error(res.msg || '????????????');

              case 15:
              case 'end':
                return _context18.stop();
            }
          }
        },
        getBatchImportListModel);
      }),
    //??????
    outexportModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function outexportModel(_ref35, _ref36) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function outexportModel$(_context19) {
          while (1) {
            switch ((_context19.prev = _context19.next)) {
              case 0:
                value = _ref35.value;
                (call = _ref36.call), (put = _ref36.put);
                _context19.next = 4;
                return call(_waybill.outexportFn, value);

              case 4:
                res = _context19.sent;

                if (res.code == 0) {
                  _antd.message.success(res.msg);
                } else {
                  _antd.message.error(res.msg || '????????????');
                }

              case 6:
              case 'end':
                return _context19.stop();
            }
          }
        }, outexportModel);
      }),
    //??????????????????
    getExoprtModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getExoprtModel(_ref37, _ref38) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getExoprtModel$(_context20) {
          while (1) {
            switch ((_context20.prev = _context20.next)) {
              case 0:
                value = _ref37.value;
                (call = _ref38.call), (put = _ref38.put);
                _context20.next = 4;
                return put({
                  type: 'setExportLoadingTrue',
                });

              case 4:
                _context20.next = 6;
                return call(_waybill.getExoprtList, value);

              case 6:
                res = _context20.sent;

                if (!(res.code == 0)) {
                  _context20.next = 14;
                  break;
                }

                _context20.next = 10;
                return put({
                  type: 'setExportLoadingFalse',
                });

              case 10:
                _context20.next = 12;
                return put({
                  type: 'setExportImportList',
                  payload: res,
                });

              case 12:
                _context20.next = 15;
                break;

              case 14:
                _antd.message.error(res.msg || '????????????');

              case 15:
              case 'end':
                return _context20.stop();
            }
          }
        }, getExoprtModel);
      }),
    //?????????????????????
    getPayeePayListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getPayeePayListModel(_ref39, _ref40) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getPayeePayListModel$(
          _context21,
        ) {
          while (1) {
            switch ((_context21.prev = _context21.next)) {
              case 0:
                value = _ref39.value;
                (call = _ref40.call), (put = _ref40.put);
                _context21.next = 4;
                return call(_waybill.getPayeePayList, value);

              case 4:
                res = _context21.sent;

                if (!(res.code == 0)) {
                  _context21.next = 10;
                  break;
                }

                _context21.next = 8;
                return put({
                  type: 'setPayeeList',
                  payload: res.data,
                });

              case 8:
                _context21.next = 11;
                break;

              case 10:
                _antd.message.error(res.msg || '????????????');

              case 11:
              case 'end':
                return _context21.stop();
            }
          }
        },
        getPayeePayListModel);
      }),
    //????????????????????????
    getApplyRecordListModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getApplyRecordListModel(_ref41, _ref42) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getApplyRecordListModel$(
          _context22,
        ) {
          while (1) {
            switch ((_context22.prev = _context22.next)) {
              case 0:
                value = _ref41.value;
                (call = _ref42.call), (put = _ref42.put);
                _context22.next = 4;
                return call(_waybill.getApplyRecordList, value);

              case 4:
                res = _context22.sent;

                if (!(res.code == 0)) {
                  _context22.next = 10;
                  break;
                }

                _context22.next = 8;
                return put({
                  type: '/setApplyRecordList',
                  payload: res.data,
                });

              case 8:
                _context22.next = 11;
                break;

              case 10:
                _antd.message.error(res.msg || '????????????');

              case 11:
              case 'end':
                return _context22.stop();
            }
          }
        },
        getApplyRecordListModel);
      }),
    //????????????-?????????
    getSmsCodeFromPayModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getSmsCodeFromPayModel(_ref43, _ref44) {
        var value, call, put, res, store, t;
        return regeneratorRuntime.wrap(function getSmsCodeFromPayModel$(
          _context24,
        ) {
          while (1) {
            switch ((_context24.prev = _context24.next)) {
              case 0:
                value = _ref43.value;
                (call = _ref44.call), (put = _ref44.put);
                _context24.next = 4;
                return call(_waybill.getSmsCodeFromPay, value);

              case 4:
                res = _context24.sent;

                if (!(res.code == 0)) {
                  _context24.next = 12;
                  break;
                }

                _context24.next = 8;
                return put({
                  type: '/setIsSmsDisabled',
                  payload: true,
                });

              case 8:
                store = _umi.getDvaApp._store;
                t = (0, _tools.timeCutdown)(60, 1000, function(n) {
                  store.runSaga(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee2() {
                      return regeneratorRuntime.wrap(function _callee2$(
                        _context23,
                      ) {
                        while (1) {
                          switch ((_context23.prev = _context23.next)) {
                            case 0:
                              if (!(n <= 0)) {
                                _context23.next = 7;
                                break;
                              }

                              _context23.next = 3;
                              return put({
                                type: '/setIsSmsDisabled',
                                payload: true,
                              });

                            case 3:
                              _context23.next = 5;
                              return put({
                                type: '/setGetBtnText',
                                payload: '???????????????',
                              });

                            case 5:
                              _context23.next = 9;
                              break;

                            case 7:
                              _context23.next = 9;
                              return put({
                                type: '/setGetBtnText',
                                payload: '??????' + n + '???',
                              });

                            case 9:
                            case 'end':
                              return _context23.stop();
                          }
                        }
                      },
                      _callee2);
                    }),
                  );
                });
                _context24.next = 13;
                break;

              case 12:
                _antd.message.error(res.msg || '????????????');

              case 13:
              case 'end':
                return _context24.stop();
            }
          }
        },
        getSmsCodeFromPayModel);
      }),
    //????????????-?????????????????????
    getInfoPersonModel:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getInfoPersonModel(_ref45, _ref46) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function getInfoPersonModel$(
          _context25,
        ) {
          while (1) {
            switch ((_context25.prev = _context25.next)) {
              case 0:
                value = _ref45.value;
                (call = _ref46.call), (put = _ref46.put);
                _context25.next = 4;
                return call(_waybill.getInfoPersonFromPay, value);

              case 4:
                res = _context25.sent;
                console.log('res:', res);

                if (!(res.code == 0)) {
                  _context25.next = 11;
                  break;
                }

                _context25.next = 9;
                return put({
                  type: '/setPayObjInfo',
                  payload: res.data,
                });

              case 9:
                _context25.next = 12;
                break;

              case 11:
                _antd.message.error(res.msg || '????????????');

              case 12:
              case 'end':
                return _context25.stop();
            }
          }
        },
        getInfoPersonModel);
      }),
  },
  subscriptions: {
    setup: function setup(_ref47) {
      var dispatch = _ref47.dispatch,
        history = _ref47.history;
      return history.listen(function(_ref48) {
        var pathname = _ref48.pathname;

        if (pathname == '/car/index' || pathname == '/ship/index') {
          dispatch({
            type: 'getWaybillListModel',
            value: {
              transportType: pathname == '/car/index' ? '1' : '2',
            },
          });
        }

        if (pathname == '/car/form' || pathname == '/ship/form') {
          var waybill_no = history.location.query.waybill_no;
          dispatch({
            type: 'getCommonInfoModel',
            value: {
              transport_type: pathname == '/car/form' ? '1' : '2',
            },
          });

          if (waybill_no) {
            dispatch({
              type: 'getWaybillDetailModel',
              value: {
                waybill_no: waybill_no,
              },
            });
          }
        }
      });
    },
  },
};
exports['default'] = _default;
