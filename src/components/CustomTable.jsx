import React from 'react';
import {EditOutlined, DeleteOutlined, MoreOutlined} from '@ant-design/icons'
import { Table } from 'antd';

const CustomTable = ({data,columns,isLoading }) => {

    return(
        <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
      />
    )
};
export default CustomTable;