import React,{useState,useEffect} from 'react';
import Mytable from "../mytable.js";
import Graph from "../graph.js";
import { Layout,Row, Col, Input, Button,Alert,Card } from 'antd';
import api from "../../api";
var Algebrite = require('algebrite');
const math = require('mathjs');

function Comtrap (){
    
    const {Content} = Layout;
    const [fx,setFx] = useState(''); 
    const [xl,setXl] = useState();
    const [xr,setXr] = useState();
    const [answer,setAnswer] = useState();
    const [n,setN] = useState();  
    const [alert,setAlert] = useState('');
    const [show,setShow] = useState(false);

    useEffect(() => {
      if (xr === '' || xl === '' || fx === ''){
        setShow(false);
      }
    }
    );
   
    const composite_trapezoidal = ([a, b, n]) => {
        console.log('28 : '+a,b,n);
        let h = (b-a)/n
        console.log(h)
        let I = (h / 2) * (func(a) + func(b) + 2*(summationFunction(n, h)))
        console.log(I);
       let exact = exactIntegrate(a, b)
        console.log(exact);
        let error = Math.abs((exact-I) / exact) * 100
        setAnswer(error);
      }
      const exactIntegrate = (a, b) => {
        let expr = math.compile(Algebrite.integral(Algebrite.eval(fx)).toString())
       
        return expr.eval({x:b}) - expr.eval({x:a})
      
      }
      const summationFunction = (n, h) => {
        let sum = 0
        let counter = h
        for (let i=1 ; i<n ; i++) {
            sum += func(counter)
            counter += h
        }
        return sum
      }
      const func = (X) => {
        let expr = math.compile(fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
      }

    
    return (
        <Layout>
          <Content style={{ margin: '10px 10px 0' }}>
            <div style={{ padding: 20, background: '#ffece8', textAlign: 'center' }}>
            <Row gutter={[8, 40]}>
              <Col className="text-left"  span={24}>
               <h4 >Composite Trapezoidal Rule</h4>
               <br/>
               <h6>ใส่ n xr xl</h6>
              </Col>
            </Row>
            <Row gutter={[24, 40]}>
              <Col  span={6} order={4}>
               <h6>Function X</h6>
                <Input size="large" value={fx} onChange={e => setFx(e.target.value)} placeholder="Input Function of X" />
              </Col>
              <Col  span={6} order={4}>
                <h6>XL</h6>
                <Input size="large" value={xl} onChange={e => setXl(e.target.value)} placeholder="Input XL"  />
              </Col>
              
              <Col   span={6} order={4}>
                <h6>XR</h6>
                <Input size="large" value={xr} onChange={e => setXr(e.target.value)} placeholder="Input XR" />
              </Col>
              
              <Col   span={6} order={4}>
                <h6>N</h6>
                <Input size="large" value={n} onChange={e => setN(e.target.value)} placeholder="N" />
              </Col>
            </Row>
            <Row gutter={[8, 48]}>
              <Col span={6} />
              <Col span={6} >
                <Button type="primary" shape="round" icon="stock" size="Large"
                 onClick={()=>composite_trapezoidal([parseFloat(xl),parseFloat(xr),parseFloat(n)])}
                >
                  Calculate
                </Button>
              </Col>
              <Col span={6} >
               
              </Col>
              <Col span={6} />
            </Row>
            <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            
            </Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              {alert === 'Showwarning' ? 
                      <Alert message="Warning"  description="กรุณากรอกข้อมูลให้ครบ" type="warning" showIcon />
                    : alert === 'Showerror' ? 
                      <Alert message="Error" type="error"   description="You have not assumed right XL and XR." showIcon />
                    :''
                  }
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
             
            </Col>
              
            </Row>
            <Card title={"Output"} bordered={true} style={{ width: "100%", background: "#ffece8", color: "black", float:"left"}}> 
            <p style={{fontSize: "24px", fontWeight: "bold"}}>{answer}%</p> 
            </Card>
            </div>
          </Content>
        </Layout>
        
    );
}




export default Comtrap;