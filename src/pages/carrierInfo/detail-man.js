import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <div className="site-description-item-profile-p-label">
      <span className={styles.detail_info_title}>{title}</span>
      {content}
    </div>
  </div>
);
const namespace = 'carrierInfo';

const mapDispatchToProps = dispatch => {
  return {
    //承运人详情
    getCarrierInfoFn: value => {
      return dispatch({
        type: namespace + '/getCarrierInfoModel',
        value,
      });
    },
    //司机详情
    getDriverInfoFn: value => {
      return dispatch({
        type: namespace + '/getDriverInfoModel',
        value,
      });
    },
  };
};
const DetailMan = props => {
  let {
    showType,
    carrier_uin,
    cd_id,
    getCarrierInfoFn,
    getDriverInfoFn,
  } = props;
  const [detailInfoObj, setDetailInfoObj] = useState(null);
  //驾驶证列表
  const driverIdList = arr => {
    return arr.map((item, index) => (
      <div className={styles.driver_img_box} key={index}>
        <Image src={item} />
      </div>
    ));
  };

  useEffect(() => {
    async function fetchData() {
      if (showType == 'detailCarrier') {
        let { data } = await getCarrierInfoFn({ carrier_uin });
        setDetailInfoObj(data);
      } else {
        let { data } = await getDriverInfoFn({ cd_id });
        setDetailInfoObj(data);
      }
    }
    fetchData();
  }, [showType == 'detailCarrier' ? carrier_uin : cd_id]);

  return (
    <>
      {detailInfoObj ? (
        <div className={styles.detail_info_box}>
          <p className={styles.split_line}>基础信息</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="姓名"
                content={
                  showType == 'detailCarrier'
                    ? detailInfoObj.real_name
                    : detailInfoObj.driver_name
                }
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="手机号"
                content={
                  showType == 'detailCarrier'
                    ? detailInfoObj.mobile
                    : detailInfoObj.driver_mobile
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="身份证号"
                content={
                  showType == 'detailCarrier'
                    ? detailInfoObj.id_card_no
                    : detailInfoObj.driver_id
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="身份证头像面"
                content={
                  detailInfoObj.id_pic1_text ? (
                    <Image src={detailInfoObj.id_pic1_text} />
                  ) : (
                    '暂无图片'
                  )
                }
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="身份证国徽面"
                content={
                  detailInfoObj.id_pic2_text ? (
                    <Image src={detailInfoObj.id_pic2_text} />
                  ) : (
                    '暂无图片'
                  )
                }
              />
            </Col>
          </Row>
          {showType == 'detailDriver' && (
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="驾驶证"
                  content={
                    detailInfoObj.driver_lic_list_text.split(',').length
                      ? driverIdList(
                          detailInfoObj.driver_lic_list_text.split(','),
                        )
                      : '暂无图片'
                  }
                />
              </Col>
            </Row>
          )}
          {showType == 'detailCarrier' && (
            <div>
              <p className={styles.split_line}>结算银行卡信息</p>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="银行卡号"
                    content={detailInfoObj.bank_card_no}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="持卡人姓名"
                    content={detailInfoObj.account_name}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="持卡人身份证号"
                    content={detailInfoObj.bank_id_card_no}
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};
const memoDetailMan = React.memo(DetailMan);
export default connect(null, mapDispatchToProps)(memoDetailMan);
