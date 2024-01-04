import React from 'react'
import { Table } from 'react-bootstrap';
import './cart.scss'
import { useSelector, useDispatch } from 'react-redux';
import { convertToVND } from '@mieuteacher/meomeojs'
import {userAction} from '@slices/user.slice'
import  api from '@services/apis'
export default function Cart() {
    const dispatch = useDispatch()
    const userStore = useSelector(store => store.userStore)
    const productStore = useSelector(store => store.productStore)

    function handleGetProductById(productId) {
        return productStore.data?.find(product => product.id == productId) || false
    }
    return (
        <div className='cart_page'>
            <h3>Your Cart id: {userStore.cart?.id}</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Avatar</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Quantity</th>
                        <th>SubTotal</th>
                        <th>Note</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userStore.cart?.detail.map((item, index) => (
                            <tr key={Date.now() * Math.random()}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={handleGetProductById(item.productId).avatar} style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%"
                                    }} />
                                </td>
                                <td>
                                    {handleGetProductById(item.productId).name}
                                </td>
                                <td>
                                    {convertToVND(handleGetProductById(item.productId).price)}
                                </td>
                                <td>
                                    <input onChange={(e) => {
                                        let patchData = {
                                            detail: [
                                                ...userStore.cart.detail.map(itemM => {
                                                    if (itemM.productId == item.productId) {
                                                        return {
                                                            ...itemM,
                                                            quantity: +e.target.value
                                                        }
                                                    }
                                                    return itemM
                                                })
                                            ]
                                        }
                                        api.userApi.addToCart(userStore.cart?.id, patchData)
                                            .then(res => {
                                                if (res.status == 200) {
                                                    dispatch(userAction.setCart(res.data))
                                                }
                                            })
                                            .catch(err => {
                                                // loi
                                            })
                                    }} type="number" min={1} defaultValue={item.quantity} />
                                </td>
                                <td>
                                    {convertToVND(handleGetProductById(item.productId).price * item.quantity)}
                                </td>
                                <td>

                                </td>
                                <td>
                                    <button onClick={() => {
                                        if(!window.confirm("are you ok?")) return
                                         let patchData = {
                                            detail: [
                                                ...userStore.cart.detail.filter(itemF => itemF.productId != item.productId)
                                            ]
                                        }
                                        api.userApi.addToCart(userStore.cart?.id, patchData)
                                            .then(res => {
                                                if (res.status == 200) {
                                                    dispatch(userAction.setCart(res.data))
                                                }
                                            })
                                            .catch(err => {
                                                // loi
                                            })
                                    }} className='btn btn-danger'>delete</button>
                                </td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td></td>
                        <td></td>
                        <td>Thành tiền</td>
                        <td></td>
                        <td>
                            {
                                userStore.cart?.detail?.reduce((total, cur) => {
                                    return total + cur.quantity
                                }, 0) || 0
                            }
                        </td>
                        <td>
                            {
                                convertToVND(userStore.cart?.detail?.reduce((total, cur) => {
                                    return total + (cur.quantity * handleGetProductById(cur.productId).price)
                                }, 0) || 0)
                            }
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
