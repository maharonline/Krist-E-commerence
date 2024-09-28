import React, { useEffect, useState } from 'react'
import { useReadContext } from '../../Context/ReadContext';
import { Avatar, Badge, Button, Dropdown, Empty, List, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Context/AuthContext'
import { ShoppingOutlined,HeartOutlined,DeleteOutlined  } from '@ant-design/icons';
// import { cartData, cartData as dummycartlist} from "../../data/Data";
import {  wishlistData as dummywishlist} from "../../data/Data";
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
// import Checkout from '../../Pages/Dashboard/Checkout';


const {Title}=Typography

export default function Navbar() {
  const navigate=useNavigate()

  // handleDashboard
  const handleDashboard=()=>{
    navigate('/dashboard/home');
  }

  //handleCheckout
  const handleCheckout=()=>{
    navigate('/checkout')
  }

  // ViewCart
  const handleViewCart = () => {
    navigate('/cart'); 
  };


  const {documents,setdocuments}=useReadContext();
  console.log(documents);

  const total = documents.reduce((sum, document) => sum + Number(document.price), 0);

console.log(total);


  const { isAuthenticated} = useAuthContext()
  const [isCartDropDownOpen,setisCartDropDownOpen]=useState(false)
  const [isWishlistDropDownOpen,setisWishlistDropDownOpen]=useState(false)
  // const [document,setdocument]=useState("")

  useEffect(()=>{
    const handleScreen=()=>{
      if(window.innerWidth <992 ){
        setisCartDropDownOpen(false)
        setisWishlistDropDownOpen(false)
      }

    }
    window.addEventListener("resize",handleScreen)
  },[])

 
  
  
  //Cart handlecartDelete
  const handlecartDelete=async(cartuid)=>{
    try{
      await deleteDoc(doc(firestore, "Cart", cartuid));
      const filter=documents.filter(check => check.cartuid !== cartuid)
      window.toastify("Deleted Successfully","success")
      console.log(filter);
      setdocuments(filter)
    }
    catch(e){
      window.toastify("Something Went Wrong","error")
      console.log(e);
      
    }

  }


// CartList  

  const Dropdowncart=()=>{
  
    
    return (
      <div className='Card d-flex justify-content-center flex-column bg-light px-3' style={{width:"400px"}}>
        {documents.length>0 ? <List
        itemLayout='horizontal'
        pagination={{
          pageSize: 3, // Show 3 items per page
          position: 'top', //Set pagination position
        }}
    dataSource={documents}
    renderItem={(item, index) => (
      <List.Item>
        
        <List.Item.Meta
          avatar={<Avatar src={item.image } size={100} shape='square' />}
          title={item.product}
          description={item.price}
          />
        <List.Item
          actions={[<Link className='text-danger fs-4' key="list-loadmore-edit" onClick={()=>handlecartDelete(item.cartuid)}><DeleteOutlined /></Link>]}
        ></List.Item>
      </List.Item>

    )}
    footer={<>
    <Title level={4}>Total: ${total}</Title>
    
      <button className="w-100 btn btn-outline-dark"  onClick={handleViewCart}>View Cart</button> <br />
      <button className='w-100 btn btn-dark mt-2' onClick={handleCheckout}>Checkout</button>
    
    </>
  } 

  />
  :<Empty description="NO Such Cart List"/>

        }

      </div>
    )
      
    }

    // WishList

    const Dropdownwish=({wishlist})=>{
      return(
        <div className='Card d-flex justify-content-center flex-column bg-light px-3' style={{width:"500px"}}>
        {wishlist.length>0 ? <List
        itemLayout='horizontal'
        pagination={{
          pageSize: 3, // Show 3 items per page
          position: 'top', //Set pagination position
        }}
    dataSource={wishlist}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.image } size={50} shape='square' />}
          title={<a href="https://ant.design">{item.name}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <List.Item
          // actions={[<a className='text-danger fs-4' key="list-loadmore-edit" onClick={handlecartDelete}><DeleteOutlined /></a>]}
        ></List.Item>
      </List.Item>
    )}
  />
  :<Empty description="NO Such Cart List"/>

        }

      </div>
      )

    }
  return (
    <header>
      <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-lg">
        <div class="container ">
          {/* <Link  class="navbar-brand" href="#">Navbar</Link > */}
          <img src="/Assets/image/Logo.png" alt="" height={40} />
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to='/'>Home</Link >
              </li>
              <li class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true">Shop</Link >


                <ul class="dropdown-menu ">
                  <li><Link class="dropdown-item" href="#">Electronics</Link ></li>
                  <li><Link class="dropdown-item" href="#">Footwear</Link ></li>
                  <li><Link class="dropdown-item" href="#">Home Appliances</Link ></li>
                  {/* <li><hr class="dropdown-divider"/></li>
            <li><Link  class="dropdown-item" href="#">Something else here</Link ></li> */}



                </ul>

              </li>
              <li class="nav-item">
                <Link class="nav-link ">Our Story</Link >
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">Blog</Link >
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">Contact Us</Link >
              </li>
            </ul>

            <div>
              {!isAuthenticated ?

                <Space>

                  <Link to='/auth/login' className='text-decoration-none border border-dark px-3 py-2 text-white bg-dark rounded'>Login</Link>
                  <Link to='/auth/register' className='text-decoration-none border border-success px-3 py-2 text-white bg-success rounded'>Register</Link>
                </Space >
                :<Space size='large'>
                  <Dropdown placement='bottomRight'  trigger={[`click`]} dropdownRender={()=><Dropdowncart />} open={isCartDropDownOpen} onOpenChange={(visible)=>setisCartDropDownOpen(visible)} >

                  <Badge count={documents.length}> 
                  <ShoppingOutlined className='fs-3' style={{cursor:"pointer"}} />
                
                  </Badge>
                  </Dropdown>
                   <Dropdown trigger={['click']} dropdownRender={()=><Dropdownwish wishlist={dummywishlist}/>} open={isWishlistDropDownOpen} onOpenChange={(visible)=>setisWishlistDropDownOpen(visible)} >

                  <Badge count={3}>
                  <HeartOutlined className='fs-3' style={{cursor:"pointer"}} />
                  </Badge>
                  </Dropdown> 
                  <Button type='primary'  onClick={handleDashboard}>Dashboard</Button>
                  
                </Space>
    }
            </div>

          </div>
        </div>
      </nav>
    </header>
  )
}
