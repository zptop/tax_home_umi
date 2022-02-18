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
import {
  formatDateYMD,
  formatSelectedOptions,
  accDiv,
  timeCutdown,
} from '../../util/tools';
import { connect } from 'dva';
import styles from './index.less';
const mapStateToProps = state => {};
const mapDispatchToProps = dispatch => {};
const AddOrEditMan = props => {
  let { title } = props;
  const [isaddOrEditManFlag, setIsaddOrEditManFlag] = useState(true);
  const [form] = Form.useForm(); //新增或编辑表单

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
        ></Form>
      </Modal>
    </>
  );
};
const memoAddOrEditMan = React.memo(AddOrEditMan);
export default connect(mapStateToProps, mapDispatchToProps)(memoAddOrEditMan);
