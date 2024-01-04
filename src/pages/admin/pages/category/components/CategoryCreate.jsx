import React from 'react'
import { useDispatch } from 'react-redux'
import { categoryAction } from '@slices/category.slice'
import {uploadToFirebase} from '@/firebase.js'
import api from '@services/apis'

export default function CategoryCreate() {
    const dispatch = useDispatch()
    async function handleCreateCategory(e) {
        e.preventDefault();
        let newCategory = {
            id: Date.now() * Math.random(),
            title: e.target.title.value,
            avatar: await uploadToFirebase(e.target.avatar.files[0]),
            deleted : false,
        }
        api.categoryApi.create(newCategory)
            .then(res => {
                if (res.status == 201) {
                    dispatch(categoryAction.addNewCategory(res.data))
                    dispatch(categoryAction.changeStateCreateModal())
                }
            })
    }
    return (
        <div className='category_create'>
            <form onSubmit = {(e) => {
                handleCreateCategory(e)
            }}>
                <div className='btn_box'>
                    <h3>CATEGORY CREATE</h3>
                    <button onClick={() => {
                        dispatch(categoryAction.changeStateCreateModal())
                    }} type='button' className='btn btn-danger'> X</button>
                </div>
                <div className='btn_box text'>
                    Name <input name='title' type="text" />
                </div>
                <div>
                    Avatar <input name='avatar' type="file"  onChange={(e) => {
                        if(e.target.files.length != 0) {
                            let imgEl = e.target.parentNode.querySelector("img").src = URL.createObjectURL(e.target.files[0])
                        }
                    }}/> <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                </div>
                <div className='btn_box save'>
                    <button type='submit' className='btn btn-success'>Save</button>
                </div>
            </form>

        </div>
    )
}
