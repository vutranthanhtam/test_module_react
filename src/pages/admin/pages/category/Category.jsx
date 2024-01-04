import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { categoryAction } from '@slices/category.slice'
import CategoryCreate from './components/CategoryCreate';
import api from '@services/apis'
export default function Category() {
  const categoryStore = useSelector(store => store.categoryStore)
  const dispatch = useDispatch()
  function handleDelete(categoryId){
  
    api.categoryApi.delete(categoryId,{ 
      deleted :true
    })
    .then(res => {
        if (res.status == 200) {
            dispatch(categoryAction.deleteCategory(categoryId))
        }
    })
  }
 
  return (
    <>

      {
         categoryStore.createModalState && < CategoryCreate  />
      }
      <h1>CATEGORY</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Avatar</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {
            categoryStore.data?.map((category, index) => {
              return (
                <tr key={Date.now() * Math.random()}>
                  <td>{index + 1}</td>
                  <td>{category.title}</td>
                  <td>
                    <img src={category.avatar} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                  </td>
                  <td>
                    <button onClick={() => {
                      handleDelete(category.id)
                    }} className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  )
}
