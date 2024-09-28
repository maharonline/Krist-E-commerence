import { Button, Col, Form, Image, Input, Row, Typography } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, firestore } from '../../config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const { Title } = Typography

const initialstate = { firstName: "", lastname: "", email: '', password: "" }

export default function Register() {
  const [state, setState] = useState(initialstate)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    // let { firstName, email, password } = state
    let { firstName, email, password,lastName } = state
    firstName = firstName.trim()
    if (!firstName) return window.toastify("Please Enter Your First Name", "warning")
    if (!window.isEmail(email)) { return window.toastify("Please Enter Your Valid Email", "error") }
    if (password.length < 6) { return window.toastify("Please Enter Your Strong Password", "error") }

    const formData = { firstName, email, Datecreated: serverTimestamp() ,fullname:firstName+" "+lastName}
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        window.toastify("A new user Added successfully", "success")
        createdocumnet({ ...formData, uid: user.uid, email: user.email })
      })
      .catch((error) => {
        console.error("error=>", error);

        switch (error.code) {
          case "auth/email-already-in-use":
            window.toastify("Email address already in use", "error"); break;
          default: window.toastify("Something went wrong while creating a new user", "error"); break;
        }
      });
    }
    const createdocumnet =async (formData) => {
      try{
        await setDoc(doc(firestore, "Users", formData.uid), formData);
        window.toastify("Registered Successfully","success")
      }
      catch(e){
        console.log("Register", e);
        
      }
    }

  return (
    <main className='register'>
      <Row >


        <Col xs={24} md={12} lg={12} xl={13} className='d-none d-md-block '   >
          <Image src="/Assets/image/Rectangle 3463272.png" width={"100%"} height={"100vh"} preview={false} />
        </Col>

        <Col xs={24} md={12} lg={12} xl={11} className="d-flex  justify-content-center flex-column  px-5" >

          <Title level={2}>Create New Account</Title>
          <p className='text-muted'>Plese enter details</p>



          <Form layout={"vertical"} className='mt-2' onSubmitCapture={handleSubmit}>
            <FormItem label="FirstName:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
              <Input type='text' size='large' placeholder='FirstName' name='firstName' value={state.firstName} onChange={handleChange} />
            </FormItem>
            <FormItem label="LastName:" wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
              <Input type='text' size='large' placeholder='LastName' name='lastName' value={state.lastName} onChange={handleChange} />
            </FormItem>
            <FormItem label="Email:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
              <Input type='email' size='large' placeholder='Email' name='email' value={state.email} onChange={handleChange} />
            </FormItem>
            <FormItem label="Password:" required wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} style={{ marginBottom: 8 }}  >
              <Input.Password size='large' placeholder='Password' name='password' value={state.password} onChange={handleChange} />
            </FormItem>

            <Button type='primary' htmlType='submit' size='large' loading={isLoading} block className='mt-3'>Sign Up</Button>


          </Form>

        </Col>


      </Row>
    </main>

  )
}
