import { message, Modal } from 'antd';
import {
  paymentRequestList,
  paymentHistoryList,
  auditUpdate,
} from '../sevice/audit';

export default {
  namespace: 'audit',
  state: {
    audit_wait_list: [], //列表
    audit_finish_list: [], //列表
    audit_special_list: [], //列表
    loading: false, //列表加载状态
    totalPage: 0, //总页数,
    audit_history_list: [], //付款申请跟踪列表
    selectedRowKeys: [], //选中的申请单编号
    remarkModal: false, //不通过原因弹框
  },
  reducers: {
    //loading状态
    setLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },

    //列表
    set_wait_list(state, action) {
      let {
        payload: { data, total },
      } = action;
      return {
        ...state,
        audit_wait_list: data,
        totalPage: total,
      };
    },
    set_finish_list(state, action) {
      let {
        payload: { data, total },
      } = action;
      return {
        ...state,
        audit_finish_list: data,
        totalPage: total,
      };
    },
    set_special_list(state, action) {
      let {
        payload: { data, total },
      } = action;
      return {
        ...state,
        audit_special_list: data,
        totalPage: total,
      };
    },
    set_history_list(state, action) {
      let {
        payload: { data, total },
      } = action;
      return {
        ...state,
        audit_history_list: data,
        totalPage: total,
      };
    },
    setSelectedRowKeys(state, action) {
      return {
        ...state,
        selectedRowKeys: action.payload,
      };
    },
    setRemarkModal(state, action) {
      return {
        ...state,
        remarkModal: action.payload,
      };
    },
  },
  effects: {
    //付款申请申批列表
    *getPaymentRequestListModel({ value }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      const res = yield call(paymentRequestList, value, '/apply/' + value.flag);
      yield put({ type: 'set_' + value.flag, payload: { data: [] } });
      if (res.code == 0) {
        yield put({ type: 'setLoading', payload: false });
        if (res.data && res.data.length) {
          yield put({
            type: 'set_' + value.flag,
            payload: { ...res },
          });
        }
      }
    },
    //付款申请跟踪列表
    *paymentHistoryListModel({ value }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      const res = yield call(paymentHistoryList, value);
      if (res.code == 0) {
        yield put({ type: 'setLoading', payload: false });
        if (res.data && res.data.length) {
          yield put({ type: 'set_history_list', payload: res });
        }
      }
    },
    //付款申请跟踪审核
    *handleAuditModel({ value }, { call, put }) {
      const res = yield call(auditUpdate, value);
      if (res.code == 0) {
        message.success(res.msg || '操作成功');
        yield put({ type: 'setSelectedRowKeys', payload: [] });
        yield put({ type: 'setRemarkModal', payload: false });
      } else {
        message.warning(res.msg || '操作失败');
      }
    },
    //设置选中的行数
    *setSelectedRowKeysModel({ value }, { call, put }) {
      yield put({ type: 'setSelectedRowKeys', payload: value });
    },
    //打开或关闭--审核不通过原因弹框
    *setRemarkModalModel({ value }, { call, put }) {
      yield put({ type: 'setRemarkModal', payload: value });
    },
  },
  subscriptions: {},
};
