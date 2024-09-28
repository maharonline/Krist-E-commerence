import { Button, Checkbox, Col, Form, Image, Input, Row, Typography } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase'
// import Header from "../../components/Header"

const { Title } = Typography

const initailstate={email:"",password:""}
export default function Login() {
  const [state,setState]=useState(initailstate)
  const [isLoading,setIsLoading]=useState(false)

  const handleChange=(e)=>setState(s=>({...s,[e.target.name]:e.target.value}))
  const handleSubmit=(e)=>{
    e.preventDefault()
    let {email,password}=state

    if(!email && !password) return window.toastify("Something Went Wrong While Login" ,"error")
      setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.toastify("Login Sucessfully","success")
    console.log(user);
    
    // ...
  })
  .catch((error) => {
    window.toastify("Incorrect Email & Password","error")
   console.log("Login Error",error);
   
  }).finally(() => {
    setIsLoading(false)
  });
      }
  return (
    <>
    {/* <Header/> */}
  
      <Row className='overflow-hidden'  >


        <Col xs={24} md={12} lg={12} xl={14} className='d-none d-md-block' >
        

          <Image src="/Assets/image/Login.png" width={"100%"} height={"100vh"} className='object-fit' preview={false} />
      

        </Col>

        <Col xs={24} md={12} lg={12} xl={10} className="d-flex  justify-content-center flex-column px-5   "   >
          <div className=' mt-sm-5' >
            <Title level={2}>Welcome</Title>
            <p className='text-muted'>Plese login here</p>



            <Form layout={"vertical"} className='mt-2 ' onSubmitCapture={handleSubmit} >

              <FormItem label="Email:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
                <Input type='email' size='large' placeholder='Email' name='email' value={state.email} onChange={handleChange} />
              </FormItem>
              <FormItem label="Password:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
                <Input.Password size='large' placeholder='Password' name='password' value={state.password} onChange={handleChange}/>
              </FormItem>

              <div className='d-flex justify-content-between'>
              <Checkbox >Remember Me</Checkbox>
              <Link className='text-decoration-none' to="/auth/forgotpassword">Forgot Password?</Link>
              </div>


              <Button type='primary' htmlType='submit' size='large' block className='mt-3' loading={isLoading}>Login</Button>


            </Form>

          </div>
        </Col>


      </Row>
    
    </>
  )
}


