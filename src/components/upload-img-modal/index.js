import React, { useState, useEffect } from 'react';
import { Button, Upload, Modal, message, Image } from 'antd';
import {
  CloudUploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { getBaseUrl } from '../../util/tools';
import { connect } from 'dva';
const namespace = 'waybill';
const mapDispatchToProps = dispatch => {
  return {
    delImgFromWaybillFn: value => {
      return dispatch({
        type: namespace + '/delImgFromWaybillModel',
        value,
      });
    },
    delImgFromVehicleFn: value => {
      dispatch({
        type: namespace + '/delImgFromVehicleModel',
        value,
      });
    },
  };
};

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const UploadImgModal = props => {
  const [objState, setObjState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setObjState({
      ...objState,
      previewVisible: false,
      fileList: props.picListShow,
    });
    console.log('picListShow:', props.picListShow);
  }, [props.picListShow]);

  const handleCancel = () => {
    setObjState({ ...objState, previewVisible: false });
  };

  //预览
  const handlePreview = async file => {
    let url;
    if (file.url) {
      url = file.url;
    }
    if (file.response) {
      url = file.response.data.media_path;
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setObjState({
      ...objState,
      previewImage: url,
      previewVisible: true,
      previewTitle:
        props.title || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  //上传
  const handleChange = ({ file, fileList }) => {
    if (file.status === 'uploading') {
      setLoading(true);
    }
    if (file && file.response) {
      let {
        response: {
          data: { media_path_source },
          code,
          msg,
        },
      } = file;
      if (code == 0) {
        setLoading(false);
        let {
          data: { service_no, isScan },
        } = props;
        if (/^[0-9]*$/.test(service_no)) {
          if (isScan == 'no') {
            flag(file);
          } else {
            props[props.flag](media_path_source); //子组件通过函数传值到父组件(ocr扫描用)
          }
        }
        setObjState({ ...objState, fileList });
      } else {
        message.warning(msg);
      }
    }
  };

  //删除
  const handleonRemove = file => {
    var media_id = null;
    let { response } = file;
    if (response) {
      //新上传-删除
      var {
        response: {
          data: { media_id },
        },
      } = file;
      media_id = media_id;
    } else {
      //详情-删除
      media_id = file.media_id;
    }
    if (file) {
      if (props.delPicUrl == 'waybill/delpic') {
        //删除运单图片
        props.delImgFromWaybillFn({ media_id }).then(res => {
          if (res.code == 0) {
            props[props.flag + 'Del']({ media_id, flag: props.flag });
          }
        });
      } else {
        //删除车辆图片
        props.delImgFromVehicleFn({ media_id });
      }
    }
  };

  //上传之前钩子
  const beforeUpload = file => {
    return new Promise((resolve, reject) => {
      let suff = /\.[^\.]+$/.exec(file.name)[0];
      if (!/(\.jpeg|\.png|\.jpg|\.pdf)/i.test(suff)) {
        message.warning('文件格式不正确');
        return reject(false);
      }
      return resolve(true);
    });
  };
  const { previewVisible, previewImage, fileList, previewTitle } = objState;

  // sevice_no为时间戳时不传（司机管理）
  // sevice_no中含有字母时，要传（运单）
  const { service_no, ...service_media_type } = props.data;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      {/* <CloudUploadOutlined style={{ fontSize: '20px' }} /> */}
      <div style={{ fontSize: '12px' }}>上传</div>
    </div>
  );
  return (
    <div>
      {fileList && (
        <Upload
          action={getBaseUrl() + '/waybill/addpic'}
          name="media_file"
          withCredentials={true}
          listType="picture-card"
          data={/^[0-9]*$/.test(service_no) ? service_media_type : props.data}
          fileList={fileList}
          headers={{ 'Access-WR-Token': localStorage.getItem('x-auth-token') }}
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
          onRemove={handleonRemove}
          onChange={handleChange}
          accept="image/*,.pdf"
        >
          {fileList.length >= props.count * 1 ? null : uploadButton}
        </Upload>
      )}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={[
          <Button key="关闭" onClick={handleCancel}>
            关闭
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <Image
          style={{ width: '100%', cursor: 'pointer' }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};
const memoUploadImgModal = React.memo(UploadImgModal);
export default connect(null, mapDispatchToProps)(memoUploadImgModal);
