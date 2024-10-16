import { Button, Input, Modal, Form } from 'antd'; 
import { MedicineBoxOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomSelect from '../components/CustomSelect';
import CustomTable from '../components/CustomTable';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Organization() {
  const [data, setData] = useState([]);            
  const [isLoading, setIsLoading] = useState(false); 
  const [regionID, setRegionID] = useState(null);  
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [form] = Form.useForm();                    

  
  useEffect(() => {
    fetchOrganizations();
  }, []);

  
  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/organizations"); 
      setData(res.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleAdd = async (values) => {
    const newOrganization = {
      ...values,  
      id: Date.now(), 
      createdAt: new Date().toLocaleDateString(), 
    };

    try {
      
      await axios.post("http://localhost:3000/organizations", newOrganization);
      fetchOrganizations(); 
      setIsModalVisible(false); 
      form.resetFields(); 
    } catch (error) {
      console.error('Error adding organization:', error);
    }
  };

 
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); 
  };

  
  const filteredData = data.filter(item => 
    item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/organizations/${id}`); 
      fetchOrganizations(); 
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='font-bold text-[25px]'>Tashkilotlar</h2>
          <span className='text-[15px] pl-1 text-slate-400'>tashkilotlar({data.length})</span>
        </div>
        <Button icon={<MedicineBoxOutlined />} size='large' type='primary' onClick={() => setIsModalVisible(true)}>
          Qo'shish
        </Button>
      </div>
      <div className='flex items-center space-x-5 mt-5'>
        <Input
          size='large'
          type='text'
          allowClear
          placeholder='Tashkilot nomini kiriting'
          className='w-[300px]'
          value={searchTerm}
          onChange={handleSearch}
        />
        <CustomSelect
          value={regionID}
          setValue={setRegionID}
          options={[
            { value: 1, label: "Toshkent" },
            { value: 2, label: "Samarqand" },
            { value: 3, label: "Xorazm" },
            { value: 4, label: "Andijon" },
            { value: 5, label: "Qoraqalpog'iston" },
          ]}
          allowClear
          isLoading={false}
          placeholder={"Hududni tanlang"}
        />
      </div>
      <CustomTable
        isLoading={isLoading}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Tashkilot nomi', dataIndex: 'companyName' },
          { title: 'INN', dataIndex: 'inn' },
          { title: 'Holati', dataIndex: 'status' },
          { title: 'Manzil', dataIndex: 'address' },
          { title: 'Yaratilgan vaqt', dataIndex: 'createdAt' },
          { title: 'Batafsil', dataIndex: 'action' },
        ]}
        dataSource={filteredData}
      />
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}  
        footer={null}  
        title="Yangi tashkilot qo'shish"
      >
        <Form
          form={form}
          onFinish={handleAdd}   
          layout='vertical'
        >
          <Form.Item label="Tashkilot nomi" name="companyName" rules={[{ required: true, message: 'Iltimos tashkilot nomini kiriting' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="INN" name="inn" rules={[{ required: true, message: 'Iltimos tashkilot INN raqamini kiriting' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Manzil" name="address" rules={[{ required: true, message: 'Iltimos tashkilot manzilini kiriting' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Holati" name="status" rules={[{ required: true, message: 'Iltimos tashkilot holatini kiriting' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Qo'shish</Button>  {/* This button submits the form */}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Organization;
