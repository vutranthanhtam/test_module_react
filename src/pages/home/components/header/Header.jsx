import React, { useState } from 'react'
import './header.scss'
import pictures from '@/pictures'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Flex } from 'antd';
import { Dropdown } from 'react-bootstrap';
export default function Header() {
  const userStore = useSelector(store => store.userStore)
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();
  const categoryStore = useSelector(store => store.categoryStore)
  return (
    <div className='header_box'>
      <div className='sup_header'>
        <div className='sup_header_content'>
          Bộ sưa tập đồng hồ mới về! 
        </div>
      </div>
      <header>
        <div className='header_content'>
          <div className='left'>
            <div onClick={() => {
              window.location.href = '/'
            }} className='logo_box'>
              <img src={pictures.logoHeader} />
            </div>
            <nav>
              {
                [
                  {
                    title: "Thương hiệu",
                    children: 
                      categoryStore.data?.map( category => {
                        return { 
                          title: category.title
                        }
                      })
                    
                  },
                  {
                    title: "Nam",
                    children: null
                  },
                  {
                    title: "Nữ",
                    children: null
                  },
                  {
                    title: "Cặp đôi",
                    children: null
                  },
                  {
                    title: "Phụ kiện",
                    children: [
                      {
                        title: "Dây da",
                        title2: "Dây kim loại",
                      },
                      {
                        title: "Dây kim loại",
                      },
                      {
                        title: "Kính cường lực",
                      }
                    ]
                  }
                ].map(item => (
                  <div className={`item ${item.children && "sup"}`} key={Date.now() * Math.random()}>
                    {item.title}
                    {
                      item.children && (
                        <div className='sup_menu'>
                          {
                            item.children.map(supItem => (
                              <div onClick={()=>{
                                navigate(`/category/${supItem.title.toLowerCase()}`)
                              }} key={Date.now() * Math.random()} className='sup_menu_item'>
                                {supItem.title }
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                ))
              }
            </nav>
          </div>
          <div className='right'>
            <i className="item fa-solid fa-magnifying-glass"></i>
            <span onClick={(e) => {
              navigate("/cart")
            }} style={{color: 'black', cursor: "pointer"}}>
              <i className="item fa-solid fa-bag-shopping"></i>
              (
                {
                  userStore.cart?.detail?.reduce((total, cur) => {
                    return total + cur.quantity
                  }, 0) || 0
                }
              )
            </span>
            {
              userStore.data ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <div className='user_box'>
                      <span>{t('globalNav_hello')} {isNaN(Number(userStore.data?.userName)) ? userStore.data?.userName : userStore.data?.email.split('@')[0]}</span>
                      <img src={userStore.data?.avatar} />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2">
                      <Button className='btn-action1'  type="primary" primary onClick={() => {
                        window.location.href = '/admin'
                      }}>
                        {t('globalNav_btnAdmin')}
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <Button className='btn-action2' type="text" ghost onClick={() => {
                        localStorage.removeItem("token")
                        window.location.href = '/'
                      }}>
                        {t('globalNav_btnProfile')}
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">           
                    <Button className='btn-action3' type="primary" danger onClick={() => {
                      localStorage.removeItem("token")
                      window.location.href = '/'
                    }}>
                      {t('globalNav_btnExit')}
                    </Button></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div onClick={() => {
                  navigate('/authen')
                  console.log("da vao")
                }} className='user_authentication'>
                  <i class="item fa-solid fa-user"></i>
                  
                </div>
                
              )
            }

            <div className='multiple_language'>
              <div onClick={() => {
                localStorage.setItem("locales", "vi")
                i18n.changeLanguage("vi")
              }} className='item'>
                <img src={pictures.flagVN} />
                <span>VN</span>
              </div>
              <div onClick={() => {
                localStorage.setItem("locales", "en")
                i18n.changeLanguage("en")
              }} className='item'>
                <img src={pictures.flagUS} />
                <span>US</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
