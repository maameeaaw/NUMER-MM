import React,{useState,useEffect} from 'react';
import Mytable from "../mytable.js";
import Graph from "../graph.js";
import { Layout,Row, Col, Input, Button,Alert } from 'antd';
import api from "../../api";
const math = require('mathjs');

function Bisection (){
    
    const {Content} = Layout;
    const [fx,setFx] = useState(''); 
    const [x,setX] = useState();
    const [er,setEr] = useState(0.000001);
    const [mydata,setData] = useState([{}]);
    const [alert,setAlert] = useState('');
    const [plotdata,setPlotdata] = useState();
    const [show,setShow] = useState(false);
    const columns = [
      {
          title: 'Iteration',
          dataIndex: 'iteration',
          key: 'iteration',
  
      },
      {
          title: 'X',
          dataIndex: 'x',
          key: 'x',
      },
      {
          title: 'Error',
          key: 'error',
          dataIndex: 'error',
  
      },
      ];
    useEffect(() => {
      if (fx === '' || x === '' || er === ''){
        setShow(false);
      }
    }
    );
    const setExample = () =>{
      api.getMovieByName("Newtonraphson").then(db => {
         setFx(db.data.data.fx)
         setX(db.data.data.x)
         
       })
       
   }
    const newtonCal = ([fx,x,er]) => {
      
      let i=1;
      const func = (num) => math.parse(fx).compile().evaluate({ x : num});
      const funcDiff = (num) => {
        const expr = math.derivative(fx, 'x');
        const scope = {x:parseFloat(num)};
        return expr.eval(scope); 
    }
      let obj = [];
      const iteration = (x,er) => { 
        
        let xold =x;
        let xnew = 0;
        let j;
        xnew = xold - (func(xold)/funcDiff(xold));
        j = error(xnew, xold);
        obj.push({'iteration' : i,'x' : xnew ,'error' : j});
        //console.log('error : ',j+'///xnew : ',xnew+'// xold :',xold);
        i++;
        xold = xnew;
        
        return Math.abs(j)<er ? xnew : iteration(xnew,er); 
    }
      
      
      if (er === '' || x === '' || fx === ''){
        console.log('in case 1 ');
        setAlert('Showwarning');
        setShow(false);
        
      }
      else{
        const res = iteration(x,er);
        const objectx = new Object(obj);
        console.log(objectx);
        setData(objectx);
        setPlotdata({'fn' : fx ,'x' : res});
        setAlert('');
        setShow(true);
      }
      console.log('Alert : '+alert);
    } 
    const error = (xnew, xold) =>{
        return Math.abs((xnew-xold) / xnew);
    }
    return (
        <Layout>
          <Content style={{ margin: '10px 10px 0' }}>
            <div style={{ padding: 20, background: '#ffece8', textAlign: 'center' }}>
            <Row gutter={[8, 40]}>
              <Col className="text-left"  span={24}>
               <h4 >Newton-Raphson Method</h4>
               <br/>
               <h6>ใส่ fx x er</h6>
              </Col>
            </Row>
            <Row gutter={[24, 40]}>
              <Col  span={8} order={4}>
               <h6>Function X</h6>
                <Input size="large" value={fx} onChange={e => setFx(e.target.value)} placeholder="Input Function of X" />
              </Col>
              <Col  span={8} order={4}>
                <h6>X0</h6>
                <Input size="large" value={x} onChange={e => setX(e.target.value)} placeholder="Input X0"  />
              </Col>
              <Col   span={8} order={4}>
                <h6>Error</h6>
                <Input size="large" value={er} onChange={e => setEr(e.target.value)} placeholder="ε" />
              </Col>
            </Row>
            <Row gutter={[8, 48]}>
            <Col span={6} />
              <Col span={6} >
                <Button type="primary" shape="round" icon="stock" size="Large"
                 onClick={()=>newtonCal([fx,parseFloat(x),parseFloat(er)])}>
                  Calculate
                </Button>
              </Col>
              <Col span={6} >
                <Button type="primary" shape="round" icon="stock" size="Large"
                 onClick={()=>setExample()}>
                  Example
                </Button>
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
            <Row gutter={[8, 48]}>
              {show ?
                <Graph data = {plotdata}/>
                :''
                }
                
            </Row>
            <Row gutter={[8, 48]} style={{ margin: '70px 40px 0' }} >
            {show ?
                
                <Mytable data = {mydata} columns = {columns}/>
                :''
            }
               
            </Row>
            </div>
          </Content>
        </Layout>
        
    );
}




export default Bisection;