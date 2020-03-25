import React,{useState,useEffect} from 'react';
import Mytable from "../mytable.js";
import Graph from "../graph.js";
import { Layout,Row, Col, Input, Button,Alert } from 'antd';
import api from "../../api";
const math = require('mathjs');

function Bisection (){
    
    const {Content} = Layout;
    const [fx,setFx] = useState(''); 
    const [x0,setX0] = useState();
    const [x1,setX1] = useState();
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
          title: 'Xi-1',
          dataIndex: 'xi-1',
          key: 'xi-1',
      },
      {
        title: 'Xi',
        dataIndex: 'xi',
        key: 'xi',
    },
      {
          title: 'Error',
          key: 'error',
          dataIndex: 'error',
  
      },
      ];
    useEffect(() => {
      if (fx === '' || x1 === ''|| x0 === ''  || er === ''){
        setShow(false);
      }
    }
    );
    const setExample = () =>{
      api.getMovieByName("Secant").then(db => {
         setFx(db.data.data.fx)
         setX0(db.data.data.x0)
         setX1(db.data.data.x1)
         
       })
       
   }
    const secantCal = ([fx,x1,x2,er]) => {
      let obj = [];
      const func = (num) => math.parse(fx).compile().evaluate({ x : num});
      let i=1;
      let j=0;
      const x0 = x1 - (((func(x2)) * (x1 - x2)) / (func(x1) - func(x2)));
      obj.push({'iteration' : i,'xi-1' : x1 ,'xi':x2,'error' : j});
      x1 = x2;
      x2 = x0;
      
      const iteration = (x0,x1,x2,er) => { 
        i++;
        x0 = x2 - (((func(x2)) * (x1 - x2)) / (func(x1) - func(x2)));
        j = Math.abs((x0 - x2) / x0);
        obj.push({'iteration' : i,'xi-1' : x1 ,'xi':x2,'error' : j});
        x1 = x2;
        x2 = x0;
        return Math.abs(j)<er ? x2 : iteration(x0,x1,x2,er); 
    }
      
      
      if (er === '' || x0 === '' || x1 === '' || fx === ''){
        console.log('in case 1 ');
        setAlert('Showwarning');
        setShow(false);
        
      }
      else{
        const res = iteration(x0,x1,x2,er);
        const objectx = new Object(obj);
        console.log(objectx);
        setData(objectx);
        setPlotdata({'fn' : fx ,'x' : res});
        setAlert('');
        setShow(true);
      }
      console.log('Alert : '+alert);
    } 
    return (
        <Layout>
          <Content style={{ margin: '10px 10px 0' }}>
            <div style={{ padding: 20, background: '#ffece8', textAlign: 'center' }}>
            <Row gutter={[8, 40]}>
              <Col className="text-left"  span={24}>
               <h4 >Secant Method</h4>
               <br/>
               <h6>ใส่ fx x0 x1 er</h6>
              </Col>
            </Row>
            <Row gutter={[24, 40]}>
              <Col  span={6} order={4}>
               <h6>Function X</h6>
                <Input size="large" value={fx} onChange={e => setFx(e.target.value)} placeholder="Input Function of X" />
              </Col>
              <Col  span={6} order={4}>
                <h6>X0</h6>
                <Input size="large" value={x0} onChange={e => setX0(e.target.value)} placeholder="Input X0"  />
              </Col>
              <Col  span={6} order={4}>
                <h6>X1</h6>
                <Input size="large" value={x1} onChange={e => setX1(e.target.value)} placeholder="Input X0"  />
              </Col>
              <Col   span={6} order={4}>
                <h6>Error</h6>
                <Input size="large" value={er} onChange={e => setEr(e.target.value)} placeholder="ε" />
              </Col>
            </Row>
            <Row gutter={[8, 48]}>
            <Col span={6} />
              <Col span={6} >
                <Button type="primary" shape="round" icon="stock" size="Large"
                 onClick={()=>secantCal([fx,parseFloat(x0),parseFloat(x1),parseFloat(er)])}>
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