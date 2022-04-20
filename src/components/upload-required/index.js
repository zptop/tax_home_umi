import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import UploadImgModal from '../upload-img-modal';
import { connect } from 'dva';
import styles from './index.css';
const namespace = 'waybill';
const mapStateToProps = state => {
  let { waybillDetailInfo } = state[namespace];
  return {
    waybillDetailInfo,
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

const UploadRequired = props => {
  let { waybill_no, waybillDetailInfo } = props;
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
    return arr_temp;
  };

  //删除图片
  const delImgSucc = () => {
    props.getWaybillDetailFn({ waybill_no });
  };

  useEffect(() => {
    props.getWaybillDetailFn({ waybill_no });
  }, [waybill_no]);

  return (
    <div>
      {waybillDetailInfo && Object.keys(waybillDetailInfo).length && (
        <div>
          <Row>
            <Col span={8}>
              <DescriptionItem
                title="承运人"
                content={waybillDetailInfo.carrier_name}
              />
            </Col>
            <Col span={8}>
              <DescriptionItem
                title="车牌号/船名"
                content={waybillDetailInfo.trans_vehicle_name}
              />
            </Col>
            <Col span={8}>
              <DescriptionItem
                title="驾驶员"
                content={waybillDetailInfo.transport_name}
              />
            </Col>
          </Row>
          <div className={styles.title_item}>
            <h2>上传回单</h2>
            <UploadImgModal
              data={{
                service_no: waybill_no,
                service_type: 30010,
                media_type: 61,
              }}
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
              picListShow={showBackImg(
                waybillDetailInfo.contract_media,
                '合同图片',
              )}
              delPicUrl="waybill/delpic"
              flag="contractImg"
              payImgDel={delImgSucc}
              count="9"
            />
          </div>
        </div>
      )}
    </div>
  );
};
const memoUploadRequired = React.memo(UploadRequired);
export default connect(mapStateToProps, mapDispatchToProps)(memoUploadRequired);
