import React, { useState } from 'react';
import { Table, Button, Typography, Space, Row, Col, Input, InputNumber } from 'antd';
import { ShoppingCartOutlined,DeleteOutlined  } from '@ant-design/icons';
import { useReadContext } from 'Context/ReadContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from 'config/firebase';

const { Title, Text } = Typography;

const Cart = () => {
  const {documents,setdocuments}=useReadContext()
  
  
  const [discountCode, setDiscountCode] = useState('');

  const handleQuantityChange = (value, key) => {
    const newItems = documents.map((item) => {
      if (item.key === key) {
        return { ...item, quantity: value };
      }
      return item;
    });
    setdocuments(newItems);
  };

  const handleDelete =async (cartuid) => {
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
  };

  const subtotal = documents.reduce((sum, document) => sum + Number(document.price), 0);;
  const deliveryCharge = 5;
  const grandTotal = subtotal + deliveryCharge;

  const columns = [
    {
      title: 'Products',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <img src={record.image} alt={text} style={{ width: 50, height: 50, objectFit: 'cover' }} />
          <div>
            <div>{text}</div>
            <div>Item: {record.product}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${Number(price)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <Space>
          <Button onClick={() => handleQuantityChange(record.quantity - 1, record.key)} disabled={quantity <= 1}>-</Button>
          <InputNumber min={1} value={quantity} onChange={(value) => handleQuantityChange(value, record.key)} />
          <Button onClick={() => handleQuantityChange(record.quantity + 1, record.key)}>+</Button>
        </Space>
      ),
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
      render: (text, record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      key: 'delete',
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.cartuid)} icon={<DeleteOutlined />} danger />
      ),
    },
  ];

  return (
    <div style={{ padding: '20px',marginBottom:'100px',marginTop:"20px" }}>
      <Title level={2}>
        <Space>
          <span><ShoppingCartOutlined /> Cart</span>
        </Space>
      </Title>
      <Row gutter={16}>
        <Col span={16} xs={24} sm={24} >
          <Table columns={columns} dataSource={documents} pagination={false} />
        </Col>
        <Col span={8} xs={24} sm={24} className='mt-sm-5'>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Subtotal:</Text> <Text>${subtotal.toFixed(2)}</Text>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Discount Code:</Text>
              <Input
                placeholder="Enter code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                suffix={<Button type="primary">Apply</Button>}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Delivery Charge:</Text> <Text>${deliveryCharge.toFixed(2)}</Text>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Title level={4}>Grand Total: ${grandTotal.toFixed(2)}</Title>
            </div>
            <Button type="primary" block>Proceed to Checkout</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
