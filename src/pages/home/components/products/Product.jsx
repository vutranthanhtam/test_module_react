import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '@services/apis'
import {userAction} from '@slices/user.slice'
export default function Product() {
    const dispatch = useDispatch()
    const { productStore, categoryStore } = useSelector(store => store)
    const userStore = useSelector(store => store.userStore)

    function getProductCategories(categoryID) {
        if(!productStore.data) return
        let result =[];
        for (let i in productStore.data) {
            if(productStore.data[i].categoryId === categoryID) {
                result.push(productStore.data[i])
            }
            if(result.length >= 6) break
        }
        return result
    }

    useEffect(() => {
        console.log("userStore", userStore)
    }, [userStore])


    function handleAddToCart(productId) {
        if(!userStore.data) {
            alert("Login please!")
            return
        }

        if(userStore.cart) {
            /* có cart 
                - 1 => sp đã có trong cart => tăng quantity
                - 2 => sp chưa từng có trong cart => add new
            */
           let itemExisted = userStore.cart?.detail?.find(item => item.productId == productId);
           let patchData = null;
           if(itemExisted) {
                patchData = {
                    detail: [
                        ...userStore.cart.detail.map(item => {
                            if(item.productId == productId) {
                                return {
                                    ...item,
                                    quantity: item.quantity + 1
                                }
                            }
                            return item
                        })
                    ]
                }
           }else {
                patchData = {
                    detail: [
                        ...userStore.cart.detail,
                        {
                            id: String(Math.ceil(Math.random() * Date.now())),
                            productId,
                            quantity: 1,
                            note: null
                        }
                    ]
                }
           }
           api.userApi.addToCart(userStore.cart.id, patchData)
           .then(res => {
               if(res.status == 200) {
                   dispatch(userAction.setCart(res.data))
               }
           })
           .catch(err => {
               // loi
           })
        }else {
            /* chưa cart
                - Tạo new cart + add product vào cart detail
            */
           let newReceipt = {
                id: "PAY_" + String(Math.ceil(Math.random() * Date.now())),
                total: 0,
                userId: userStore.data.id,
                createAt: String(Date.now()),
                payMode: "cash",
                paid: false,
                paidAt: null,
                status: "shopping",
                peddingAt: null,
                acceptedAt: null,
                shippingAt: null,
                doneAt: null,
                detail: [
                    {
                        id: String(Math.ceil(Math.random() * Date.now())),
                        productId,
                        quantity: 1,
                        note: null
                    }
                ]
           }

           api.userApi.createReceipt(newReceipt)
           .then(res => {
                if(res.status == 201) {
                    dispatch(userAction.setCart(res.data))
                }else {
                    // loi
                }
           })
           .catch(err => {
            // loi
           })
        }
    
    }

    return (
        <>
            {
                categoryStore.data?.map((category) => {
                    return (
                        <div key={Date.now() * Math.random()} className='product_row' >
                            <div className='logo'><img src={category.avatar} style={{ width: "250px", height: "100px",}} /></div>
                            {
                                getProductCategories(category.id)?.map((product, index) => {
                                    if (index < 6) {
                                        return (
                                            <div key={Date.now() * Math.random()} className='product_box'>
                                                <div>
                                                    <img src={product.avatar} />
                                                </div>
                                                <div className='product_name'>
                                                    {product.name}
                                                </div>
                                                <div className='product_price'>
                                                    {product.price} VND
                                                </div>
                                                <div className='tools'>
                                                    <button onClick={() => {
                                                       handleAddToCart(product.id)
                                                    }} className='buy_btn'>Buy</button>
                                                    <button className='detail_btn'>Detail</button>
                                                </div>
                                            </div>)
                                    } return
                                })
                            }
                        </div>
                    )
                })
            }
        </>
    )
}
