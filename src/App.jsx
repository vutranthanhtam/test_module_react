import RouteIndex from './routes/RouteIndex'
import './main.scss'
import './i18n'
import { useEffect } from 'react'
import utils from '@utils'
import { useDispatch } from 'react-redux'
import {userAction} from '@slices/user.slice'
import {productAction} from '@slices/product.slice'
import {categoryAction} from '@slices/category.slice'
import api from '@services/apis'
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if(localStorage.getItem("token")) {
        let data = utils.token.decodeToken(localStorage.getItem("token"));
        if(!data) {
          localStorage.removeItem("token")
          return
        }
        api.userApi.findByEmailOrUserName(data.userName)
        .then(res => {
          if(res.data[0].updateAt != data.updateAt) {
            localStorage.removeItem("token")
            return
          }
          dispatch(userAction.setData(data))
        })
        .catch(err => {
          localStorage.removeItem("token")
          return
        })
      }
    }catch(err) {
      localStorage.removeItem("token")
    }
  }, [])

  useEffect(() => {
    let data = utils.token.decodeToken(localStorage.getItem("token"));
    api.userApi.findReceiptByUserId(data.id)
    .then(res => {
      let cart = null;
      let receipts = [];
      for(let i in res.data) {
        if(res.data[i].status == "shopping") {
          cart = res.data[i]
        }else {
          receipts.push(res.data[i])
        }
      }
      dispatch(userAction.setCart(cart))
      dispatch(userAction.setReceipts(receipts))
    })
  }, [])

  useEffect(() => {
    api.productApi.findAll()
    .then(res => {
      dispatch(productAction.setData(res.data))
    })
  }, [])

  useEffect(() => {
    api.categoryApi.findAll()
    .then(res => {
      dispatch(categoryAction.setData(res.data))
    })
  }, [])
  return (
    <RouteIndex/>
  )
}
