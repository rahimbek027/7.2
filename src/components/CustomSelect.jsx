import React from 'react';
import { Select } from 'antd';

const CustomSelect = ({placeholder, options, seChooseID}) => { 
    const onChange = (value) => {
        seChooseID(value);
    }
    return ( 
        <Select
          showSearch
          allowClear
          size='large'
          className='w-[350px]'
          placeholder={placeholder}
          optionFilterProp="label"
          onChange={onChange}
          options={options}
        />
    );  
};
export default CustomSelect;
