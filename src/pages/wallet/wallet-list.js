import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Table,
  Button,
  Select,
  Form,
  Input,
  message,
  DatePicker,
  Modal,
  Tooltip,
  Drawer,
} from 'antd';
import { formatDateYMDHMS, accDiv } from '../../util/tools';

import { connect } from 'dva';
import styles from './index.less';
const namespace = 'wallet';
const { confirm } = Modal;

const mapStateToProps = state => {
  let { loading, totalPage, wallet_list, wallet_tax_list } = state[namespace];
  return {
    loading,
    totalPage,
    wallet_list,
    wallet_tax_list,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getWalletFn: value => {
      dispatch({
        type: namespace + '/getWalletModel',
        value,
      });
    },
    getWalletListFn: value => {
      dispatch({
        type: namespace + '/getWalletListModel',
        value,
      });
    },
  };
};
const WalletList = props => {
  let { loading, totalPage, flag, data } = props;
  //查询条件
  const [objState, setObjState] = useState({
    pageNum: 1,
    pageSize: 10,
  });
  //pageSize 变化的回调
  const onShowSizeChange = (current, pageSize) => {
    setObjState({
      ...objState,
      pageNum: current,
      pageSize: pageSize,
    });
    let params = { page: current, num: pageSize, flag };
    params = { ...params, ...data };
    props.getWalletListFn(params);
  };

  //分页
  const pageChange = (page, pageSize) => {
    setObjState({
      ...objState,
      pageNum: page,
      pageSize,
    });
    let params = { page, num: pageSize, flag };
    params = { ...params, ...data };
    props.getWalletListFn(params);
  };

  useEffect(() => {
    let params = { page: objState.pageNum, num: objState.pageSize, flag };
    params = { ...params, ...data };
    props.getWalletListFn(params);
  }, [data]);

  const columns1 = [
    {
      title: '序号',
      render: (text, row, index) => `${index + 1}`,
      width: 70,
    },
    {
      title: '申请时间',
      render: (text, record, index) => {
        return <span>{formatDateYMDHMS(record.order_time, 'year')}</span>;
      },
    },
    {
      title: '交易类型',
      dataIndex: 'charge_type_desc',
    },
    {
      title: '状态',
      dataIndex: 'order_status_desc',
    },
    {
      title: '金额（元）',
      render: (text, row, index) => {
        return <span>{accDiv(row.order_amount, 100).toFixed(2)}</span>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];
  const columns2 = [
    {
      title: '序号',
      render: (text, row, index) => `${index + 1}`,
      width: 70,
    },
    {
      title: '申请时间',
      render: (text, record, index) => {
        return <span>{formatDateYMDHMS(record.order_time, 'year')}</span>;
      },
    },
    {
      title: '业务单号',
      dataIndex: 'service_no',
    },
    {
      title: '交易类型',
      dataIndex: 'charge_type_desc',
    },
    {
      title: '交易账户',
      dataIndex: 'account_type_desc',
    },
    {
      title: '状态',
      dataIndex: 'order_status_desc',
    },
    {
      title: '金额（元）',
      render: (text, row, index) => {
        return <span>{accDiv(row.order_amount, 100).toFixed(2)}</span>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];
  return (
    <>
      <Table
        columns={props.flag == 'list' ? columns1 : columns2}
        dataSource={props['wallet_' + flag]}
        loading={loading}
        rowKey={record => `${record.order_no}`}
        sticky
        pagination={{
          showQuickJumper: true,
          current: objState.pageNum,
          pageSize: objState.pageSize,
          pageSizeOptions: [10, 20, 50, 100],
          total: totalPage,
          onChange: pageChange,
          onShowSizeChange: onShowSizeChange,
        }}
      />
    </>
  );
};
const memoWalletList = React.memo(WalletList);
export default connect(mapStateToProps, mapDispatchToProps)(memoWalletList);
