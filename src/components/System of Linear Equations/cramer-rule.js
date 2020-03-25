import React,{useState, useEffect, useRef} from 'react';
import { Card,Layout,Row, Col, Input, Button,Alert } from 'antd';
import api from "../../api";
const math = require('mathjs');




function Cramer (){
    
   const {Content} = Layout;
   const [row,setRow] = useState();
   const [column,setColumn] = useState();
   const  [showDimentionForm,setShowDF] =useState(true)
   const  [showDimentionButton,setShowDB]=useState(true)
   const  [showMatrixForm,setShowMF]=useState(false)
   const  [showMatrixButton,setShowMB]=useState(false)
   const  [showOutputCard,setShowOC]=useState(false)
   const [matrixA,setMA] = useState([]);
   const [matrixB,setMB] = useState([]);
   const [answer,setAnswer] = useState([]);
   let  A= [] , B=[] ,tempAnswer = [],tempMatrixA =[],tempMatrixB=[];
  
   const cramerCal=()=> {
        initMatrix();
        let counter=0; 
        while (counter !=row) { 
            let transformMatrix = JSON.parse(JSON.stringify(A));
            console.log(transformMatrix);
            for (let i=0 ; i<row ; i++) {
                for (let j=0 ; j<column ; j++) {
                    if (j === counter) {
                        transformMatrix[i][j] = B[i]
                        break;
                    }
                }
            } 
            counter++;
            tempAnswer.push(<h2>X<sub>{counter}</sub>=&nbsp;&nbsp;{Math.round(math.det(transformMatrix))/Math.round(math.det(A))}</h2>)
            tempAnswer.push(<br/>)
        }       
          setAnswer(tempAnswer);
          setShowOC(true);
    }
   const createMatrix = (row, column) => {
    console.log('row : ',row + ' ' + 'col : ',column);
    for (let i=1 ; i<=row ; i++) {
        for (let j=1 ; j<=column ; j++) {
          tempMatrixA.push(<Input style={{
                width: "14%",
                height: "50%", 
                border: "2px solid Violet",
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
        }
        tempMatrixA.push(<br/>)
        tempMatrixB.push(<Input style={{
            width: "14%",
            height: "50%", 
            border: "2px solid DodgerBlue",
            marginInlineEnd: "5%", 
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold"
        }} 
        id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
      }
        setMA(tempMatrixA);
        setMB(tempMatrixB);
        setShowDF (false)
        setShowDB (false)
        setShowMF (true)
        setShowMB (true)
      }
      const initMatrix = () => {
          for(let i=0 ; i<row ; i++) {
             A[i] = [];
              for(let j=0 ; j<column ; j++) {
                  A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
              }
              B.push(parseFloat(document.getElementById("b"+(i+1)).value));
          }
          console.log(A);
          console.log(B);
      }
      const Example = () => {
        api.getMovieByName("CramerS'Rule").then(db => {
           setRow(3);
           setColumn(3);
          })
          
      }

    return (
        <Layout>
          <Content style={{ margin: '10px 10px 0' }}>
            <div style={{ padding: 20, background: '#ffece8', textAlign: 'center' }}>
            <Row gutter={[8, 40]}>
              <Col className="text-left"  span={24}>
               <h4 >Cramer'Rule</h4>
               <br/>
               <h6>- ใส่ขนาด Matrix</h6>
               <br/>
               <h6>- ใส่เลขในช่อง Matrix</h6>
              </Col>
            </Row>
            <Row>
                    <div>
                        {showMatrixForm && 
                          <div><h2>Matrix [A]</h2><br/>{matrixA}<h2>Vector [B]<br/></h2>{matrixB}</div>
                        }
                        {showDimentionForm && 
                            
                            <Row gutter={[16, 16]}>
                                <Col  span={6} ></Col>
                               <Col  span={6} >
                                  <h6>Row</h6>
                                  <Input value={row} onChange={e => setRow(e.target.value)} placeholder="Input Row" />
                                </Col>
                                <Col  span={6} >
                                  <h6>Column</h6>
                                  <Input  value={column} onChange={e => setColumn(e.target.value)} placeholder="Input Column" />
                                </Col>
                                <Col  span={6}></Col>
                            </Row>
                            
                        }
                        <br></br>
                        {showDimentionButton && 
                         
                            <Row gutter={[16, 16]}>
                            <Col  span={6} ></Col>
                               <Col  span={6} >
                                <Button id="dimention_button" onClick= {
                                    ()=>createMatrix(row,column)
                                    }  
                                    style={{background: "#4caf50", color: "white", fontSize: "20px"}}>
                                    Submit<br></br>
                                </Button>
                                </Col>
                                <Col  span={6} >
                                    <Button id="dimention_button" onClick= {
                                        ()=>Example()
                                        }  
                                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>
                                        Exmaple<br></br>
                                    </Button>
                                </Col>
                                <Col  span={6}></Col>
                            </Row>
                        }
                        {showMatrixButton && 
                            <Button 
                                style={{background: "#4caf50", color: "white", fontSize: "20px"}}
                                onClick={()=>cramerCal()}>
                                Submit
                            </Button>
                        }
                        
                
                    
                    {showOutputCard &&
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{ width: "100%", background: "#ffece8", color: "#FFFFFFFF", float:"left"}}
                        >
                        <p style={{fontSize: "24px", fontWeight: "bold"}}>{answer}</p>
                        </Card>
                    }

                   
                </div>

                
            </Row>
            </div>
          </Content>
        </Layout>
        
    );
}




export default Cramer;