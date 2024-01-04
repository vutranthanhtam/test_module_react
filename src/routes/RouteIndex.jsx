import { BrowserRouter, Route, Routes } from "react-router-dom"
import LazyFn from './lazy/Lazy'
import Home from "../pages/home/Home"
import HomeBody from '@pages/home/pages/HomeBody'
export default function RouteIndex() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<Home/>}>
                <Route path="*" element={<HomeBody/>}></Route>
                <Route path="category/:categoryName" element={LazyFn(() => import("@pages/home/pages/categories/Category.jsx"))()}></Route>
                <Route path="cart" element={LazyFn(() => import("@pages/cart/Cart.jsx"))()}></Route>
            </Route>
            <Route path="/admin" element={LazyFn(() => import("@pages/admin/Admin.jsx"), localStorage.getItem('token') == null ? false : true)()}>
              <Route path="category/list" element={LazyFn(() => import("@pages/admin/pages/category/Category.jsx"))()}></Route>
              <Route path="product/list" element={LazyFn(() => import("@pages/admin/pages/product/ProductList.jsx"))()}></Route>
            </Route>
            <Route path="/authen" element={LazyFn(() => import("@pages/authen/Authen.jsx"))()}></Route>
            <Route path="/email-confirm" element={LazyFn(() => import("@pages/authen/pages/EmailConfirm.jsx"))()}></Route>
            <Route path="/set-ip" element={LazyFn(() => import("@pages/authen/pages/SetIp.jsx"))()}></Route>
        </Routes>
    </BrowserRouter>
  )
}
