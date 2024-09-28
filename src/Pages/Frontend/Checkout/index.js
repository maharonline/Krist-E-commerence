import React from 'react';
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import {  HomeOutlined, CreditCardOutlined, EditOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import { useReadContext } from 'Context/ReadContext';

const { Title, Text, Paragraph } = Typography;

export default function Checkout() {
    const {documents}=useReadContext()
    const subtotal = documents?.reduce((sum, document) => sum + Number(document.price), 0);;
    const delievery=5

    return (
        <main>
            <div className='container' style={{ padding: '20px', marginBottom: '100px', marginTop: '20px' }}>
                <Title level={2}>
                    <Space>
                        <span><Title level={1}>Checkout</Title></span>
                    </Space>
                </Title>
                
                {/* Steps Navigation */}
                <Row gutter={16} justify="space-between" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Col span={8} xs={8}>
                        <Space direction="vertical" >
                            <HomeOutlined style={{ fontSize: '24px' }} />
                            <Text>Address</Text>
                        </Space>
                    </Col>
                    <Col span={8} xs={8} >
                        <Space direction="vertical" size={2} >
                            <CreditCardOutlined style={{ fontSize: '24px' }}  />
                            <Text>Payment Method</Text>
                        </Space>
                    </Col>
                    <Col span={8} xs={8}>
                        <Space direction="vertical" size={2}>
                            <EditOutlined style={{ fontSize: '24px' }} />
                            <Text>Review</Text>
                        </Space>
                    </Col>
                </Row>

                {/* Address Section */}
                <Row gutter={16} className='d-flex flex-column'>
                    <Col span={24}>
                        <Title level={3}>Select a delivery address</Title>
                        <Paragraph>Please select your delivery address or add a new one.</Paragraph>
                        <Paragraph>No address found. Please add a new address.</Paragraph>
                    </Col>
                </Row>
                
                <Row gutter={16}>
                    {/* Form for Adding New Address */}
                    <Col span={24} md={16} xs={24}>
                        <Form>
                            <Title level={4}>Add New Address</Title>
                            <FormItem label={<strong>Name</strong>} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} required>
                                <Input type='text' name='name' size='large' placeholder='Enter Name' />
                            </FormItem>
                            <FormItem label={<strong>Mobile Number</strong>} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} required>
                                <Input type='text' name='mobile' size='large' placeholder='Enter Mobile Number' />
                            </FormItem>
                            <FormItem label={<strong>Flat, House No, Building, Company, Apartment</strong>} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} required>
                                <Input type='text' name='house' size='large' placeholder='Enter House No' />
                            </FormItem>
                            <FormItem label={<strong>Area, Colony, Street, Sector, Village</strong>} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} required>
                                <Input type='text' name='area' size='large' placeholder='Enter Area' />
                            </FormItem>
                            <FormItem label={<strong>City</strong>} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} required>
                                <Input type='text' name='city' size='large' placeholder='Enter City' />
                            </FormItem>
                            <FormItem label={<strong>Pin Code</strong>} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} required>
                                <Input type='text' name='pin' size='large' placeholder='Enter Pin Code' />
                            </FormItem>
                            <FormItem label={<strong>State</strong>} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} required>
                                <Select showSearch placeholder="Select a State" optionFilterProp="label"
                                    options={[{ value: 'MLT', label: 'Multan', }, { value: 'LHR', label: 'Lahore', }, { value: 'FSD', label: 'Faisalbad', },]} />
                            </FormItem>
                            <Button className='w-100' size='large' type='primary'>Add New Address</Button>
                        </Form>
                    </Col>

                    {/* Summary Section */}
                    <Col span={24} md={8} xs={24} style={{ marginTop: '20px' }}>
                        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Subtotal:${subtotal}</Text>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Discount Code:</Text>
                                <Input
                                    placeholder="Enter code"
                                    suffix={<Button type="primary">Apply</Button>}
                                />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <Text strong>Delivery Charge:${delievery}</Text>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <Title level={4}>Grand Total:${subtotal+delievery} </Title>
                            </div>
                            <Button type="primary" block>Proceed to Checkout</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </main>
    )
}
