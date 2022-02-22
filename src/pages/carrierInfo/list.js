import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Table, Button, Menu, Modal, Tooltip, Dropdown } from 'antd';
const { confirm } = Modal;
import { history } from 'umi';
import {
  DownOutlined,
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { connect } from 'dva';
const namespace = 'carrierInfo';

const mapStateToProps = state => {
  let { loading, totalNum, c_getCarrierList, c_getWaitCarrierList } = state[
    namespace
  ];
  let { userInfo } = state['user'];
  return {
    loading,
    totalNum,
    c_getCarrierList,
    c_getWaitCarrierList,
    userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarrierListFn: value => {
      dispatch({
        type: namespace + '/getCarrierListModel',
        value,
      });
    },
    delOrRejectCarrierFn: value => {
      dispatch({
        type: namespace + '/delOrRejectCarrierModel',
        value,
      });
    },
    scanIdCardFn: value => {
      dispatch({
        type: namespace + '/scanIdCardModel',
        value,
        callback: res => {
          console.log('res:', res);
        },
      });
    },
  };
};

const List = props => {
  let {
    loading,
    totalNum,
    flag,
    data,
    driverAdmin,
    vehicleAdmin,
    userInfo,
  } = props;
  //表格初始化状态
  const [objState, setObjState] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  //父组件调用子组件方法
  useImperativeHandle(props.onRef, () => {
    return {
      getList: values => {
        let params = {
          page: objState.pageNum,
          num: objState.pageSize,
          flag,
          ...values,
        };
        props.getCarrierListFn(params);
      },
    };
  });

  //打开-编辑承运人、承运人详情
  const handleEditOrDetail = (carrier_uin, flag) => {
    if (flag == 'editCarrier') {
      this.title = '编辑承运人';
      this.isaddOrEditManFlag = true;
      this.postUrl = 'carrierInfo/editCarrier';
    } else {
      this.title = '承运人详情';
      this.detailFlag = true;
    }
    this.showType = flag;
    this.carrier_uin = carrier_uin;
  };

  //车辆管理
  const vehicleManager = carrier_uin => {
    history.push({
      pathname: vehicleAdmin,
      query: {
        carrier_uin,
      },
    });
  };

  //司机管理
  const driverManager = carrier_uin => {
    history.push({
      pathname: driverAdmin,
      query: {
        carrier_uin,
      },
    });
  };

  //打开银行卡管理弹框
  const bankCardManager = carrier_uin => {
    this.isBankManageFlag = true;
    this.carrier_uin = carrier_uin;
  };

  //运单列表->更多操作
  const menu = (carrier_uin, audit_status) => (
    <Menu onClick={changeMenu.bind(this, carrier_uin, audit_status)}>
      <Menu.Item key="1">删除</Menu.Item>
      <Menu.Item key="2" disabled={audit_status != 0}>
        撤回
      </Menu.Item>
    </Menu>
  );
  const changeMenu = (carrier_uin, audit_status, e) => {
    switch (e.key * 1) {
      case 1:
        confirm({
          title: '提示',
          icon: <QuestionCircleOutlined />,
          content: '是否确定删除该承运人？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            let params = {
              page: objState.pageNum,
              num: objState.pageSize,
              flag,
              url: '/carrierInfo/delCarrier',
              ...data,
            };
            props.delOrRejectCarrierFn({ carrier_uin, ...params });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break;
      case 2:
        confirm({
          title: '提示',
          icon: <QuestionCircleOutlined />,
          content: '是否确定要撤回该承运人信息？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            let params = {
              page: objState.pageNum,
              num: objState.pageSize,
              flag,
              url: '/carrierInfo/rejectCarrier',
              ...data,
            };
            props.delOrRejectCarrierFn({ carrier_uin, flag, ...params });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break;
    }
  };

  const columns = [
    {
      type: 'index',
      title: '序号',
      width: 60,
      render: (text, row, index) => `${index + 1}`,
    },
    {
      title: '操作',
      render: (text, row, index) => {
        const { audit_status, carrier_uin } = row;
        return (
          <div className={styles.column_carrier}>
            <Button
              type="primary"
              disabled={audit_status != 2}
              onClick={_ => handleEditOrDetail(carrier_uin, 'editCarrier')}
            >
              编辑
            </Button>
            <Button type="primary" onClick={() => driverManager(carrier_uin)}>
              司机管理
            </Button>
            <Button type="primary" onClick={() => vehicleManager(carrier_uin)}>
              车辆管理
            </Button>
            {userInfo.PAYMENTREQUIRED == 1 && (
              <Button
                type="primary"
                onClick={() => bankCardManager(carrier_uin)}
              >
                银行卡管理
              </Button>
            )}
            <Dropdown
              overlay={menu(carrier_uin, audit_status)}
              trigger={['click']}
            >
              <Button>
                更多
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
    {
      title: '姓名',
      render: (text, row, index) => {
        let { audit_status, carrier_uin, real_name, remark } = row;
        return (
          <div>
            <a
              type="primary"
              size="small"
              style={{
                marginRight: '5px',
                color: '#00b0b5',
              }}
              onClick={_ => handleEditOrDetail(carrier_uin, 'detailCarrier')}
            >
              {real_name}
            </a>
            {audit_status == 2 && (
              <Tooltip placement="right" title={remark}>
                <ExclamationCircleFilled />
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '身份证号',
      dataIndex: 'id_card_no',
    },
    {
      title: '结算银行卡',
      render: (text, row, index) => {
        let { bank_text } = row;
        return <span>{bank_text.replace(/<br \/>/, '')}</span>;
      },
    },
    {
      title: '名下司机',
      width: 150,
      render: (text, row, index) => {
        let { driver_list_text } = row,
          len = driver_list_text.split(',').length;
        return (
          <div
            style={{
              height: '38px',
              lineHeight: '38px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={len > 2 ? driver_list_text : ''}
          >
            {driver_list_text}
          </div>
        );
      },
    },
    {
      title: '名下车辆',
      width: 150,
      render: (text, row, index) => {
        let { vehicle_list_text } = row,
          len = vehicle_list_text.split(',').length;
        return (
          <div
            style={{
              height: '38px',
              lineHeight: '38px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={len > 2 ? vehicle_list_text : ''}
          >
            {vehicle_list_text}
          </div>
        );
      },
    },
    {
      title: '添加时间',
      dataIndex: 'create_time_text',
    },
    {
      title: '认证状态',
      render: (text, row, index) => {
        let { audit_status, audit_status_text } = row,
          waybill_status_color = '#00B0B5';
        switch (audit_status) {
          case '0': //审核中
            waybill_status_color = '#00B0B5';
            break;
          case '1': //审核通过
          case '3':
            waybill_status_color = '#BFBFBF';
            break;
          case '2': //审核不通过
            waybill_status_color = '#F85E5E';
            break;
        }
        return (
          <span
            style={{
              color: waybill_status_color,
              borderColor: waybill_status_color,
            }}
          >
            {audit_status_text}
          </span>
        );
      },
    },
  ];

  //pageSize 变化的回调
  const onShowSizeChange = (current, pageSize) => {
    setObjState({
      ...objState,
      pageNum: current,
      pageSize: pageSize,
    });
    let params = { page: current, num: pageSize, flag, ...data };
    props.getCarrierListFn(params);
  };

  //分页
  const pageChange = (page, pageSize) => {
    setObjState({
      ...objState,
      pageNum: page,
      pageSize,
    });
    let params = { page, num: pageSize, flag, ...data };
    props.getCarrierListFn(params);
  };

  useEffect(() => {
    let params = {
      page: objState.pageNum,
      num: objState.pageSize,
      flag,
      ...data,
    };
    props.getCarrierListFn(params);
  }, [flag]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={props['c_' + flag]}
        loading={loading}
        rowKey={record => `${record.create_time}`}
        scroll={{ x: 2000 }}
        sticky
        pagination={{
          showQuickJumper: true,
          current: objState.pageNum,
          pageSize: objState.pageSize,
          pageSizeOptions: [10, 20, 50, 100],
          total: totalNum,
          onChange: pageChange,
          onShowSizeChange: onShowSizeChange,
        }}
      />
    </>
  );
};
const memoList = React.memo(List);
export default connect(mapStateToProps, mapDispatchToProps)(memoList);
