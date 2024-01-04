import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import ProductCreate from './components/ProductCreate';
export default function Product() {
  const productStore = useSelector(store => store.productStore)
  const categoryStore = useSelector(store => store.categoryStore)
  function getCategory(categoryId) {
    return categoryStore.data?.find(item => item.id == categoryId)
  }
  function handleDelete(productId){
  
    api.productApi.delete(productId)
    .then(res => {
        if (res.status == 200) {
            dispatch(productAction.deleteProduct(productId))
        }
    })
  }

  return (
    <>
      {
        productStore.createModalState && <ProductCreate categoryStore={categoryStore} />
      }
      <h1>Product</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Avatar</th>
            <th>Des</th>
            <th>Status</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {
            productStore.data?.map((product, index) => {
              return (
                <tr key={Date.now() * Math.random()}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{getCategory(product.categoryId).title}</td>
                  <td>{product.price}</td>
                  <td>
                    <img src={product.avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                  </td>
                  <td>
                    <button className='btn btn-primary'></button>
                  </td>
                  <td>{product.status ? "đang bán" : "dừng bán"}</td>
                  <td>
                    <button onClick={() => {
                      handleDelete(product.id)
                    }} className='btn btn-danger'>Delete</button>
                    <button className='btn btn-warning'>Update</button>
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
