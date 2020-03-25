import React, { useState,useEffect } from 'react';
import '../App.css';
import { Layout, Menu, Icon,Button } from 'antd';

function Navbar(props) {
  
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  const [collapsed,setCollapse] = useState(false);

  return (
    <div>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapse} width={300} style={{
          overflow: 'auto',
          height: '100%',
          left: 0,
          backgroundColor : '#cf7b7e'
        }}>
          <Menu
            
            mode="inline" 
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 ,backgroundColor : '#ffece8' }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Root of Equations</span> 
                  
              </span>
              }
              style={{ Color : 'white' }}
            >
              <Menu.Item key="1" onClick={() => props.parentCallback('bisection')}>Bisection Method</Menu.Item>
              <Menu.Item key="2" onClick={() => props.parentCallback('false')}>False-Position Method</Menu.Item>
              <Menu.Item key="3" onClick={() => props.parentCallback('onepoint')}>One-Point Iteration Method</Menu.Item>
              <Menu.Item key="4" onClick={() => props.parentCallback('newton')}>Newton-Raphson Method</Menu.Item>
              <Menu.Item key="5" onClick={() => props.parentCallback('secant')}>Secant Method</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  <span>System of Linear Equations</span> 
              </span>
              }
            >
              <Menu.Item key="6" onClick={() => props.parentCallback('cramer')} >Cramer's Rule</Menu.Item>
              <Menu.Item key="7" onClick={() => props.parentCallback('gauss_elimination')} >Gauss Elimination Method</Menu.Item>
              <Menu.Item key="8" onClick={() => props.parentCallback('gauss_jordan')} >Gauss-Jordan Method</Menu.Item>
              <Menu.Item key="10" onClick={() => props.parentCallback('lu')}>LU Decomposition Method</Menu.Item>
              <Menu.Item key="11" onClick={() => props.parentCallback('jacobi')}>Jacobi Iteration Method</Menu.Item>
              <Menu.Item key="12" onClick={() => props.parentCallback('gauss_seidel')}>Gauss-Seidel Iteration Method</Menu.Item>
              <Menu.Item key="13" onClick={() => props.parentCallback('conjugate')}>Conjugate Gradiant Method</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  <span>Interpoltaion and Extrapolation</span>
                </span>
              }
            >
              <Menu.Item key="14">Newton's Divided-Differences</Menu.Item>
              <Menu.Item key="15">Lagrange Polynomials</Menu.Item>
              <Menu.Item key="16">Spline Interpolation</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="notification" />
                  <span>Regression</span>
              </span>
              }
            >
              <Menu.Item key="17">Polynomial Regression</Menu.Item>
              <Menu.Item key="18">Multiple Linear Regression</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="database" />
                  <span>Intergration Techniques</span>
                </span>
              }
            >
              <Menu.Item key="20" onClick={() => props.parentCallback('comtrap')}>CompositeTrapezoldal's Rule</Menu.Item>
              <Menu.Item key="22" onClick={() => props.parentCallback('comsimp')}>CompositeSimpson's Rule</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub6"
              title={
                <span>
                  <Icon type="ellipsis" />
                  <span>Numerical Differential</span>
                </span>
              }
            >
              <Menu.Item key="23">Forward Divied Differential</Menu.Item>
              <Menu.Item key="24">Forward Divied Differential</Menu.Item>
              <Menu.Item key="25">Backward Divied Differential</Menu.Item>
              <Menu.Item key="26">Backward Divied Differential</Menu.Item>
              <Menu.Item key="27">Central Divied Differential</Menu.Item>
              <Menu.Item key="28">Central Divied Differential</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub7"
              title={
                <span>
                  <Icon type="bars" />
                  <span>Ordinart Differential Equation</span>
                </span>
              }
            >
              <Menu.Item key="29">Euler's Method</Menu.Item>
              <Menu.Item key="30">Heun's Method</Menu.Item>
              <Menu.Item key="31">Modified Euler's Method</Menu.Item>
             
            </SubMenu>
          </Menu>
        </Sider>
      
    </div>
  )
}

export default Navbar
