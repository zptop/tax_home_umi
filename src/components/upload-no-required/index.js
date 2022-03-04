import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Modal, Button, Form, Input, Radio, message } from 'antd';
import { accMul, accDiv } from '../../util/tools';
import UploadImgModal from '../upload-img-modal';
import { connect } from 'dva';
const namespace = 'waybill';
import styles from './index.less';
const mapStateToProps = state => {
  let waybillDetailInfo = state[namespace].waybillNoInfo || {};
  let payChannelArr = state[namespace].payChannelArr || [];
  let isNoRequiredModalVisible = state[namespace].isNoRequiredModalVisible;
  return {
    waybillDetailInfo,
    payChannelArr,
    isNoRequiredModalVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWaybillDetailFn: value => {
      dispatch({
        type: namespace + '/getWaybillDetailModel',
        value,
      });
    },
    getPayChannelFn: value => {
      dispatch({
        type: namespace + '/getPayChannelModel',
        value,
      });
    },
    uploadNoRequiredSubmitFn: value => {
      dispatch({
        type: namespace + '/uploadNoRequiredSubmitModel',
        value,
      });
    },
  };
};

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const UploadNoRequired = props => {
  let { waybill_no, waybillDetailInfo } = props;
  const [form] = Form.useForm();
  const [isShowPayChannel, setIsShowPayChannel] = useState(false);
  const reply_media_ids = useRef(null);
  const contract_media_ids = useRef(null);
  const pay_media_ids = useRef(null);

  //回显图片
  const showBackImg = (arr, title) => {
    const arr_temp = arr.map(item => {
      return {
        uid: item.media_id,
        media_id: item.media_id,
        name: title,
        status: 'done',
        url: item.media_path,
        thumbUrl: item.media_thumb,
      };
    });
    switch (title) {
      case '回单图片':
        reply_media_ids.current = arr_temp;
        break;
      case '合同图片':
        contract_media_ids.current = arr_temp;
        break;
      case '支付凭证':
        pay_media_ids.current = arr_temp;
        break;
    }
    return arr_temp;
  };

  useEffect(() => {
    props.getWaybillDetailFn({ waybill_no });
    if (Object.keys(waybillDetailInfo).length) {
      let { waybill_amount, pay_style, pay_channel } = waybillDetailInfo;
      form.setFieldsValue({
        waybill_amount,
        pay_style,
        pay_channel,
      });
    }
  }, [waybill_no]);

  const onFinish = fieldsValue => {
    let values = {
      ...fieldsValue,
      waybill_no,
      waybill_amount: accMul(fieldsValue['waybill_amount'], 100),
      reply_media_ids:
        reply_media_ids.current.map(item => item.media_id).join(',') || '',
      contract_media_ids:
        contract_media_ids.current.map(item => item.media_id).join(',') || '',
      pay_media_ids:
        pay_media_ids.current.map(item => item.media_id).join(',') || '',
      transportType: props.transportType,
    };
    props.uploadNoRequiredSubmitFn(values);
    props.closeModelFromChild(props.isNoRequiredModalVisible);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  //快捷输入
  const quickChecked = e => {
    form.setFieldsValue({ pay_style: e.target.value });
  };

  //渲染支付渠道
  const renderPayChannelArr = arr => {
    return arr.map((item, index) => (
      <div
        className={styles.item}
        key={index}
        onClick={() => selectPayChannel(item.chan_name)}
      >
        {item.chan_name}
      </div>
    ));
  };

  //选择支付渠道
  const selectPayChannel = name => {
    if (name) {
      form.setFieldsValue({ pay_channel: name });
      setIsShowPayChannel(false);
    }
  };

  //支付渠道获取焦点
  const getOnFocus = () => {
    setIsShowPayChannel(true);
  };
  const searchPayChanner = e => {
    let name = e.target.value;
    setIsShowPayChannel(true);
    props.getPayChannelFn({ name: name || null });
  };

  //删除图片
  const delImgSucc = () => {
    props.getWaybillDetailFn({ waybill_no });
  };

  return (
    <div>
      <Form
        form={form}
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          waybill_amount: '',
          pay_style: '',
          pay_channel: '',
        }}
      >
        <Form.Item
          label="合同金额"
          name="waybill_amount"
          rules={[
            {
              required: true,
              message: '合同金额未输入',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="支付方式"
          name="pay_style"
          rules={[
            {
              required: true,
              message: '支付方式未输入',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="快捷输入">
          <Radio.Group
            buttonStyle="solid"
            onChange={quickChecked}
            value={waybillDetailInfo.pay_style || ''}
          >
            <Radio.Button value="银行转账">银行转账</Radio.Button>
            <Radio.Button value="第三方支付">第三方支付</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="支付渠道"
          name="pay_channel"
          rules={[
            {
              required: true,
              message: '支付渠道未输入',
            },
          ]}
        >
          <Input onFocus={getOnFocus} onChange={e => searchPayChanner(e)} />
        </Form.Item>
        {isShowPayChannel && (
          <div className={styles.pay_channel_content}>
            {renderPayChannelArr(props.payChannelArr)}
          </div>
        )}
        {Object.keys(waybillDetailInfo).length && (
          <>
            <div className={styles.title_item}>
              <h2>上传回单</h2>
              <UploadImgModal
                data={{
                  service_no: waybill_no,
                  service_type: 30010,
                  media_type: 61,
                }}
                title="回单图片"
                picListShow={showBackImg(
                  waybillDetailInfo.reply_media,
                  '回单图片',
                )}
                delPicUrl="waybill/delpic"
                flag="replyImg"
                replyImgDel={delImgSucc}
                count="9"
              />
            </div>
            <div className={styles.title_item}>
              <h2>上传合同（收票方与承运方签署的）</h2>
              <UploadImgModal
                data={{
                  service_no: waybill_no,
                  service_type: 30010,
                  media_type: 21,
                }}
                title="合同图片"
                picListShow={showBackImg(
                  waybillDetailInfo.contract_media,
                  '合同图片',
                )}
                delPicUrl="waybill/delpic"
                flag="contractImg"
                contractImgDel={delImgSucc}
                count="9"
              />
            </div>
            <div className={styles.title_item}>
              <h2>银行支付凭证（支付给承运人的凭证）</h2>
              <UploadImgModal
                data={{
                  service_no: waybill_no,
                  service_type: 30010,
                  media_type: 10,
                }}
                title="支付凭证"
                picListShow={showBackImg(
                  waybillDetailInfo.pay_media,
                  '支付凭证',
                )}
                delPicUrl="waybill/delpic"
                flag="payImg"
                payImgDel={delImgSucc}
                count="16"
              />
            </div>
          </>
        )}
        <Form.Item
          {...tailLayout}
          style={{ textAlign: 'right', marginBottom: 0 }}
        >
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const memoUploadNoRequired = React.memo(UploadNoRequired);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memoUploadNoRequired);
