import { message } from 'antd';
import {
  getCarrierList,
  delOrRejectCarrier,
  getCarrierInfo,
  addCarrierBoss,
} from '../sevice/carrierInfo';
import { scanIdCard } from '../util/ocr';
export default {
  namespace: 'carrierInfo',
  state: {
    c_getCarrierList: [], //承运人列表(全部)
    c_getWaitCarrierList: [], //承运人列表(待处理)
    loading: false, //列表加载状态
    totalNum: 0, //总条数,
    carrierSubmitDataDetail: {}, //编辑时获取的详情信息（承运人或司机）
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
    //编辑时获取的详情信息（承运人或司机）
    setCarrierSubmitDataDetail(state, action) {
      return {
        ...state,
        carrierSubmitDataDetail: action.payload,
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

    //获取承运人或司机详情
    *getCarrierInfoModel({ value }, { call, put }) {
      const res = yield call(getCarrierInfo, value);
      if (res.code == 0) {
        yield put({
          type: 'setCarrierSubmitDataDetail',
          payload: res.data,
        });
      } else {
        message.warning(res.msg || '系统错误');
      }
    },

    //新增车队老板
    *addCarrierBossModel({ value }, { call, put }) {
      const res = yield call(addCarrierBoss, value);
      return res;
    },
  },
  subscriptions: {},
};
