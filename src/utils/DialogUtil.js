import React from 'react';
import { notification, Icon, Modal } from 'antd';
/**
 * This class provides functions that show notifications and dialogs from the ANTD library.
 * The code was based on component documentation at https://ant.design/components/notification/ and https://ant.design/components/modal/
 */
class DialogUtil {
  
  /**
   * This function shows a error notification generated by the "notification" component provided by the antd library.
   * @param {string} title Messages's title
   * @param {string} message Messages's body
   */
  static showErrorNotification(title, message){
    notification.open({
      message: title,
      description: message,
      icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
    });
  };
 /**
   * This function shows a success notification generated by the "notification" component provided by the antd library.
   * @param {string} title Messages's title
   * @param {string} message Messages's body
   */
  static showSuccessNotification(title, message) {
    notification.open({
      message: title || 'Success',
      description: message,
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    })
  }
 /**
   * This function shows an information dialog generated by the "Modal" component provided by the antd library.
   * @param {string} message Messages's body
   */
  static showInfoMessage(message){
    Modal.info({
      title: message,
      content: '' ,
      onOk() {},
    });
  };
 /**
   * This function shows a sucess dialog generated by the "Modal" component provided by the antd library.
   * @param {string} message Messages's body
   */
  static showSuccessMessage (message) {
    Modal.success({
      title: message,
      content: '',
    });
  };
  
 /**
   * This function shows an error dialog generated by the "Modal" component provided by the antd library.
   * @param {string} message Messages's body
   */
  static showErrorMessage(message){
    Modal.error({
      title: message,
      content: '',
    });
  };
  
  /**
   * This function shows a warning dialog generated by the "Modal" component provided by the antd library.
   * @param {string} message Messages's body
   */
  static showWarningMessage(message) {
    Modal.warning({
      title: message,
      content: '',
    });
  };

  /**
   * This function shows a confirmation dialog generated by the "Modal" component provided by the antd library.
   * @param {string} title Message's title 
   * @param {string} message Message's body 
   * @param {function} callbackOk Callback function executed after confirmation
   * @param {function} callbackCancel Callback function executed after cancellation
   */
   static showConfirm(message, callbackOk, callbackCancel) {
    Modal.confirm({
      title: message,
      content: '',
      okText: 'Ok',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        if (callbackOk) {
          callbackOk();
        }
      },
      onCancel() {
        if (callbackCancel) {
          callbackCancel();
        }
      },
    });
  };
}

export default DialogUtil;
