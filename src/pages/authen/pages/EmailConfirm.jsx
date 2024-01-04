import React, { useEffect } from 'react'
import utils from '@utils'
import { Modal } from 'antd';
import api from '@services/apis'
export default function EmailConfirm() {
    useEffect(() => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            let data = utils.token.decodeToken(token.replaceAll(" ", "+"));
            if (data) {
                if ((data.time + (5 * 60 * 1000) < Date.now()) == true) {
                    Modal.error({
                        title: "Mã xác thực hết hạn!"
                    })
                    return
                }
            }

            api.userApi.update(data.userId,{
                emailConfirm: true
            })
            .then(res => {
                Modal.success({
                    title: "Xác thực thành công!"
                })
            })
        }catch(err) {
            Modal.error({
                title: "Mã xác thực hết hạn!"
            })
        }
    }, [])
  return (
    <div style={{color: "black"}}>EmailConfirm</div>
  )
}
