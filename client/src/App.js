import React, { Component } from 'react';
import PageLayout from "./PageLayout.js"
import IPAddresses from "./IPAddresses.js";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends Component {

    render() {
        return (
            <div>
                <PageLayout/>
            </div>
        );
    }
}

export default App;





