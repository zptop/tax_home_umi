import React, { useState, useEffect, useRef } from 'react';
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
  Dropdown,
  Menu,
  Tooltip,
  Drawer,
  Tabs,
} from 'antd';
const { confirm } = Modal;
import {
  DownOutlined,
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useLocation } from 'umi';
import {
  formatDateYMD,
  formatSelectedOptions,
  accDiv,
  timeCutdown,
} from '../../util/tools';
import DeatilMan from './detail-man';
import AddOrEditMan from './add-or-edit-man';
import List from './list';
import styles from './index.less';
import { connect } from 'dva';
const namespace = 'carrierInfo';

const mapStateToProps = state => {
  let { loading, totalNum, driverList } = state[namespace];
  return {
    loading,
    totalNum,
    driverList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDriverListFn: value => {
      dispatch({
        type: namespace + '/getDriverListModel',
        value,
      });
    },
    delOrRejectDriverFn: value => {
      dispatch({
        type: namespace + '/delOrRejectDriverModel',
        value,
      });
    },
  };
};

const DriverAdmin = props => {
  let { loading, totalNum, driverList } = props;
  const location = useLocation();
  const ChildRef = React.createRef();
  const ChildAddOrEditRef = React.createRef();
  const dataRef = useRef('');
  const [form] = Form.useForm();
  const [placeholderInput, setPlaceholderInput] = useState('请输入司机姓名');
  const [title, setTitle] = useState('新增司机');
  const [carrier_uin, setCarrier_uin] = useState('');
  const [cd_id, setCd_id] = useState('');
  //抽屉开关-承运人详情
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const handleDetail = cd_id => {
    setCd_id(cd_id);
    setVisibleDrawer(true);
  };
  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  //表格初始化状态
  const [objState, setObjState] = useState({
    pageNum: 1,
    pageSize: 10,
    searchName: 'driver_name',
    audit_status: '',
  });

  //打开-司机弹框---编辑
  const handleEdit = cd_id => {
    setTitle('编辑司机');
    ChildAddOrEditRef.current.setUinOrId({ cd_id, carrier_uin });
  };

  //打开--司机弹框---新增
  const openAddDriver = () => {
    setTitle('新增司机');
    ChildAddOrEditRef.current.setAdd();
  };

  //选择单号
  const selectedNo = value => {
    switch (value * 1) {
      case 0:
        setObjState({
          ...objState,
          searchName: 'driver_name',
        });
        setPlaceholderInput('请输入司机姓名');
        break;
      case 1:
        setObjState({
          ...objState,
          searchName: 'driver_mobile',
        });
        setPlaceholderInput('请输入司机手机号');
        break;
    }
  };

  //搜索
  const onFinish = values => {
    let { pageNum: page, pageSize: num } = objState;
    values = {
      ...values,
      page,
      num,
      carrier_uin,
    };
    dataRef.current = values;
    props.getDriverListFn(dataRef.current);
  };

  //重置
  const handleSearchReset = () => {
    form.resetFields();
    let params = {
      carrier_uin,
      page: 1,
      num: 10,
      driver_name: '',
      audit_status: '',
    };
    props.getDriverListFn(params);
  };

  //pageSize 变化的回调
  const onShowSizeChange = (current, pageSize) => {
    setObjState({
      ...objState,
      pageNum: current,
      pageSize: pageSize,
    });
    let params = { page: current, num: pageSize, carrier_uin };
    props.getDriverListFn(params);
  };

  //分页
  const pageChange = (page, pageSize) => {
    setObjState({
      ...objState,
      pageNum: page,
      pageSize,
    });
    let params = { page, num: pageSize, carrier_uin };
    props.getDriverListFn(params);
  };

  //列表->更多操作
  const menu = (cd_id, audit_status) => (
    <Menu onClick={changeMenu.bind(this, cd_id, audit_status)}>
      <Menu.Item key="1">删除</Menu.Item>
      <Menu.Item key="2" disabled={audit_status != 0}>
        撤回
      </Menu.Item>
    </Menu>
  );
  const changeMenu = (cd_id, audit_status, e) => {
    switch (e.key * 1) {
      case 1:
        confirm({
          title: '提示',
          icon: <QuestionCircleOutlined />,
          content: '是否确定删除该司机？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            let params = {
              cd_id,
              url: '/carrierInfo/delDriver',
            };
            props.delOrRejectDriverFn(params);
          },
        });
        break;
      case 2:
        confirm({
          title: '提示',
          icon: <QuestionCircleOutlined />,
          content: '是否确定要撤回该司机信息？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            let params = {
              cd_id,
              url: '/carrierInfo/rejectDriver',
            };
            props.delOrRejectDriverFn(params);
          },
        });
        break;
    }
  };

  //添加完"司机"后触发列表
  const getCarrierListFromAddOrEdit = () => {
    ChildRef.current.getList(formatSelectedOptions(objState));
  };

  useEffect(() => {
    let { carrier_uin } = location.query;
    setCarrier_uin(carrier_uin);
    let params = {
      page: objState.pageNum,
      num: objState.pageSize,
      carrier_uin,
    };
    props.getDriverListFn(params);
  }, [location.query.carrier_uin]);

  const columns = [
    {
      type: 'index',
      title: '序号',
      width: 60,
      render: (text, row, index) => `${index + 1}`,
    },
    {
      title: '操作',
      width: 220,
      render: (text, row, index) => {
        const { carrier_uin, audit_status, cd_id } = row;
        return (
          <div className={styles.column_carrier}>
            <Button
              type="primary"
              disabled={audit_status == 2}
              onClick={_ => handleEdit(cd_id)}
            >
              编辑
            </Button>
            <Dropdown overlay={menu(cd_id, audit_status)} trigger={['click']}>
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
        let { driver_name, cd_id, audit_status, remark } = row;
        return (
          <div>
            <a
              type="primary"
              size="small"
              style={{
                marginRight: '5px',
                color: '#00b0b5',
              }}
              onClick={_ => handleDetail(cd_id)}
            >
              {driver_name}
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
      dataIndex: 'driver_mobile',
    },
    {
      title: '身份证号',
      dataIndex: 'driver_id',
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
          case '0':
            waybill_status_color = '#00B0B5';
            break;
          case '1':
            waybill_status_color = '#BFBFBF';
            break;
          case '2':
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
  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className={styles.search_box}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            driver_name: '',
            audit_status: '',
          }}
        >
          <Col span={4} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Select defaultValue="0" onChange={selectedNo}>
              <Select.Option value="0">司机名称</Select.Option>
              <Select.Option value="1">司机手机号</Select.Option>
            </Select>
            <Form.Item name={objState.searchName}>
              <Input placeholder={placeholderInput} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="audit_status" label="认证状态">
              <Select>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">审核中</Select.Option>
                <Select.Option value="2">审核通过</Select.Option>
                <Select.Option value="3">审核不通过</Select.Option>
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
          <Col span={13}>
            <Button type="primary" onClick={openAddDriver}>
              新增司机
            </Button>
          </Col>
        </Form>
      </Row>
      <Table
        columns={columns}
        dataSource={driverList}
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
      {/*新增司机*/}
      <AddOrEditMan
        title={title}
        onRef={ChildAddOrEditRef}
        addOrEditManCallList={getCarrierListFromAddOrEdit}
        showType="opDriver"
      />
      <Drawer
        title="司机详情"
        placement="right"
        width={986}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
      >
        <DeatilMan cd_id={cd_id} showType="detailDriver" />
      </Drawer>
    </>
  );
};
const memoDriverAdmin = React.memo(DriverAdmin);
export default connect(mapStateToProps, mapDispatchToProps)(memoDriverAdmin);
