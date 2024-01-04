import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import { productAction } from '@slices/product.slice'
import {uploadToFirebase} from '@/firebase.js'
import api from '@services/apis'


export default function ProductCreate({ categoryStore }) {
    const dispatch = useDispatch()
    async function handleCreateProduct(e) {
        e.preventDefault();
        let newProduct = {
            categoryId: +e.target.categoryId.value,
            name: e.target.name.value,
            price: +e.target.price.value,
            des: e.target.des.value,
            avatar: await uploadToFirebase(e.target.avatar.files[0]),
            status: false,
            deleted : false,
        }
        api.productApi.create(newProduct)
        .then(res => {
            if(res.status == 201) {
                dispatch(productAction.addNewProduct(res.data))
                dispatch(productAction.changeStateCreateModal())
            }
        })
    }
    return (
        <div className='product_create'>
            <form onSubmit={(e) => {
                handleCreateProduct(e)
            }}>
                <div className='btn_box'>
                    <h3>CREATE PRODUCT</h3>
                    <button onClick={() => {
                        dispatch(productAction.changeStateCreateModal())
                    }} type='button' className='btn btn-danger'>X</button>
                </div>
                <div >
                     Name <input name='name' type="text" />
                </div>
                <div >
                    Category <select name='categoryId'>
                        {
                            categoryStore.data?.map(category => (
                                <option key={Date.now() * Math.random()} value={category.id}>{category.title}</option>
                            ))
                        }
                    </select>
                </div>
                <div >
                    Price <input name='price' type="number" />
                </div>
                <div>
                    Avatar <input name='avatar' type="file"  onChange={(e) => {
                        if(e.target.files.length != 0) {
                            let imgEl = e.target.parentNode.querySelector("img").src = URL.createObjectURL(e.target.files[0])
                        }
                    }}/> <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                </div>
                <div className='container_data'>
                    Des <textarea name="des" cols="30" rows="5"></textarea>
                </div>
                <div className='btn_box save'>
                    <button type='submit' className='btn btn-success'>Save</button>
                </div>
            </form>
        </div>
    )
}
