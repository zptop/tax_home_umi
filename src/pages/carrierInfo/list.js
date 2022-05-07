import React, { useState, useEffect, useImperativeHandle } from 'react';
import {
  Table,
  Row,
  Select,
  Col,
  Button,
  Input,
  Menu,
  Modal,
  Tooltip,
  Dropdown,
  Drawer,
  Form,
} from 'antd';
const { confirm } = Modal;
import { history } from 'umi';
import {
  DownOutlined,
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_1595958_p5529b5fjfr.js'],
});
import styles from './index.less';
import { connect } from 'dva';
import { formatSelectedOptions } from '../../util/tools';
const namespace = 'carrierInfo';
import DeatilMan from './detail-man';
import AddOrEditMan from './add-or-edit-man';
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
    //详情
    getCarrierInfoFn: value => {
      return dispatch({
        type: namespace + '/getCarrierInfoModel',
        value,
      });
    },
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
  };
};

const List = props => {
  let { loading, totalNum, flag, driverAdmin, vehicleAdmin, userInfo } = props;
  const [carrier_uin, setCarrier_uin] = useState('');
  const ChildAddOrEditRef = React.createRef();
  const [form] = Form.useForm();
  const [placeholderInput, setPlaceholderInput] = useState('请输入承运人名称');
  const [title, setTitle] = useState('新增车队老板');

  //获取承运人司机---编辑
  const getUinOrId = value => {
    openAddOrEditManModal();
    setTitle(value.title);
    ChildAddOrEditRef.current.setUinOrId(value);
  };

  //表格初始化状态
  const [objFormState, setObjFormState] = useState({
    page: 1,
    num: 10,
    searchName: 'carrier_name',
    audit_status: '',
    driver_status: '',
    vehicle_status: '',
  });

  //打开--添加车老板弹框---新增
  const openAddOrEditManModal = () => {
    setTitle('新增车队老板');
    ChildAddOrEditRef.current.setAdd({ carrier_uin: '' });
  };

  //选择单号
  const selectedNo = value => {
    switch (value * 1) {
      case 0:
        setObjFormState({
          ...objFormState,
          searchName: 'carrier_name',
        });
        setPlaceholderInput('请输入承运人名称');
        break;
      case 1:
        setObjFormState({
          ...objFormState,
          searchName: 'carrier_mobile',
        });
        setPlaceholderInput('请输入承运人手机');
        break;
      case 2:
        setObjFormState({
          ...objFormState,
          searchName: 'driver_name',
        });
        setPlaceholderInput('请输入司机姓名');
        break;
      case 3:
        setObjFormState({
          ...objFormState,
          searchName: 'driver_mobile',
        });
        setPlaceholderInput('请输入司机手机号');
        break;
      case 4:
        setObjFormState({
          ...objFormState,
          searchName: 'vehicle_number',
        });
        setPlaceholderInput('请输入车牌号');
        break;
    }
  };

  //添加完"车老板或司机"后触发列表
  const getCarrierListFromAddOrEdit = () => {
    props.getCarrierListFn(formatSelectedOptions({ ...objFormState, flag }));
  };
  //搜索
  const onFinish = values => {
    let { page, num } = objFormState;
    values = {
      ...values,
      page,
      num,
      flag,
    };
    props.getCarrierListFn(formatSelectedOptions(values));
  };

  //重置
  const handleSearchReset = () => {
    form.resetFields();
    setObjFormState({
      ...objFormState,
      carrier_name: '',
      audit_status: '',
      driver_status: '',
      vehicle_status: '',
    });
    props.getCarrierListFn(formatSelectedOptions({ ...objFormState, flag }));
  };

  //抽屉开关-承运人详情
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const handleDetail = carrier_uin => {
    setCarrier_uin(carrier_uin);
    setVisibleDrawer(true);
  };
  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  //表格初始化状态
  const [objState, setObjState] = useState({
    page: 1,
    num: 10,
  });

  //打开-编辑承运人
  const handleEdit = carrier_uin => {
    getUinOrId({ carrier_uin, title: '编辑承运人' });
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

  //列表->更多操作
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
              page: objState.page,
              num: objState.num,
              flag,
              url: '/carrierInfo/delCarrier',
            };
            props.delOrRejectCarrierFn({ carrier_uin, ...params });
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
              page: objState.page,
              num: objState.num,
              flag,
              url: '/carrierInfo/rejectCarrier',
            };
            props.delOrRejectCarrierFn({ carrier_uin, flag, ...params });
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
              disabled={audit_status == 2}
              onClick={_ => handleEdit(carrier_uin)}
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
              onClick={_ => handleDetail(carrier_uin)}
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

  //num 变化的回调
  const onShowSizeChange = (current, num) => {
    setObjState({
      ...objState,
      page: current,
      num,
    });
    let params = { page: current, num, flag };
    props.getCarrierListFn(params);
  };

  //分页
  const pageChange = (page, num) => {
    setObjState({
      ...objState,
      page,
      num,
    });
    let params = { page, num, flag };
    props.getCarrierListFn(params);
  };

  useEffect(() => {
    let params = {
      page: objState.page,
      num: objState.num,
      flag,
    };
    props.getCarrierListFn(params);
  }, [flag]);

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          carrier_name: '',
          audit_status: '200',
          driver_status: '200',
          vehicle_status: '200',
        }}
      >
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className={styles.search_box}
        >
          {flag == 'getCarrierList' ? (
            <>
              <Col
                span={4}
                style={{ display: 'flex', alignItems: 'flex-start' }}
              >
                <Select
                  onChange={selectedNo}
                  defaultValue="0"
                  style={{ width: '130px' }}
                >
                  <Select.Option value="0">承运人名称</Select.Option>
                  <Select.Option value="1">承运人手机</Select.Option>
                  <Select.Option value="2">司机姓名</Select.Option>
                  <Select.Option value="3">司机手机号</Select.Option>
                  <Select.Option value="4">车牌号</Select.Option>
                </Select>
                <Form.Item name={objState.searchName}>
                  <Input placeholder={placeholderInput} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="audit_status" label="承运人认证状态">
                  <Select>
                    <Select.Option value="200">全部</Select.Option>
                    <Select.Option value="0">审核中</Select.Option>
                    <Select.Option value="1">审核通过</Select.Option>
                    <Select.Option value="2">审核不通过</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="driver_status" label="司机认证状态">
                  <Select>
                    <Select.Option value="200">全部</Select.Option>
                    <Select.Option value="0">审核中</Select.Option>
                    <Select.Option value="1">审核通过</Select.Option>
                    <Select.Option value="2">审核不通过</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="vehicle_status" label="车辆认证状态">
                  <Select>
                    <Select.Option value="200">全部</Select.Option>
                    <Select.Option value="0">审核中</Select.Option>
                    <Select.Option value="1">审核通过</Select.Option>
                    <Select.Option value="2">审核不通过</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button htmlType="button" onClick={handleSearchReset}>
                  重置
                </Button>
              </Col>
            </>
          ) : (
            <Col span={19}></Col>
          )}
          <Col span={5}>
            <Button type="primary" onClick={openAddOrEditManModal}>
              新增车队老板
            </Button>
            <Tooltip
              placement="left"
              title={
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p>适用于接单后分配给其他司机运输；</p>' +
                      '<p>可使用老板身份证进行认证，然后添</p>' +
                      '<p>加司机、车辆；登录手机号务必为车</p>' +
                      '<p>辆；登录手机号务必为车队老板手机号！</p>',
                  }}
                ></div>
              }
            >
              <IconFont
                type="iconbangzhu"
                style={{ fontSize: '18px', marginLeft: '6px' }}
              />
            </Tooltip>
            <Button type="primary">新增个体司机</Button>
            <Tooltip
              placement="left"
              title={
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p>适用于司机自己接单、运输；</p>' +
                      '<p>可使用司机身份证、驾驶证进</p>' +
                      '<p>行快速认证；登录手机号务必为</p>' +
                      '<p>接单人手机号！</p>',
                  }}
                ></div>
              }
            >
              <IconFont
                type="iconbangzhu"
                style={{ fontSize: '18px', marginLeft: '6px' }}
              />
            </Tooltip>
          </Col>
        </Row>
      </Form>

      <Table
        columns={columns}
        dataSource={props['c_' + flag]}
        loading={loading}
        rowKey={record => `${record.create_time}`}
        scroll={{ x: 2000 }}
        sticky
        pagination={{
          showQuickJumper: true,
          current: objState.page,
          num: objState.num,
          numOptions: [10, 20, 50, 100],
          total: totalNum,
          onChange: pageChange,
          onShowSizeChange: onShowSizeChange,
        }}
      />
      <Drawer
        title="承运人详情"
        placement="right"
        width={986}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
      >
        <DeatilMan carrier_uin={carrier_uin} showType="detailCarrier" />
      </Drawer>
      {/*新增车队老板*/}
      <AddOrEditMan
        title={title}
        onRef={ChildAddOrEditRef}
        addOrEditManCallList={getCarrierListFromAddOrEdit}
        showType="opCarrier"
      />
    </>
  );
};
const memoList = React.memo(List);
export default connect(mapStateToProps, mapDispatchToProps)(memoList);
