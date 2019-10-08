import React, { Component } from 'react';
import IPAddresses from "./IPAddresses.js";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class PageLayout extends Component {

    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['0']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1" style={{ color: 'white' }}>Currently Attacking IP Addresses</Menu.Item>

                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div style={{ background: '#fff', padding: 24, height:800 }}><IPAddresses/></div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}></Footer>
                </Layout>
            </div>
        );
    }
}

export default PageLayout;
