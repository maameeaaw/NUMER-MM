import React,{useState,useEffect} from 'react';
import Mytable from "../mytable.js";
import Graph from "../graph.js";
import { Layout,Row, Col, Input, Button,Alert } from 'antd';
import api from "../../api";
const math = require('mathjs');

function Bisection (){
    
    const {Content} = Layout;
    const [fx,setFx] = useState(''); 
    const [xl,setXl] = useState();
    const [xr,setXr] = useState();
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
          title: 'Xl',
          dataIndex: 'xl',
          key: 'xl',
      },
      {
          title: 'Xr',
          dataIndex: 'xr',
          key: 'xr',
      },
      {
          title: 'X',
          key: 'x',
          dataIndex: 'x',
      },
      {
          title: 'Error',
          key: 'error',
          dataIndex: 'error',
  
      },
      ];
    useEffect(() => {
      if (xr === '' || xl === '' || fx === ''){
        setShow(false);
      }
    }
    );
    const setExample = () =>{
      api.getMovieByName("False-Position").then(db => {
         setFx(db.data.data.fx)
         setXl(db.data.data.xl)
         setXr(db.data.data.xr)
       })
       
   }
    const falsepositionCal = ([fx,xl,xr,er]) => {
      
      let i=1;
      console.log("in cal")
      const func = (num) => math.parse(fx).compile().evaluate({ x : num});
      let obj = [];
      const iteration = (l,r) => {
        const m =  (l*func(r) - r*func(l))/ (func(r) - func(l));;
        const t1 = {'iteration' : i++ , 'xl' : l , 'xr' : r }
        if(func(m) === 0 ){
            return m ;
        } else{
            func(m)*func(r)>0? r=m : l=m ;
            const j = Math.abs(func(m));
            const t2 = {'x' : m , 'error' : j}
            obj.push(Object.assign(t1,t2));
            return j<er ? m : iteration(l,r);
        }
      }
      if (xr === '' || xl === '' || fx === ''){
        console.log('in case 1 ');
        setAlert('Showwarning');
        setShow(false);
        
      }else if (func(xl) * func(xr) >= 0 ){
        setAlert('Showerror');   
        setShow(false); 
      }
      else{
        const res = iteration(xl,xr);
        const objectx = new Object(obj);
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
               <h4 >False-Position Method Algorithm</h4>
               <br/>
               <h6>ใส่ fx xr xl</h6>
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
                <h6>Error</h6>
                <Input size="large" value={er} onChange={e => setEr(e.target.value)} placeholder="ε" />
              </Col>
            </Row>
            <Row gutter={[8, 48]}>
            <Col span={6} />
              <Col span={6} >
                <Button type="primary" shape="round" icon="stock" size="Large"
                 onClick={()=>falsepositionCal([fx,parseFloat(xl),parseFloat(xr),parseFloat(er)])}>
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