import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Drawer, Button } from 'antd';
import {HomeOutlined, UserOutlined, AppstoreAddOutlined, UnorderedListOutlined, SettingOutlined, ProfileOutlined,SafetyOutlined, EditOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import '../../sass/Sidebar.scss'; // Custom CSS file for styling
import { useProfileContext } from '../../Context/ReadProfileContext';
import { Link, Route, Routes } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import Profile from './Profile';
import Home from './Home';
import Passwordupdate from './Passwordupdate';
import AddData from './AddData';
// import Checkout from './Checkout';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Dashboard() {
  const { data } = useProfileContext();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);

  };

  // Handle window resize to check if the screen is mobile or desktop
  const handleResize = () => {
    setIsMobile(window.innerWidth < 550);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh'}}>
      {/* Drawer for small screens */}
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={toggleDrawer}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
        width={250}
        
      >
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/dashboard/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <SubMenu key="sub1" icon={<AppstoreAddOutlined />} title="Products">
            <Menu.Item key="3" icon={<UnorderedListOutlined />}>All</Menu.Item>
            <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
              <Link to="/dashboard/adddata">Add</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="5" icon={<ProfileOutlined />}>
              <Link to="/dashboard/profile">Profile</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<SafetyOutlined />} title="Account">
            <Menu.Item key="6" icon={<EditOutlined />}>
              <Link to="/dashboard/passwordupdate">Password Update</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Drawer>

      {/* Sider for larger screens */}
      {!isMobile && (
        <Sider
          collapsible 
          collapsed={collapsed}
          onCollapse={toggleCollapse}
          breakpoint="lg"
          collapsedWidth="100"
          width={250}
          className="sidebar"
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            backgroundColor: '#fff',
          
          }}
        >
          <div className="sidebar-header">
            <Avatar size={70} src={data?.photo} alt="Profile" />
            {!collapsed && <h3 className="sidebar-name">Hello, {data?.firstname}!</h3>}
          </div>

          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/dashboard/home" className='text-decoration-none'>Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreAddOutlined />} title="Products">
              <Menu.Item key="3" icon={<UnorderedListOutlined />}>All</Menu.Item>
              <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
                <Link to="/dashboard/adddata">Add</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
              <Menu.Item key="5" icon={<ProfileOutlined />}>
                <Link to="/dashboard/profile" className='text-decoration-none'>Profile</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SafetyOutlined />} title="Account">
              <Menu.Item key="6" icon={<EditOutlined />}>
                <Link to="/dashboard/passwordupdate" className='text-decoration-none'>Password Update</Link>
              </Menu.Item>
              {/* <Menu.Item key="7" icon={<EditOutlined />}>
                <Link to="/dashboard/checkout" className='text-decoration-none'>Checkout</Link>
              </Menu.Item> */}
            </SubMenu>
          </Menu>
        </Sider>
      )}

      {/* Button to toggle drawer for small screens */}
      {isMobile && (
        <Button
          className="drawer-toggle"
          icon={<MenuUnfoldOutlined />}
          onClick={toggleDrawer}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1000,
          }}
        />
      )}

      {/* Main content area */}
      <Layout
        className="site-layout"
        style={{
          marginLeft: 0 || isMobile ? 0 : 250,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/passwordupdate' element={<Passwordupdate />} />
            <Route path='/adddata' element={<AddData />} />
            {/* <Route path='/checkout' element={<Checkout/>} /> */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
