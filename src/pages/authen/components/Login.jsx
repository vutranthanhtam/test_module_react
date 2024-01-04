import React from 'react'
import { useTranslation } from 'react-i18next'
import {message, Modal} from 'antd'
import api from '@apis'
import utils from '@utils'
import { loginWithGoogle, loginWithFacebook } from '@/firebase.js'
export default function SignIn() {
    const { t, i18n} = useTranslation();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            
            let data = {
                loginId: e.target.loginId.value,
                password: e.target.password.value
            }
            
            let userRes = await api.userApi.findByEmailOrUserName(data.loginId);
            if(userRes.status != 200) {
                throw t('err_200')
            }else {
                if(userRes.data.length == 0) {
                    throw t('signIn_err_userName')
                }
            }
            let user = userRes.data[0];
            
            if(utils.hash.hashText(data.password) !=  user.password) {
                throw t('signIn_err_password')
            }
            
            
            let ipRes = await api.ipApi.getMyIp();
            let ip = ipRes.data.ip;

            if(!user.ipList.find(item => item == ip)) {
                let token = utils.token.createToken({
                    userId: user.id,
                    newIpList: [...user.ipList, ip],
                    time: Date.now()
                })
    
                api.mailApi.sendMail({
                    to: user.email,
                    subject: "Xác thực ip login mới. (Ya Miêu)",
                    content: `
                        <p>Chúng tôi nhận thấy bạn đang đăng nhập tại vị trí có IP là: ${ip}</p>
                        <p>Nếu thật sự là bạn, hãy bấm vào nút bên dưới để xác nhận và tiến hành đăng nhập lại.</p>
                        <a href="http://localhost:5173/set-ip?token=${token}">Add New Ip</a>
                    `
                })
                throw "Bạn đang đăng nhập ở một vị trí mới, vui lòng vào email xác thực!"
            }

           
 
            localStorage.setItem("token", utils.token.createToken(user))

            Modal.success({
                content: t('signIn_success'),
                onOk: () => {
                    window.location.href = '/'
                }
            })
        }catch(err) {
            message.error(err)
        }
    }

    async function handleLoginWithGoogle() {
        try {
            let result = await loginWithGoogle();

            let userRes = await api.userApi.findByEmailOrUserName(result.user.email); 
            if(userRes.status != 200) {
                throw t('err_200')
            }else {
                if(userRes.data.length == 0) {
                    let newUser = {
                        userName: String(Math.ceil(Date.now() * Math.random())),
                        email: result.user.email,
                        password: utils.hash.hashText(String(Math.ceil(Date.now() * Math.random()))),
                        emailConfirm: true,
                        role: "member",
                        status: "active",
                        createAt: String(Date.now()),
                        updateAt: String(Date.now()),
                        ipList: [],
                        avatar: result.user.photoURL
                    }
                    let newUserRes = await api.userApi.register(newUser);
                    if(newUserRes.status != 201) {
                        throw t('err_200')
                    }
                    localStorage.setItem("token", utils.token.createToken(newUserRes.data))
                    Modal.success({
                        content: t('signIn_success'),
                        onOk: () => {
                            window.location.href = '/'
                        }
                    })
                    return
                }
            }
            
            let user = userRes.data[0];
            localStorage.setItem("token", utils.token.createToken(user))
            Modal.success({
                content: t('signIn_success'),
                onOk: () => {
                    window.location.href = '/'
                }
            })
        }catch(err) {
            alert(t('err_200'))
        }
    }

    async function handleLoginWithFacebook(){
        try{
            let result = await loginWithFacebook();
            console.log('result',result)
        }catch(err) {
            alert('lỗi')
        }
    }    
    return (
        <div className="form-container sign-in-container">
            <form onSubmit={(e) => {
                handleLogin(e)
            }}>
                <h1>{t ('signIn')}</h1>
                <div className="social-container">
                    <a onClick={() =>{
                        handleLoginWithFacebook()
                    }} className="social">
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a onClick={() => {
                        handleLoginWithGoogle()
                    }} className="social">
                        <i className="fab fa-google-plus-g" />
                    </a>
                    <a onClick={() => {
                        handleLoginWithPhoneNumber()
                    }} className="social">
                        <i className="fab fa-linkedin-in" />
                    </a>
                    <a onClick={() =>{
                        handleLoginWithGithub()
                    }} className="social">
                        <i className="fab fa-github" />
                    </a>
                </div>
                <span>{ t ('signIn_acc')}</span>
                <input type="text" placeholder="username/email" name='loginId' />
                <input type="password" placeholder="Password" name='password'/>
                <a href="#">{ t ('signIn_password')}</a>
                <button type='submit'>{t ('signIn')}</button>
            </form>
        </div>
    )
}
