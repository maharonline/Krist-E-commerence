import { Button, Col, Image, Row, Typography } from 'antd'
import React from 'react'
import { ShoppingOutlined} from '@ant-design/icons';

const {Title}=Typography
export default function Hero() {
  return (
    <>
        <Row gutter={[0, 16]} className=' bg-light container-fluid d-flex align-items-center min-vh-100'>
          <Col xs={24} lg={12} md={12} className='d-flex align-items-center justify-content-center' >
            <div  >
              {/* <Title className='text-muted' level={4}>CLASSIC EXCLUSIVE</Title> */}
              <span ><Title className='text-uppercase mb-4  hero-subtitle text-muted' level={4}>Classic Exclusive</Title></span>
              <h1 className='fw-bolder fs-1 mt-5 '>Women's Collection</h1>
              <Title level={4} className='fs-2 mt-4'>UP TO 40% OFF</Title>
              <Button type='primary' className='px-4 fs-5 py-4 rounded-pill '>Shop Now <ShoppingOutlined /></Button>
            </div>

          </Col>
          <Col xs={24} lg={12} md={12} className='container d-flex align-items-center justify-content-center order-first order-lg-last mt-5' >

            <div style={{ width: "70%" }}>

              <Image src='/Assets/image/hero.png' preview={false} />
            </div>


          </Col>



        </Row>
    </>
  )
}
