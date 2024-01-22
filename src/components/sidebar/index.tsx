import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'

const AppSidebar = () => {
    return (
        <Sider collapsible>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {/* <Menu.Item key="1">
            </Menu.Item> */}
                {/* Additional menu items can be added here */}
            </Menu>
        </Sider>
    )
}

export default AppSidebar