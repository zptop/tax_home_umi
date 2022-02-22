import React, { useState, useEffect, useImperativeHandle } from 'react';
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
  Popover,
  Tooltip,
  Drawer,
} from 'antd';
import {
  formatDateYMD,
  formatSelectedOptions,
  accDiv,
  timeCutdown,
} from '../../util/tools';
import { connect } from 'dva';
import UploadImgModal from '@/components/upload-img-modal';
import styles from './index.less';
const mapStateToProps = state => {};
const mapDispatchToProps = dispatch => {};
const AddOrEditMan = props => {
  let { title } = props;
  const [form] = Form.useForm(); //新增或编辑表单
  const [isaddOrEditManFlag, setIsaddOrEditManFlag] = useState(false);
  //承运人(车老板)、司机(新增和编辑)
  const [carrierSubmitData, setCarrierSubmitData] = useState({
    real_name: '',
    mobile: '',
    id_card_no: '',
    address: '', //住址
    lic_issue_name: '', //签发机关
    id_expire: '', //有限期至
    id_is_long_time: 0, //1: 长期 ; 0:不是长期
  });

  //驾驶证
  const [driverIdSubmitData, setDriverIdSubmitData] = useState({
    driver_name: '', //姓名
    vehicle_class: '', //准驾车型
    driver_issuing_organizations: '', //驾驶证发证机关
    valid_period_from: '', //有限期起
    valid_period_to: '', //有限期至
    driver_lic_is_long_time: 0, //1: 长期 ; 0:不是长期
  });

  //提交表单
  const onFinish = values => {};

  //关闭弹框
  const closeModal = () => {
    setIsaddOrEditManFlag(false);
  };

  //父组件调用子组件方法
  useImperativeHandle(props.onRef, () => {
    return {
      setAddOrEditManModal: () => {
        setIsaddOrEditManFlag(true);
      },
    };
  });

  //身份证正页
  const getIdPicFront = () => {
    return [];
  };
  //子组件传过来的的身份证页
  const rePicFrontFromChild = () => {};

  //身份证国徽页
  const getIdPicBack = () => {
    return [];
  };
  //子组件传过来的的身份证国徽页
  const rePicBackFromChild = () => {};

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
  return (
    <>
      <Modal
        title={title}
        width={638}
        visible={isaddOrEditManFlag}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
          scrollToFirstError
          initialValues={{}}
        >
          <Row className={styles.upload_row}>
            <Col span={12}>
              <Form.Item label="身份证头像页">
                <UploadImgModal
                  data={{
                    service_type: 20010,
                    media_type: 201,
                  }}
                  picListShow={getIdPicFront()}
                  delPicUrl="waybill/delpic"
                  flag="rePicFront"
                  rePicFront={rePicFrontFromChild}
                  count="1"
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
                  data={{
                    service_type: 20010,
                    media_type: 201,
                  }}
                  picListShow={getIdPicBack()}
                  delPicUrl="waybill/delpic"
                  flag="rePicBack"
                  rePicBack={rePicBackFromChild}
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

          <Row className={styles.submit_content_box}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
const memoAddOrEditMan = React.memo(AddOrEditMan);
export default connect(mapStateToProps, mapDispatchToProps)(memoAddOrEditMan);
