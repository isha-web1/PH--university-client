import { Layout, Menu, MenuProps } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Children, createElement } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { adminPaths,  } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sidebar from "./Sidebar";
const { Header, Content, Footer, Sider } = Layout;

// const items : MenuProps['items'] = [
//     {
//         key : 'Dashboard',
//         label : <NavLink to='/admin/dashboard'>Dashboard</NavLink>,
//     },
//     {
//         key : '2',
//         label : 'Profiles',
//     },
//     {
//         key : 'User Management',
//         label : 'User Management',
//         children : [
//             {
//                 key : 'create-Admin',
//                 label :  <NavLink to='/admin/create-admin'>Create-admin</NavLink>,
//             },
//             {
//                 key : 'create-faculty',
//                 label :  <NavLink to='/admin/create-faculty'>create-faculty</NavLink>,
//             },
//             {
//                 key : 'create-student',
//                 label :  <NavLink to='/admin/create-student'>create-student</NavLink>,
//             },
//         ]
//     }
// ];

const MainLayout = () => {
    return (
        <Layout style={{height :'100vh'}}>
        <Sidebar></Sidebar>
        <Layout>
          <Header style={{ padding: 0, }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              
              }}
            >
              <Outlet/>
            </div>
          </Content>
         
        </Layout>
      </Layout>
    );
};

export default MainLayout;