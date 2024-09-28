import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Rate } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

const { Meta } = Card;

const AvatarCard = () => (
    <div className='d-flex justify-content-center align-items-center container w-full'>
        <Card className='bg-secondary d-flex align-items-center  '
            style={{ width: 300, height: 300 }}
            cover={
                <>
                    <div className='ml-5'>

                        <div className='mt-5 mb-2' >
                            <Flex gap="middle" vertical>
                                <Flex gap="middle">
                                    <Rate defaultValue={5} />

                                </Flex>

                            </Flex>
                        </div>

                        <Paragraph className='text-muted' >"Excellent product! It exceeded my expectations in every way."</Paragraph>
                        <div className="d-flex start">

                            <Meta
                                avatar={<Avatar src="/image/John Doe.png" style={{ height: "64px", width: "64px" }} />}
                                title="John Doe"
                                description="Developer"
                            />
                        </div>
                    </div>
                </>
            }

        >
        </Card>
        
        <Card className='bg-secondary  '
            style={{ width: 300, height: 300 }}
            cover={
                <>
                    <div className='ml-5'>

                        <div className='mt-5 mb-2' >
                            <Flex gap="middle" vertical>
                                <Flex gap="middle">
                                    <Rate defaultValue={5} />

                                </Flex>

                            </Flex>
                        </div>

                        <Paragraph className='text-muted' >"Excellent product! It exceeded my expectations in every way."</Paragraph>
                        <div className="d-flex start">

                            <Meta
                                avatar={<Avatar src="/image/John Doe.png" style={{ height: "64px", width: "64px" }} />}
                                title="John Doe"
                                description="Developer"
                            />
                        </div>
                    </div>
                </>
            }

        >
        </Card>
        <Card className='bg-secondary  '
            style={{ width: 300, height: 300 }}
            cover={
                <>
                    <div className='ml-5'>

                        <div className='mt-5 mb-2' >
                            <Flex gap="middle" vertical>
                                <Flex gap="middle">
                                    <Rate defaultValue={5} />

                                </Flex>

                            </Flex>
                        </div>

                        <Paragraph className='text-muted' >"Excellent product! It exceeded my expectations in every way."</Paragraph>
                        <div className="d-flex start">

                            <Meta
                                avatar={<Avatar src="/image/John Doe.png" style={{ height: "64px", width: "64px" }} />}
                                title="John Doe"
                                description="Developer"
                            />
                        </div>
                    </div>
                </>
            }

        >
        </Card>

    </div>
);

export default AvatarCard;