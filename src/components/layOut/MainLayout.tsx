import { Button, Layout, } from 'antd';
import {  Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';
const { Header, Content, } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    // Redirect to login page or perform any other logout logic
  };
  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }} ><Button onClick={handleLogout}>Logout</Button>{ ' '}</Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;