import React from 'react'
import { useParams } from 'react-router-dom';

export default function Category() {
    let { categoryName } = useParams();

  return (
    <div>{categoryName}</div>
  )
}
