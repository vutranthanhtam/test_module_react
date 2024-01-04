import React from 'react'
import './footer.scss'
import pictures from '@/pictures'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t, i18n} = useTranslation();
  return (
    <footer>
      <div className='logo'>
        <img src={pictures.logoFooter} />
      </div>
      <div className='content'>
        <div className='container'>
          <p className='title'>Về WatchStore</p>
          <p>Giới thiệu</p>
          <p>Phản ánh - Khiếu nại</p>
          <p>Top list đồng hồ</p>
          <p>Kiến thức đồng hồ</p>
        </div>
        <div className='container'>
          <p className='title'>Chính sách chung</p>
          <p>Chính sách thanh toán</p>
          <p>Chính sách bảo hành</p>
          <p>Chính sách bảo mật</p>
          <p>Chính sách vận chuyển</p>
          <p>Chính sách đổi trả</p>  
        </div>
        <div className='container'>
          <p className='title'>Liên hệ hỗ trợ</p>
          <p>Hotline 1: 093.189.2222</p>
          <p>Hotline 2: 093.189.3333</p>
          <p>Hotline 2: 093.189.4444</p>
          <p>Email: info@watchstore.vn</p>
        </div>
        <div className='container'>
          <p className='title'>Kết nối với chúng tôi</p>
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-youtube"></i>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-tiktok"></i>
        </div>
      </div>
    </footer>
  )
}
 