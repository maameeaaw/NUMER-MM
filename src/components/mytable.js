import React from 'react';
import { Table } from 'antd';
function createTable (props){
    const data = props.data;
    console.log(props.data);
    const columns = props.columns;

    return(
        <Table columns={columns} dataSource={data} />
     
    );
}
export default createTable