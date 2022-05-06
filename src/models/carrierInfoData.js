import { message } from 'antd';
import {
  getCarrierList,
  getDriverList,
  delOrRejectCarrier,
  delOrRejectDriver,
  getCarrierInfo,
  getDriverInfo,
  addCarrierBoss,
  editCarrier,
  addDriver,
  editDriver,
} from '../sevice/carrierInfo';
import { scanIdCard } from '../util/ocr';
export default {
  namespace: 'carrierInfo',
  state: {
    c_getCarrierList: [], //承运人列表(全部)
    c_getWaitCarrierList: [], //承运人列表(待处理)
    driverList: [], //司机列表
    loading: false, //列表加载状态
    totalNum: 0, //总条数,
  },
  reducers: {
    //loading状态
    setLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },

    //承运人列表
    _getCarrierList(state, action) {
      let {
        payload: { lists, totalNum },
      } = action;
      return {
        ...state,
        c_getCarrierList: lists,
        totalNum,
      };
    },
    _getWaitCarrierList(state, action) {
      let {
        payload: { lists, totalNum },
      } = action;
      return {
        ...state,
        c_getWaitCarrierList: lists,
        totalNum,
      };
    },
    setDriverList(state, action) {
      let {
        payload: { lists, totalNum },
      } = action;
      return {
        ...state,
        driverList: lists,
        totalNum,
      };
    },
  },
  effects: {
    //ocr识别
    *scanIdCardModel({ value, callback }, { call, put }) {
      const res = yield call(scanIdCard, value, value.scanUrl);
      return res;
    },

    //承运人列表（全部或待处理）
    *getCarrierListModel({ value }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      const res = yield call(
        getCarrierList,
        value,
        '/carrierInfo/' + value.flag,
      );
      if (res.code == 0) {
        yield put({ type: 'setLoading', payload: false });
        if (res.data && res.data.lists.length) {
          yield put({ type: '_' + value.flag, payload: res.data });
        }
      } else {
        message.warning(res.msg || '系统错误');
      }
    },

    //删除或撤回承运人
    *delOrRejectCarrierModel({ value }, { call, put }) {
      const res = yield call(delOrRejectCarrier, value, value.url);
      if (res.code == 0) {
        message.success(res.msg || '删除成功');
        yield put({ type: 'getCarrierListModel', value });
      } else {
        message.warning(res.msg || '系统错误');
      }
    },

    //删除或撤回司机
    *delOrRejectDriverModel({ value }, { call, put }) {
      const res = yield call(delOrRejectDriver, value, value.url);
      if (res.code == 0) {
        message.success(res.msg || '删除成功');
        yield put({ type: 'getDriverListModel', value });
      } else {
        message.warning(res.msg || '系统错误');
      }
    },

    //获取承运人详情
    *getCarrierInfoModel({ value }, { call, put }) {
      const res = yield call(getCarrierInfo, value);
      return res;
    },

    //新增司机
    *addDriverModel({ value }, { call, put }) {
      const res = yield call(addDriver, value);
      return res;
    },

    //编辑司机
    *editDriverModel({ value }, { call, put }) {
      const res = yield call(editDriver, value);
      return res;
    },

    //司机列表
    *getDriverListModel({ value }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      const res = yield call(getDriverList, value);
      if (res.code == 0) {
        yield put({ type: 'setLoading', payload: false });
        if (res.data && res.data.lists.length) {
          yield put({ type: 'setDriverList', payload: res.data });
        }
      }
    },

    //获取司机详情
    *getDriverInfoModel({ value }, { call, put }) {
      const res = yield call(getDriverInfo, value);
      return res;
    },

    //新增车队老板（承运人）
    *addCarrierBossModel({ value }, { call, put }) {
      const res = yield call(addCarrierBoss, value);
      return res;
    },
    //编辑车队老板（承运人）
    *editCarrierModel({ value }, { call, put }) {
      const res = yield call(editCarrier, value);
      return res;
    },
  },
  subscriptions: {},
};
