import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { auth } from '../../../config/firebase'
import { updatePassword } from 'firebase/auth'
import style from "../../../sass/passwordupdate.module.scss"

const {Title}=Typography
export default function Passwordupdate() {
    const [newpassword,setNewpassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")
    const [isLoading,setIsLoading]=useState(false)

    const handleSubmit= async(e)=>{
        e.preventDefault()
        if(!newpassword && !confirmpassword) return window.toastify("Please Enter your Password ","error")
            setIsLoading(true)
        const user = auth.currentUser; 

        if (user) {
            try {
                await updatePassword(user, newpassword);
                window.toastify("Password Update Successfully.", "success")
                
            } catch (error) {
                window.toastify("Something Went Wrong While Changing Password", "error")
                console.error("Updation Password Error=>", error)

            }
        } else {
            window.toastify("No Such User Login", "info")

        }
        setIsLoading(false)

    
    }
  return (
    <main className={style.Password}>
        <div className={style.container}>
            <Form onSubmitCapture={handleSubmit} >
                <Title level={3} className='text-center'>Password Update</Title>
            <Row gutter={[0]} className={style.row}>
                <Col span={24} className={style.col}>
                <Input.Password placeholder='New-Password' name='newpassword' onChange={e=>setNewpassword(e.target.value)}/>
            
                </Col>
                <Col span={24} className={style.col}>
                <Input.Password   placeholder='New-Password' name='confirmpassword' onChange={e=>setConfirmpassword(e.target.value)}/>
            
                </Col>
                <Col span={24} className={style.col} >
                <Button className='w-100' type='primary' htmlType='submit' loading={isLoading} size='large' onClick={handleSubmit}>Update</Button>            
                </Col>
            </Row>
            </Form>
        </div>
    </main>
  )
}
