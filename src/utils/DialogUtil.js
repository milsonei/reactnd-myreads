import React from 'react';
import { notification, Icon, Modal } from 'antd';

class DialogUtil {
  
  /**
   * Mostra uma janela de diálogo de erro
   * @param {string} title Título
   * @param {string} message Corpo da mensagem
   */
  static showErrorNotification(title, message){
    notification.open({
      message: title,
      description: message,
      icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
    });
  };
  /**
   * Mostra uma janela de diálogo de alerta
   * @param {string} title Título
   * @param {string} message Corpo da mensagem
   */
  static showSuccessNotification(title, message) {
    notification.open({
      message: title || 'Success',
      description: message,
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    })
  }
/**
 * Mostra uma janela de diálogo de informação
 * @param {string} message Corpo da mensagem
 */
  static showInfoMessage(message){
    Modal.info({
      title: message,
      content: '' ,
      onOk() {},
    });
  };
  /**
   * Mostra uma janela de diálogo de sucesso
   * @param {string} message Corpo da mensagem
   */
  static showSuccessMessage (message) {
    Modal.success({
      title: message,
      content: '',
    });
  };
  
 /**
  * Mostra uma janela de diálogo de erro
  * @param {string} message Corpo da mensagem
  */
  static showErrorMessage(message){
    Modal.error({
      title: message,
      content: '',
    });
  };
  
  /**
   * Mostra uma janela de diálogo de alerta
   * @param {string} message Corpo da mensagem
   */
  static showWarningMessage(message) {
    Modal.warning({
      title: message,
      content: '',
    });
  };

  /**
   * Mostra uma janela de diálogo de confirmação
   * @param {string} title Título 
   * @param {string} message Corpo da mensagem
   * @param {function} callbackOk Rotina a ser executada após confirmação
   * @param {function} callbackCancel Rotina a ser executada após cancelamento
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
