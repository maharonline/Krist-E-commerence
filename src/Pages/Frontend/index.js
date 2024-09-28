import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Cart from './Cart'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Checkout from './Checkout'


export default function Frontend() {
  return (

    <>
    <Header/>
    <Routes>
        <Route index element={<Home/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        
    </Routes>
    <div style={{ marginTop: "50px" }}>
          <Footer/>
        </div>
    
    </>
  )
}
