import React, { useState, useEffect, useRef } from 'react';
import {
  Row,
  Col,
  Table,
  Button,
  Select,
  Radio,
  Form,
  Input,
  DatePicker,
  Menu,
  Dropdown,
  message,
  Modal,
  Tooltip,
  Drawer,
} from 'antd';
const { confirm } = Modal;
import {
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  DownSquareOutlined,
} from '@ant-design/icons';
import {
  formatDateYMD,
  accMul,
  accDiv,
  formatSelectedOptions,
} from '../../util/tools';
import UploadRequired from '../upload-required';
import UploadNoRequired from '../upload-no-required';
import Details from '../waybill-model/detail';
import PayInvoiceModal from './pay-invoice-modal';
import ExportList from '../waybill-model/export-list';
import styles from './index.less';
import { history, useHistory } from 'umi';
import { connect } from 'dva';
const namespace = 'invoice';
const namespace_2 = 'user';

const mapStateToProps = state => {
  let {
    applyTitleInfo,
    invoiceDetailList,
    totalPageDetail,
    loadingDetail,
  } = state[namespace];
  let { userInfo } = state[namespace_2];
  return {
    applyTitleInfo,
    invoiceDetailList,
    totalPageDetail,
    loadingDetail,
    userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInvoiceGetInfoFn: value => {
      dispatch({
        type: namespace + '/getInvoiceGetInfoModel',
        value,
      });
    },
    getInvoicewaybillModelFn: value => {
      dispatch({
        type: namespace + '/getInvoicewaybillModel',
        value,
      });
    },
    removewaybillFn: value => {
      dispatch({
        type: namespace + '/removewaybillModel',
        value,
      });
    },
    waybilloutexportFn: value => {
      dispatch({
        type: namespace + '/waybilloutexportModel',
        value,
      });
    },
  };
};

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">
      <span className={styles.detail_info_title}>{title}</span>
      {content}
    </p>
  </div>
);

const Detail = props => {
  const history = useHistory();
  let {
    location: {
      query: { invoice_id },
    },
  } = history;
  let { transport_type, exportWaybillType } = props;
  const [form] = Form.useForm();
  const [waybillNo, setWaybillNo] = useState('');
  const dataRef = useRef();
  const [placeholderInput, setPlaceholderInput] = useState('?????????????????????');
  //?????????????????????
  const [objState, setObjState] = useState({
    pageNum: 1,
    pageSize: 10,
    searchName: 'waybill_no',
    isDetailDrawer: false,
  });

  //????????????
  const selectedNo = value => {
    switch (value * 1) {
      case 0:
        setObjState({
          ...objState,
          searchName: 'waybill_no',
        });
        setPlaceholderInput('?????????????????????');
        break;
      case 1:
        setObjState({
          ...objState,
          searchName: 'apply_no_3th',
        });
        setPlaceholderInput('?????????????????????????????????');
        break;
    }
  };

  //??????????????????????????????????????????
  const numSelector = (
    <Select onChange={selectedNo} style={{ width: '100%' }}>
      <Select.Option value="0">????????????</Select.Option>
      <Select.Option value="1">????????????????????????</Select.Option>
    </Select>
  );

  //??????
  const onFinish = values => {
    values = {
      ...values,
      page: objState.pageNum,
      num: objState.pageSize,
    };
    dataRef.current = formatSelectedOptions(values);
    props.getInvoicewaybillModelFn(dataRef.current);
  };

  //??????
  const handleSearchReset = () => {
    form.resetFields();
    props.getInvoicewaybillModelFn({
      page: objState.pageNum,
      num: objState.pageSize,
      invoice_id,
    });
  };

  //??????????????????
  const [isModalvisible, setIsModalvisible] = useState(false);
  //??????
  const handleOk = () => {
    setIsModalvisible(false);
  };
  //??????
  const handleCancel = () => {
    setIsModalvisible(false);
  };

  //????????????????????????
  const handleRowPay = () => {
    setIsModalvisible(true);
  };

  //?????????-???????????????
  const [isRequiredModalVisible, setIsRequiredModalVisible] = useState(false);
  const handleRequiredOk = () => {
    setIsRequiredModalVisible(false);
  };
  const handleRequiredCancel = () => {
    setIsRequiredModalVisible(false);
  };

  //????????????-???????????????
  const [isNoRequiredModalVisible, setIsNoRequiredModalVisible] = useState(
    false,
  );
  const handleNoRequiredOk = () => {
    setIsNoRequiredModalVisible(false);
  };
  const handleNoRequiredCancel = () => {
    setIsNoRequiredModalVisible(false);
  };

  //????????????-???????????????
  const closeModel = flag => {
    setIsNoRequiredModalVisible(flag);
  };

  //?????????-????????????
  const handleRowUpload = (row, index) => {
    if (props.userInfo.PAYMENTREQUIRED == 1) {
      //?????????
      setIsRequiredModalVisible(true);
    } else {
      //????????????
      setIsNoRequiredModalVisible(true);
    }
    setWaybillNo(row.waybill_no);
  };

  //?????????-??????
  const handleDel = row => {
    let { invoice_id_3, waybill_no } = row;
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '?????????????????????',
      cancelText: '??????',
      okText: '??????',
      onOk() {
        props.removewaybillFn({ invoice_id: invoice_id_3, waybill_no });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  //??????
  const handleExport = () => {
    let params = {
      page: objState.pageNum,
      num: objState.pageSize,
      invoice_id,
      transport_type,
    };
    let data = { ...params, ...dataRef.current };
    props.waybilloutexportFn(data);
  };

  //????????????
  const [exportListFlag, setExportListFlag] = useState(false);
  const handleExportTaskOpen = () => {
    setExportListFlag(true);
  };
  const handleExportTaskClose = () => {
    setExportListFlag(false);
  };

  //???????????????????????????
  const openWaybillDetail = waybill_no => {
    setObjState({
      ...objState,
      isDetailDrawer: true,
    });
    setWaybillNo(waybill_no);
  };

  //????????????????????????
  const onCloseDetailDrawer = () => {
    setObjState({
      ...objState,
      isDetailDrawer: false,
    });
  };

  //pageSize ???????????????
  const onShowSizeChange = (current, pageSize) => {
    setObjState({
      ...objState,
      pageNum: current,
      pageSize: pageSize,
    });
    let params = { page, num: pageSize };
    let data = { ...params, ...dataRef.current };
    props.getInvoicewaybillModelFn(data);
  };

  //??????
  const pageChange = (page, pageSize) => {
    setObjState({
      ...objState,
      pageNum: page,
      pageSize,
    });
    let params = { page, num: pageSize };
    let data = { ...params, ...dataRef.current };
    props.getInvoicewaybillModelFn(data);
  };

  useEffect(() => {
    props.getInvoiceGetInfoFn({ invoice_id });
    let params = { page: 1, num: 10, invoice_id };
    props.getInvoicewaybillModelFn(params);
  }, [invoice_id]);

  const columns = [
    {
      title: '??????',
      render: (text, row, index) => `${index + 1}`,
      width: 50,
    },
    {
      title: '??????',
      width: 254,
      align: 'center',
      render: (text, row, index) => {
        let { waybill_no, waybill_editable } = row;
        return (
          <div>
            {props.userInfo.FROMAPI == 0 && (
              <Button
                onClick={() => {
                  history.push({
                    pathname: props.formName,
                    query: {
                      waybill_no,
                      title:
                        props.transportType == 1
                          ? '??????????????????'
                          : '??????????????????',
                    },
                  });
                  setWaybillNo(waybill_no);
                }}
                type="primary"
                disabled={waybill_editable != 1}
              >
                ??????
              </Button>
            )}
            {props.userInfo.FROMAPI == 0 && (
              <Button
                onClick={() => {
                  handleRowUpload(row, index);
                }}
                type="primary"
                disabled={waybill_editable != 1}
                style={{ marginLeft: '10px', marginRight: '10px' }}
              >
                ????????????
              </Button>
            )}
            <Button type="primary" onClick={() => handleDel(row)}>
              ??????
            </Button>
          </div>
        );
      },
    },
    {
      title: '????????????',
      width: 140,
      render: (text, row, index) => {
        let { waybill_no } = row;
        return (
          <>
            <a
              style={{ textDecoration: 'underline' }}
              onClick={() => openWaybillDetail(waybill_no)}
            >
              {waybill_no}
            </a>
          </>
        );
      },
    },
    {
      title: '????????????',
      width: 100,
      dataIndex: 'pending_status_desc',
      render: (text, row, index) => {
        let {
          invoice_status,
          waybill_status,
          waybill_status_text,
          audit_fail_reason_desc,
          waybill_no,
        } = row;
        let html;
        if (invoice_status == 40 && waybill_status == 200) {
          html = (
            <div>
              <span style={{ color: '#f00' }}>{waybill_status_text}</span>
              {invoice_status == 40 && (
                <Tooltip placement="right" title={audit_fail_reason_desc}>
                  <ExclamationCircleFilled />
                </Tooltip>
              )}
              <div>
                <div>{audit_fail_reason_desc}</div>
                <div>
                  <Button
                    type="primary"
                    size="small"
                    style={{
                      height: 'auto',
                      color: '#fff',
                    }}
                    onClick={() => handleWaybillStatus(waybill_no)}
                  >
                    ?????????
                  </Button>
                </div>
              </div>
            </div>
          );
        } else {
          html = waybill_status_text;
        }
        return <div>{html}</div>;
      },
    },
    {
      title: '????????????',
      width: 100,
      dataIndex: 'goods_name',
    },
    {
      title: '?????????',
      width: 100,
      render(text, row, index) {
        let { carrier_ticket_limit, carrier_name } = row;
        // let num = localRead("month_carrier_waybill_limit");
        let num = 10;
        let tooltip = (
          <Tooltip
            placement="right"
            title={
              '???????????????????????????????????????' +
              num +
              '??? ????????????????????? ?????????1????????????????????????'
            }
          >
            <ExclamationCircleFilled />
          </Tooltip>
        );
        return (
          <div>
            <span style={{ verticalAlign: 'middle' }}>{carrier_name}</span>
            {carrier_ticket_limit == 1 && tooltip}
          </div>
        );
      },
    },
    {
      title: '?????????',
      width: 100,
      dataIndex: 'trans_vehicle_name',
    },
    {
      title: '????????????',
      width: 100,
      render: (text, row, index) => {
        let { load_time } = row;
        return <div>{formatDateYMD(load_time)}</div>;
      },
    },
    {
      title: '????????????',
      width: 100,
      render: (text, row, index) => {
        let { unload_time } = row;
        return <div>{formatDateYMD(unload_time)}</div>;
      },
    },
    {
      title: '??????(???)',
      width: 100,
      render: (text, row, index) => {
        let { labour_amount } = row;
        return <div>{accDiv(labour_amount, 100).toFixed(2)}</div>;
      },
    },
    {
      title: '?????????????????????(???)',
      width: 120,
      render: (text, row, index) => {
        let { invoice_amount } = row;
        return <div>{accDiv(invoice_amount, 100).toFixed(2)}</div>;
      },
    },
    {
      title: '???????????????(???)',
      width: 100,
      render: (text, row, index) => {
        let { svr_fee } = row;
        return <div>{accDiv(svr_fee, 100).toFixed(2)}</div>;
      },
    },
    {
      title: '????????????',
      width: 100,
      render: (text, row, index) => {
        let { taxable_amount } = row;
        return <div>{accDiv(taxable_amount, 100).toFixed(2)}</div>;
      },
    },
    {
      title: '????????????',
      width: 100,
      dataIndex: 'invoice_status_text',
    },
  ];

  return (
    <>
      <Row>
        <Col span={6}>
          <DescriptionItem
            title="??????????????????"
            content={props.applyTitleInfo.apply_invoiceno}
          />
        </Col>
        <Col span={6}>
          <DescriptionItem
            title="????????????"
            content={formatDateYMD(props.applyTitleInfo.create_time)}
          />
        </Col>
        <Col span={6}>
          <DescriptionItem
            title="??????????????????"
            content={props.applyTitleInfo.taxable_amount / 100}
          />
        </Col>
        <Col span={6}>
          <DescriptionItem
            title="?????????????????????"
            content={props.applyTitleInfo.svr_fee_text}
          />
        </Col>
        <Col span={6}>
          <DescriptionItem
            title="?????????????????????"
            content={props.applyTitleInfo.invoice_amount / 100}
          />
        </Col>
        <Col span={6}>
          <DescriptionItem
            title="??????"
            content={props.applyTitleInfo.invoiceStatusText}
          />
        </Col>
        <Col span={6}>
          <DescriptionItem
            title="????????????"
            content={props.applyTitleInfo.ticket_success}
          />
        </Col>
        <Col span={6}>
          <DescriptionItem
            title="????????????"
            content={props.applyTitleInfo.ticket_wait}
          />
        </Col>
      </Row>

      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className={styles.search_box}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            invoice_id,
            waybill_status: '',
            waybill_no: '',
            apply_no_3th: '',
          }}
        >
          <Col span={5}>
            <Form.Item name={objState.searchName}>
              <Input
                addonBefore={numSelector}
                style={{ width: '100%' }}
                placeholder={placeholderInput}
              />
            </Form.Item>
            <Form.Item hidden name="invoice_id">
              <Input />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="waybill_status">
              <Select style={{ width: '100%' }}>
                <Select.Option value="100">??????????????????</Select.Option>
                <Select.Option value="200">??????</Select.Option>
                <Select.Option value="2">????????????</Select.Option>
                <Select.Option value="3">???????????????</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Button type="primary" htmlType="submit">
              ??????
            </Button>
            <Button htmlType="button" onClick={handleSearchReset}>
              ??????
            </Button>
          </Col>
          <Col span={13}>
            {props.applyTitleInfo.invoice_editable == 1 && (
              <Button type="primary" onClick={handleRowPay}>
                ????????????
              </Button>
            )}
            {props.applyTitleInfo.invoice_editable == 1 && (
              <Button type="primary">????????????</Button>
            )}
            <Button
              type="primary"
              icon={<DownSquareOutlined />}
              onClick={handleExport}
            >
              ??????
            </Button>
            <Button
              type="primary"
              icon={<DownSquareOutlined />}
              onClick={handleExportTaskOpen}
            >
              ????????????
            </Button>
            <Button>????????????</Button>
          </Col>
        </Form>
      </Row>

      <Table
        columns={columns}
        dataSource={props.invoiceDetailList}
        loading={props.loadingDetail}
        rowKey={record => `${record.waybill_no}`}
        scroll={{ x: 2000 }}
        sticky
        pagination={{
          showQuickJumper: true,
          current: objState.pageNum,
          pageSize: objState.pageSize,
          pageSizeOptions: [10, 20, 50, 100],
          total: props.totalPageDetail,
          onChange: pageChange,
          onShowSizeChange: onShowSizeChange,
        }}
      />
      {/*????????????-????????? */}
      <Modal
        title="????????????"
        okText="??????"
        cancelText="??????"
        width={790}
        visible={isRequiredModalVisible}
        onOk={handleRequiredOk}
        onCancel={handleRequiredCancel}
        footer={[
          <Button key="??????" onClick={handleRequiredCancel}>
            ??????
          </Button>,
        ]}
      >
        <UploadRequired
          waybill_no={waybillNo}
          transportType={props.transportType}
        />
      </Modal>

      {/**????????????-???????????? */}
      <Modal
        title="????????????"
        okText="??????"
        cancelText="??????"
        width={740}
        visible={isNoRequiredModalVisible}
        onOk={handleNoRequiredOk}
        onCancel={handleNoRequiredCancel}
        footer={null}
      >
        <UploadNoRequired
          waybill_no={waybillNo}
          transportType={props.transportType}
          closeModelFromChild={closeModel}
        />
      </Modal>

      {/*????????????*/}
      <Drawer
        title="????????????"
        placement="right"
        width={986}
        closable={false}
        onClose={onCloseDetailDrawer}
        visible={objState.isDetailDrawer}
      >
        <Details waybill_no={waybillNo} />
      </Drawer>
      {/*??????????????????*/}
      <Modal
        width="740px"
        title="????????????"
        okText="??????"
        cancelText="??????"
        visible={isModalvisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <PayInvoiceModal invoice_id={invoice_id} />
      </Modal>
      {/*????????????*/}
      <Modal
        title="????????????"
        width={800}
        visible={exportListFlag}
        onCancel={handleExportTaskClose}
        footer={null}
      >
        <ExportList
          exportListFlag={exportListFlag}
          exportWaybillType={exportWaybillType}
        />
      </Modal>
    </>
  );
};
const memoDetail = React.memo(Detail);
export default connect(mapStateToProps, mapDispatchToProps)(memoDetail);
