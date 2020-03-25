import React from 'react';
import './App.css';
import Navbar from './components/navbar.js'
import Bisection from './components/Root of Equations/bisection.js'
import FalsePosition from './components/Root of Equations/false-position'
import Onepoint from './components/Root of Equations/one-point-iteration'
import Newton from './components/Root of Equations/newton-raphson'
import Cramer from './components/System of Linear Equations/cramer-rule'
import Secant from './components/Root of Equations/secant'
import Comtrap from './components/Integrate/compositetrapezoidal'
import Comsimp from './components/Integrate/compositesimpson'
import cat from './kitty_walk_cycle_2.gif'
import {Layout, Menu,Row,Col } from 'antd';


class NumerApp extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      pagecontent: "bisection"
    }
    this.callback = this.callback.bind(this);
  }
  callback = (v) => {
    this.setState({
      pagecontent : v
    });
    console.log(this.state.pagecontent)
  }
  render() {
    console.log(this.state.pagecontent)
    const { Header } = Layout;
    const pagecontent = this.state.pagecontent;
    return (
      <div>
      <Header  style={{ position: 'fixed', zIndex: 1, width: '100%' ,backgroundColor : '#cf7b7e'}} >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          
          style={{ lineHeight: '64px' , backgroundColor : '#cf7b7e'}}
        >
          <Menu.Item style={{ backgroundColor : '#f1c9c6'}} key="1">
            <div className="d-flex justify-content-start">
              <div className="p-2"><img src={cat}  className="d-flex flex-row align-items-baseline " height="47px" width="60px" /></div>
              <div className="p-2"><h3 className="d-flex flex-row align-items-top text-light " >Numerical Method</h3></div>
            </div>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
      <Header/>
      <Layout style={{minHeight: '100vh'}}>
        <Navbar  parentCallback={this.callback} />{/*ส่วนที่ไปเรียก callback*/}
        
      {
        pagecontent === "bisection" ?
         <Bisection/>
        : 
        pagecontent === "false" ?
        <FalsePosition/>
        :
        pagecontent === "onepoint" ?
        <Onepoint/>
        :
        pagecontent === "newton" ?
        <Newton/>
        :
        pagecontent === "secant" ?
        <Secant/>
        :
        pagecontent === "comtrap" ?
         <Comtrap/>
        :
        pagecontent === "comsimp" ?
         <Comsimp/>
        :
        pagecontent === "cramer" ?
        <Cramer/>
        :''
      }
      
      </Layout>
      </Layout>
     </div>     
    );
  }
}
export default NumerApp;