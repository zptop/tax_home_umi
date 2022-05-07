import React, { useState, useRef, useImperativeHandle } from 'react';
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
  Switch,
  Modal,
  Popover,
  Steps,
  Tooltip,
  Drawer,
} from 'antd';
const { Step } = Steps;
import moment from 'moment';
import qs from 'qs';
import {
  formatDateYMD,
  formatSelectedOptions,
  accDiv,
  timeCutdown,
} from '../../util/tools';
import {
  isCardID,
  validateMobile,
  isVehicleClass,
} from '../../util/basic_validate';
import { connect } from 'dva';
import UploadImgModal from '@/components/upload-img-modal';
import styles from './index.less';
const namespace = 'carrierInfo';

const mapDispatchToProps = dispatch => {
  return {
    getCarrierInfoFn: value => {
      return dispatch({
        type: namespace + '/getCarrierInfoModel',
        value,
      });
    },
    getDriverInfoFn: value => {
      return dispatch({
        type: namespace + '/getDriverInfoModel',
        value,
      });
    },
    addCarrierBossFn: value => {
      return dispatch({
        type: namespace + '/addCarrierBossModel',
        value,
      });
    },
    editCarrierFn: value => {
      return dispatch({
        type: namespace + '/editCarrierModel',
        value,
      });
    },
    addDriverFn: value => {
      return dispatch({
        type: namespace + '/addDriverModel',
        value,
      });
    },
    editDriverFn: value => {
      return dispatch({
        type: namespace + '/editDriverModel',
        value,
      });
    },
    scanIdCardModelFn: value => {
      return dispatch({
        //dispatch返回的是promise
        type: namespace + '/scanIdCardModel',
        value,
      });
    },
  };
};

//校验姓名
const checkName = (rule, value) => {
  if (value && !/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value)) {
    return Promise.reject('姓名输入不规范');
  }
  return Promise.resolve();
};

//校验手机号
const validateTel = (rule, value) => {
  if (value && !validateMobile(value)) {
    return Promise.reject('手机号码输入不规范');
  }
  return Promise.resolve();
};

//校验身份证
const validateId = (rule, value) => {
  if (value && !isCardID(value)) {
    return Promise.reject('身份证号输入不规范');
  }
  return Promise.resolve();
};

//校验准驾车型
const checkVehicleClass = (rule, value) => {
  if (value && !isVehicleClass(value)) {
    return Promise.reject('准驾车型输入不规范');
  }
  return Promise.resolve();
};

const AddOrEditMan = props => {
  let { title, showType } = props;
  const [form] = Form.useForm(); //新增或编辑表单-承运人
  const [driverForm] = Form.useForm(); //新增或编辑表单-司机
  const dataRef = useRef();
  const [current, setCurrent] = useState(0);
  const [isaddOrEditManFlag, setIsaddOrEditManFlag] = useState(false); //新增或编辑弹框
  const [idExpireObj, setIdExpireObj] = useState({
    switchIdChecked: false, //身份证长期
    switchDriverChecked: false, //驾驶证长期
  });
  const [carrier_uin, setCarrier_uin] = useState('');
  const [cd_id, setCd_id] = useState('');
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  //承运人(车老板)、司机(新增和编辑)
  const [carrierSubmitData, setCarrierSubmitData] = useState({
    real_name: '',
    mobile: '',
    id_card_no: '',
    address: '', //住址
    lic_issue_name: '', //签发机关
    id_expire: null, //有限期至
    id_is_long_time: 0, //1: 长期 ; 0:不是长期
    id_pic1: '', //身份证头像页
    id_pic2: '', //身份证国徽页
    picListShowFront: [],
    picListShowBack: [],
  });

  //身份证长期
  const changeSwitchIdChecked = status => {
    setIdExpireObj({
      ...idExpireObj,
      switchIdChecked: status,
    });
    setCarrierSubmitData({
      ...carrierSubmitData,
      id_is_long_time: status ? 1 : 0,
    });
  };
  const changeDatePicker = (date, dateString) => {
    setCarrierSubmitData({
      ...carrierSubmitData,
      id_expire: dateString,
    });
  };

  //驾驶证
  const [driverIdSubmitData, setDriverIdSubmitData] = useState({
    driver_name: '', //姓名
    vehicle_class: '', //准驾车型
    driver_lic_pic: '',
    driver_lic_side_pic: '',
    driver_issuing_organizations: '', //驾驶证发证机关
    valid_period_from: '', //有限期起
    valid_period_to: '', //有限期至
    driver_lic_is_long_time: 0, //1: 长期 ; 0:不是长期
    driverPicListShowFront: [],
    driverPicListShowBack: [],
  });

  //驾驶证长期
  const changeSwitchDriverChecked = status => {
    setIdExpireObj({
      ...idExpireObj,
      switchDriverChecked: status, //驾驶证长期
    });
    setDriverIdSubmitData({
      ...driverIdSubmitData,
      driver_lic_is_long_time: status ? 1 : 0,
    });
  };
  const changeDateDriverPicker = (date, dateString) => {
    setDriverIdSubmitData({
      ...driverIdSubmitData,
      valid_period_to: dateString,
    });
  };

  //提交表单--承运人
  const onCarrierFinish = async fieldsValue => {
    if (showType == 'opCarrier') {
      let { id_is_long_time, id_pic1, id_pic2 } = carrierSubmitData,
        res = null,
        values = {
          ...fieldsValue,
          id_expire: fieldsValue.id_expire
            ? fieldsValue['id_expire'].format('YYYY-MM-DD')
            : '',
          id_is_long_time,
          id_pic1,
          id_pic2,
        };
      try {
        if (carrier_uin) {
          values = {
            ...values,
            carrier_uin,
          };
          res = await props.editCarrierFn(qs.stringify(values));
        } else {
          res = await props.addCarrierBossFn(qs.stringify(values));
        }
        res
          .json()
          .then(data => {
            if (data.code == 0) {
              message.success({
                content: data.msg,
                duration: 1,
                onClose: () => {
                  closeModal();
                  props.addOrEditManCallList();
                },
              });
            } else {
              message.warning(data.msg || '系统错误');
            }
          })
          .catch(err => {
            message.warning(err || '系统错误');
          });
      } catch (e) {
        message.warning(e || '系统错误');
      }
    } else {
      dataRef.current = fieldsValue;
      setCurrent(current + 1);
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  //提交表单--司机
  const onDriverFinish = async fieldsValue => {
    let { id_expire } = dataRef.current,
      { valid_period_from, valid_period_to } = fieldsValue,
      { id_is_long_time, id_pic1, id_pic2 } = carrierSubmitData,
      {
        driver_lic_is_long_time,
        driver_lic_pic,
        driver_lic_side_pic,
      } = driverIdSubmitData,
      res = null,
      values = {
        ...fieldsValue,
        ...dataRef.current,
        id_expire: id_expire ? id_expire.format('YYYY-MM-DD') : '',
        valid_period_from: valid_period_from
          ? valid_period_from.format('YYYY-MM-DD')
          : '',
        valid_period_to: valid_period_to
          ? valid_period_to.format('YYYY-MM-DD')
          : '',
        id_is_long_time,
        driver_lic_is_long_time,
        id_pic1,
        id_pic2,
        driver_lic_pic,
        driver_lic_side_pic,
      };
    if (cd_id) {
      values = {
        ...values,
        cd_id,
      };
      res = await props.editDriverFn(qs.stringify(values));
    } else {
      res = await props.addDriverFn(qs.stringify(values));
    }
    try {
      res
        .json()
        .then(data => {
          if (data.code == 0) {
            message.success({
              content: data.msg,
              duration: 1,
              onClose: () => {
                closeModal();
                props.addOrEditManCallList();
              },
            });
          } else {
            message.warning(data.msg || '系统错误');
          }
        })
        .catch(err => {
          message.warning(err || '系统错误');
        });
    } catch (e) {
      message.warning(e || '系统错误');
    }
  };

  //关闭弹框
  const closeModal = () => {
    form.resetFields();
    driverForm.resetFields();
    setCarrierSubmitData({
      ...carrierSubmitData,
      real_name: '',
      mobile: '',
      id_card_no: '',
      address: '',
      lic_issue_name: '',
      id_expire: null,
      id_is_long_time: 0,
      id_pic1: '',
      id_pic2: '',
      picListShowFront: [],
      picListShowBack: [],
    });
    setDriverIdSubmitData({
      ...driverIdSubmitData,
      driver_name: '', //姓名
      vehicle_class: '', //准驾车型
      driver_lic_pic: '',
      driver_lic_side_pic: '',
      driver_issuing_organizations: '', //驾驶证发证机关
      valid_period_from: '', //有限期起
      valid_period_to: '', //有限期至
      driver_lic_is_long_time: 0, //1: 长期 ; 0:不是长期
      driverPicListShowFront: [],
      driverPicListShowBack: [],
    });
    setCurrent(0);
    setIsaddOrEditManFlag(false);
    // setTimestamp(new Date().getTime());
  };

  //父组件调用子组件方法
  useImperativeHandle(props.onRef, () => {
    return {
      setAdd: value => {
        closeModal();
        setIsaddOrEditManFlag(true);
      },
      setUinOrId: async value => {
        setIsaddOrEditManFlag(true);
        let res = null;
        if (showType == 'opCarrier') {
          let { carrier_uin } = value;
          setCarrier_uin(carrier_uin);
          res = await props.getCarrierInfoFn({ carrier_uin });
        } else {
          let { cd_id, carrier_uin } = value;
          setCarrier_uin(carrier_uin);
          setCd_id(cd_id);
          res = await props.getDriverInfoFn({ cd_id });
        }
        if (res) {
          let {
            data: {
              real_name,
              mobile,
              id_card_no,
              address,
              lic_issue_name,
              id_expire,
              id_pic1,
              id_pic1_text,
              id_pic2,
              id_pic2_text,
              driver_lic_pic,
              driver_lic_pic_text,
              driver_lic_side_pic,
              driver_lic_side_pic_text,
              driver_name,
              vehicle_class,
              driver_issuing_organizations,
              valid_period_from,
              valid_period_to,
              driver_mobile,
              driver_id,
              remark,
              driver_lic_is_long_time,
              audit_status,
            },
          } = res;
          setCarrierSubmitData({
            ...carrierSubmitData,
            ...res.data,
            picListShowFront: [
              {
                uid: new Date().getTime(),
                name: props.title,
                status: 'done',
                url: id_pic1_text,
                media_path_source: id_pic1,
                thumbUrl: id_pic1_text,
              },
            ],
            picListShowBack: [
              {
                uid: new Date().getTime(),
                name: props.title,
                status: 'done',
                url: id_pic2_text,
                media_path_source: id_pic2,
                thumbUrl: id_pic2_text,
              },
            ],
          });
          if (showType == 'opCarrier') {
            form.setFieldsValue({
              real_name,
              mobile,
              id_card_no,
              address,
              lic_issue_name,
              id_expire: Boolean(id_expire * 1)
                ? moment(formatDateYMD(id_expire), 'YYYY-MM-DD')
                : null,
            });
          } else {
            setDriverIdSubmitData({
              ...driverIdSubmitData,
              ...res.data,
              driverPicListShowFront: [
                {
                  uid: new Date().getTime(),
                  name: props.title,
                  status: 'done',
                  url: driver_lic_pic_text,
                  media_path_source: driver_lic_pic,
                  thumbUrl: driver_lic_pic_text,
                },
              ],
            });
            if (driver_lic_side_pic_text) {
              setDriverIdSubmitData({
                ...driverIdSubmitData,
                ...res.data,
                driverPicListShowBack: [
                  {
                    uid: new Date().getTime(),
                    name: props.title,
                    status: 'done',
                    url: driver_lic_side_pic_text,
                    media_path_source: driver_lic_side_pic,
                    thumbUrl: driver_lic_side_pic_text,
                  },
                ],
              });
            }
            form.setFieldsValue({
              real_name: driver_name,
              mobile: driver_mobile,
              id_card_no: driver_id,
              address,
              lic_issue_name,
              id_expire: Boolean(id_expire * 1)
                ? moment(formatDateYMD(id_expire), 'YYYY-MM-DD')
                : null,
            });
            driverForm.setFieldsValue({
              driver_name,
              vehicle_class,
              driver_lic_pic,
              driver_lic_side_pic,
              driver_issuing_organizations, //驾驶证发证机关
              valid_period_from: Boolean(valid_period_from * 1)
                ? moment(formatDateYMD(valid_period_from), 'YYYY-MM-DD')
                : null, //有限期起
              valid_period_to: Boolean(valid_period_to * 1)
                ? moment(formatDateYMD(valid_period_to), 'YYYY-MM-DD')
                : null, //有限期至
              driver_lic_is_long_time,
              remark,
            });
          }
        }
      },
    };
  });

  //子组件传过来的的身份头像页
  const rePicFrontFromChild = async file => {
    try {
      const res = await props.scanIdCardModelFn({
        pic_url: file,
        pic_type: 2,
        scanUrl: '/Ocr/driverCardFrontRecon',
      });

      if (res.code == 0) {
        form.setFieldsValue(res.data);
        setCarrierSubmitData({
          ...carrierSubmitData,
          ...res.data,
          id_pic1: file,
        });
      } else {
        message.warning(res.msg || '系统错误');
      }
    } catch (e) {}
  };
  //删除身份证证头像页
  const rePicFrontDel = () => {
    setCarrierSubmitData({
      ...carrierSubmitData,
      picListShowFront: [],
    });
  };
  //子组件传过来的的身份证国徽页
  const rePicBackFromChild = async file => {
    try {
      const res = await props.scanIdCardModelFn({
        pic_url: file,
        pic_type: 3,
        scanUrl: '/Ocr/driverCardBackRecon',
      });
      if (res.code == 0) {
        let { lic_issue_name, id_expire } = res.data;
        form.setFieldsValue({
          lic_issue_name,
          id_expire: moment(id_expire, 'YYYY-MM-DD'),
        });
        setIdExpireObj({
          ...idExpireObj,
          switchIdChecked: res.data.id_is_long_time == 1 ? true : false,
        });
        setCarrierSubmitData({
          ...carrierSubmitData,
          ...res.data,
          id_pic2: file,
        });
      } else {
        message.warning(res.msg || '系统错误');
      }
    } catch (e) {}
  };

  //删除身份证证头像页
  const rePicBackDel = () => {
    setCarrierSubmitData({
      ...carrierSubmitData,
      picListShowBack: [],
    });
  };

  //子组件传过来的的驾驶证正页
  const reDriverLicFrontFromChild = async file => {
    try {
      const res = await props.scanIdCardModelFn({
        pic_url: file,
        pic_type: 5,
        scanUrl: '/Ocr/driverLicenseFrontRecon',
      });
      if (res.code == 0) {
        let { valid_period_from, valid_period_to } = res.data;
        driverForm.setFieldsValue({
          ...res.data,
          valid_period_from: moment(valid_period_from, 'YYYY-MM-DD'),
          valid_period_to: moment(valid_period_to, 'YYYY-MM-DD'),
        });
        setDriverIdSubmitData({
          ...driverIdSubmitData,
          ...res.data,
          driver_lic_pic: file,
        });
      } else {
        message.warning(res.msg || '系统错误');
      }
    } catch (e) {
      message.warning(e || '系统错误');
    }
  };

  //删除驾驶证正页
  const reDriverLicFrontDel = () => {
    setDriverIdSubmitData({
      ...driverIdSubmitData,
      driverPicListShowFront: [],
    });
  };

  //子组件传过来的的驾驶证副页
  const reDriverLicBackFromChild = file => {
    if (file && file.response) {
      let {
        response: {
          data: { media_path_source },
        },
      } = file;
      setDriverIdSubmitData({
        ...driverIdSubmitData,
        driver_lic_side_pic: media_path_source,
      });
    }
  };

  //删除驾驶证副页
  const reDriverLicBackDel = () => {
    setDriverIdSubmitData({
      ...driverIdSubmitData,
      driverPicListShowBack: [],
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  //步骤
  const steps = [
    {
      title: '1',
    },
    {
      title: '2',
    },
  ];

  return (
    <>
      <Modal
        forceRender
        title={title}
        width={638}
        visible={isaddOrEditManFlag}
        onCancel={closeModal}
        footer={null}
      >
        {showType == 'opDriver' && (
          <Steps current={current} style={{ paddingBottom: '20px' }}>
            {steps.map(item => (
              <Step key={item.title} />
            ))}
          </Steps>
        )}
        <Form
          style={{ display: current == 0 ? 'block' : 'none' }}
          form={form}
          {...formItemLayout}
          onFinish={onCarrierFinish}
          scrollToFirstError
          initialValues={{
            real_name: '',
            mobile: '',
            id_card_no: '',
            address: '',
            lic_issue_name: '',
            id_expire: null,
          }}
        >
          <div>
            <Row className={styles.upload_row}>
              <Col span={12}>
                <Form.Item label="身份证头像页">
                  <UploadImgModal
                    title="身份证头像页"
                    data={{
                      service_type: 20010,
                      media_type: 201,
                      service_no: timestamp,
                    }}
                    picListShow={carrierSubmitData.picListShowFront}
                    delPicUrl="waybill/delvechilePic"
                    flag="rePicFront"
                    rePicFront={rePicFrontFromChild}
                    rePicFrontDel={rePicFrontDel}
                    count={1}
                  />
                </Form.Item>
                <Popover
                  className={styles.tips}
                  content={<img src={require('@/assets/example_01.png')} />}
                  trigger="hover"
                >
                  <Button style={{ position: 'absolute', top: '40px' }}>
                    示例
                  </Button>
                </Popover>
              </Col>
              <Col span={12}>
                <Form.Item label="身份证国徽页">
                  <UploadImgModal
                    title="身份证国徽页"
                    data={{
                      service_type: 20010,
                      media_type: 201,
                      service_no: timestamp,
                    }}
                    picListShow={carrierSubmitData.picListShowBack}
                    delPicUrl="waybill/delvechilePic"
                    flag="rePicBack"
                    rePicBack={rePicBackFromChild}
                    rePicBackDel={rePicBackDel}
                    count="1"
                  />
                </Form.Item>
                <Popover
                  className={styles.tips}
                  content={<img src={require('@/assets/example_02.png')} />}
                  trigger="hover"
                >
                  <Button style={{ position: 'absolute', top: '40px' }}>
                    示例
                  </Button>
                </Popover>
              </Col>
            </Row>
            <Row className={styles.submit_form}>
              <Col span={24}>
                <Form.Item
                  label="姓名"
                  name="real_name"
                  rules={[
                    {
                      required: true,
                      message: '姓名未输入',
                    },
                    {
                      validator: checkName,
                    },
                  ]}
                >
                  <Input placeholder="请输入姓名" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="手机号"
                  name="mobile"
                  rules={[
                    {
                      required: true,
                      message: '手机号未输入',
                    },
                    {
                      validator: validateTel,
                    },
                  ]}
                >
                  <Input placeholder="请输入手机号" maxLength={11} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="身份证号"
                  name="id_card_no"
                  rules={[
                    {
                      required: true,
                      message: '身份证号未输入',
                    },
                    {
                      validator: validateId,
                    },
                  ]}
                >
                  <Input placeholder="请输入身份证号" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="住址" name="address">
                  <Input placeholder="请输入住址" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="签发机关" name="lic_issue_name">
                  <Input placeholder="请输入签发机关" />
                </Form.Item>
              </Col>
              <Col span={24} style={{ position: 'relative' }}>
                {carrierSubmitData.id_is_long_time == 1 ? (
                  <div style={{ marginBottom: '22px' }}>
                    <div className="ant-col ant-form-item-label ant-col-xs-24 ant-col-sm-6">
                      <label title="有效期至">有效期至</label>
                    </div>
                    <div
                      style={{
                        position: 'relative',
                        left: '76px',
                        display: 'inline-block',
                        width: '310px',
                        marginRight: '10px',
                        background: '#f8f8f8',
                        padding: '5px 0 5px 12px',
                        color: '#ccc',
                      }}
                    >
                      长期
                    </div>
                  </div>
                ) : (
                  <Form.Item label="有效期至" name="id_expire">
                    <DatePicker
                      placeholder="请选择有效期"
                      style={{ width: '310px', marginRight: '10px' }}
                      onChange={changeDatePicker}
                    />
                  </Form.Item>
                )}
                <div
                  style={{ position: 'absolute', right: '48px', top: '4px' }}
                >
                  <Switch
                    size="big"
                    defaultChecked={idExpireObj.switchIdChecked}
                    onChange={changeSwitchIdChecked}
                  />
                  长期
                </div>
              </Col>
            </Row>
          </div>
          <Row className={styles.submit_content_box}>
            {showType == 'opCarrier' ? (
              <Button
                style={{ margin: '0 8px' }}
                type="primary"
                htmlType="submit"
              >
                确定
              </Button>
            ) : (
              current < steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  下一步
                </Button>
              )
            )}
          </Row>
        </Form>
        <Form
          style={{ display: current == 1 ? 'block' : 'none' }}
          form={driverForm}
          {...formItemLayout}
          onFinish={onDriverFinish}
          scrollToFirstError
          initialValues={{
            driver_name: '',
            driver_issuing_organizations: '',
            vehicle_class: '',
            valid_period_from: '',
            valid_period_to: '',
          }}
        >
          <div>
            <Row className={styles.upload_row}>
              <Col span={12}>
                <Form.Item label="驾驶证正页">
                  <UploadImgModal
                    title="驾驶证正页"
                    data={{
                      service_type: 10070,
                      media_type: 191,
                      service_no: timestamp,
                    }}
                    picListShow={driverIdSubmitData.driverPicListShowFront}
                    delPicUrl="waybill/delvechilePic"
                    flag="reDriverLicFront"
                    reDriverLicFront={reDriverLicFrontFromChild}
                    reDriverLicFrontDel={reDriverLicFrontDel}
                    count={1}
                  />
                </Form.Item>
                <Popover
                  className={styles.tips}
                  content={<img src={require('@/assets/example_08.png')} />}
                  trigger="hover"
                >
                  <Button style={{ position: 'absolute', top: '40px' }}>
                    示例
                  </Button>
                </Popover>
              </Col>
              <Col span={12}>
                <Form.Item label="驾驶证副页(选填)">
                  <UploadImgModal
                    title="驾驶证副页（选填）"
                    data={{
                      service_type: 10070,
                      media_type: 301,
                      service_no: timestamp,
                      isScan: 'no',
                    }}
                    picListShow={driverIdSubmitData.driverPicListShowBack}
                    delPicUrl="waybill/delvechilePic"
                    flag="reDriverLicBack"
                    reDriverLicBack={reDriverLicBackFromChild}
                    reDriverLicBackDel={reDriverLicBackDel}
                    count={1}
                  />
                </Form.Item>
                <Popover
                  className={styles.tips}
                  content={<img src={require('@/assets/example_07.png')} />}
                  trigger="hover"
                >
                  <Button style={{ position: 'absolute', top: '40px' }}>
                    示例
                  </Button>
                </Popover>
              </Col>
            </Row>
            <Row className={styles.submit_form}>
              <Col span={24}>
                <Form.Item label="姓名" name="driver_name">
                  <Input placeholder="请输入姓名" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="发证机关" name="driver_issuing_organizations">
                  <Input placeholder="请输入发证机关" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="准驾车型"
                  name="vehicle_class"
                  rules={[
                    {
                      required: true,
                      message: '请按照驾照上准驾车型填写',
                    },
                    {
                      validator: checkVehicleClass,
                    },
                  ]}
                >
                  <Input placeholder="请按照驾照上准驾车型填写" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="驾驶证有限期起" name="valid_period_from">
                  <DatePicker
                    placeholder="请选择驾驶证有限期"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} style={{ position: 'relative' }}>
                {driverIdSubmitData.driver_lic_is_long_time == 1 ? (
                  <div style={{ marginBottom: '22px' }}>
                    <div class="ant-col ant-form-item-label ant-col-xs-24 ant-col-sm-6">
                      <label title="驾驶证有限期止">驾驶证有限期止</label>
                    </div>
                    <div
                      style={{
                        position: 'relative',
                        left: '36px',
                        display: 'inline-block',
                        width: '310px',
                        marginRight: '10px',
                        background: '#f8f8f8',
                        padding: '5px 0 5px 12px',
                        color: '#ccc',
                      }}
                    >
                      长期
                    </div>
                  </div>
                ) : (
                  <Form.Item label="驾驶证有限期止" name="valid_period_to">
                    <DatePicker
                      placeholder="请选择有效期"
                      style={{ width: '310px', marginRight: '10px' }}
                      onChange={changeDateDriverPicker}
                    />
                  </Form.Item>
                )}
                <div
                  style={{ position: 'absolute', right: '48px', top: '4px' }}
                >
                  <Switch
                    size="big"
                    defaultChecked={idExpireObj.switchDriverChecked}
                    onChange={changeSwitchDriverChecked}
                  />
                  长期
                </div>
              </Col>
            </Row>
          </div>
          <Row className={styles.submit_content_box}>
            {current > 0 && <Button onClick={() => prev()}>上一步</Button>}
            {current === steps.length - 1 && (
              <Button
                style={{ margin: '0 8px' }}
                type="primary"
                htmlType="submit"
              >
                确定
              </Button>
            )}
          </Row>
        </Form>
      </Modal>
    </>
  );
};
const memoAddOrEditMan = React.memo(AddOrEditMan);
export default connect(null, mapDispatchToProps)(memoAddOrEditMan);
