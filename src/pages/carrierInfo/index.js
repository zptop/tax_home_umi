import React, { useState, useRef } from 'react';
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
  Tabs,
} from 'antd';
const { TabPane } = Tabs;
import {
  formatDateYMD,
  formatSelectedOptions,
  accDiv,
  timeCutdown,
} from '../../util/tools';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_1595958_p5529b5fjfr.js'],
});
import AddOrEditMan from './add-or-edit-man';
import List from './list';
import styles from './index.less';
const CarrierInfo = props => {
  const ChildRef = React.createRef();
  const ChildAddOrEditRef = React.createRef();
  const dataRef = useRef('');
  const [curTabKey, setCurTabKey] = useState('1');
  const changeTabs = activeKey => {
    setCurTabKey(activeKey);
  };
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
  const [objState, setObjState] = useState({
    pageNum: 1,
    pageSize: 10,
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
        setObjState({
          ...objState,
          searchName: 'carrier_name',
        });
        setPlaceholderInput('请输入承运人名称');
        break;
      case 1:
        setObjState({
          ...objState,
          searchName: 'carrier_mobile',
        });
        setPlaceholderInput('请输入承运人手机');
        break;
      case 2:
        setObjState({
          ...objState,
          searchName: 'driver_name',
        });
        setPlaceholderInput('请输入司机姓名');
        break;
      case 3:
        setObjState({
          ...objState,
          searchName: 'driver_mobile',
        });
        setPlaceholderInput('请输入司机手机号');
        break;
      case 4:
        setObjState({
          ...objState,
          searchName: 'vehicle_number',
        });
        setPlaceholderInput('请输入车牌号');
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
    };
    dataRef.current = formatSelectedOptions(values);
    ChildRef.current.getList(dataRef.current);
  };

  //重置
  const handleSearchReset = () => {
    form.resetFields();
    setObjState({
      ...objState,
      carrier_name: '',
      audit_status: '',
      driver_status: '',
      vehicle_status: '',
      page: objState.pageNum,
      num: objState.pageSize,
    });
    ChildRef.current.getList(formatSelectedOptions(objState));
  };

  //添加完"车老板或司机"后触发列表
  const getCarrierListFromAddOrEdit = () => {
    ChildRef.current.getList(formatSelectedOptions(objState));
  };

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
            carrier_name: '',
            audit_status: '200',
            driver_status: '200',
            vehicle_status: '200',
          }}
        >
          <Col span={4} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Select defaultValue="0" onChange={selectedNo}>
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
                <Select.Option value="1">审核中</Select.Option>
                <Select.Option value="2">审核通过</Select.Option>
                <Select.Option value="3">审核不通过</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="driver_status" label="司机认证状态">
              <Select>
                <Select.Option value="200">全部</Select.Option>
                <Select.Option value="1">审核中</Select.Option>
                <Select.Option value="2">审核通过</Select.Option>
                <Select.Option value="3">审核不通过</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="vehicle_status" label="车辆认证状态">
              <Select>
                <Select.Option value="200">全部</Select.Option>
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
        </Form>
      </Row>
      <Tabs defaultActiveKey="1" onChange={changeTabs}>
        <TabPane tab="全部" key="1">
          {curTabKey === '1' ? (
            <List
              flag="getCarrierList"
              data={dataRef.current}
              onRef={ChildRef}
              getUinOrId={getUinOrId}
              driverAdmin="/carrierInfo/driver-admin"
              vehicleAdmin="/carrierInfo/vehicle-admin"
            />
          ) : (
            <div></div>
          )}
        </TabPane>
        <TabPane tab="待处理" key="2">
          {curTabKey === '2' ? (
            <List
              flag="getWaitCarrierList"
              driverAdmin="/carrierInfo/driver-admin"
              vehicleAdmin="/carrierInfo/vehicle-admin"
            />
          ) : (
            <div></div>
          )}
        </TabPane>
      </Tabs>
      {/*新增车队老板*/}
      <AddOrEditMan
        title={title}
        onRef={ChildAddOrEditRef}
        addOrEditManCallList={getCarrierListFromAddOrEdit}
      />
    </>
  );
};

export default CarrierInfo;
