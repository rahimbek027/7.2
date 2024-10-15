import { Button, Input } from 'antd';
import { MedicineBoxOutlined, MoreOutlined, EditOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import CustomSelect from '../components/CustomSelect';
import CustomTable from '../components/CustomTable';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Organization() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Tashkilot nomi',
      dataIndex: 'companyName',
    },
    {
      title: 'INN',
      dataIndex: 'inn',
    },
    {
      title: 'Holati',
      dataIndex: 'status',
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
    },
    {
      title: 'Yaratilgan vaqt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Batafsil',
      dataIndex: 'action',
    },
  ];

  const [data, setData] = useState([
    {
      key: '1',
      id: 1,
      companyName: "Najot Ta'lim",
      inn: 111222333,
      status: "Faol",
      address: "Toshkent, Chilonzor 9kv",
      createdAt: "05.11.2018",
      action:<div className='flex items-center gap-10'>
        <MoreOutlined className='scale-[1.5] hover:scale-[1.8] duration-300 cursor-pointer rotate-[90deg]'/>
        <EditOutlined className='scale-[1.5] hover:scale-[1.8] duration-300 cursor-pointer'/>
        <DeleteOutlined className='scale-[1.5] hover:scale-[1.8] duration-300 cursor-pointer'/>
      </div>
    }
  ]);

  const [isLoading, setIsloading] = useState(false);
  const [regionID, setRegionId] = useState(null);

  const regionList = [
    {
      value: 1,
      label: "Toshkent",
    },
    {
      value: 2,
      label: "Samarqand ",
    },
    {
      value: 3,
      label: "Xorazm",
    },
    {
      value: 4,
      label: "Andijon",
    },
    {
      value: 5,
      label: "Qoraqalpog'iston",
    },
  ];

  useEffect(() =>{
    axios.get("hhtp://locahost/3000/organization").then(res =>{
    setData(  res.data.map(item => {
      item.companyName = item.companyName ? item.companyName : <LinkOutlined/>
      item.inn = item.inn ? item.inn : <LinkOutlined/>
      item.action = <div className='flex items-center gap-10'>
      <MoreOutlined className='scale-[1.5] hover:scale-[1.8] duration-300 cursor-pointer rotate-[90deg]'/>
      <EditOutlined className='scale-[1.5] hover:scale-[1.8] duration-300 cursor-pointer'/>
      <DeleteOutlined className='scale-[1.5] hover:scale-[1.8] duration-300 cursor-pointer'/>
    </div>
    return item
    }))
    })
  })

  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='font-bold text-[25px]'>Tashkilotlar</h2>
          <span className='text-[15px] pl-1 text-slate-400'>tashkilotlar(0)</span>
        </div>
        <Button icon={<MedicineBoxOutlined />} size='large' type='primary'>
          Qo'shish
        </Button>
      </div>
      <div className='flex items-center space-x-5 mt-5'>
        <Input
          size='large'
          type='text'
          allowClear
          placeholder='Qidirish...'
          className='w-[350px]'
        />
        <CustomSelect placeholder={"Tanlash"} seChooseID={setRegionId} options={regionList} />
      </div>
      <div className='mt-5'>
        <CustomTable columns={columns} data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Organization;
