import { Input, Space } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import { Select } from 'antd'; 

import ProxyBodyService from "../../../api/services/proxy-body-service"; 

 

const { Option } = Select; 

 

export const ProxyBodiesDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 products, 
 proxyHeaderId, 
 ...props 

}) => { 
 const [proxyBody, setProxyBody] = useState(null); 

 
 useEffect(() => { 
  if (currentRecord) { 
   setProxyBody(currentRecord); 
  } else { 
   setProxyBody(null); 
  } 
 }, [currentRecord]) 

 
 const onOkHandler = async () => { 
  if (!proxyBody?.productId) {
    alert('Пожалуйста, выберите продукт'); // Выводим message box
  }
  else if (!proxyBody?.unit) {
    alert('Пожалуйста, укажите единицу измерения'); // Выводим message box
  }
  else if (!proxyBody?.count) {
    alert('Пожалуйста, укажите количество'); // Выводим message box
  }


  else{
    const record = 
    currentRecord 
      ? await ProxyBodyService.updateRecord({ 
      id: currentRecord.id, 
      ...proxyBody, 
      }) 
      : await ProxyBodyService.createRecord({...proxyBody, proxyHeaderId}) 
    onOk(record); 
  }
 } 

 
 return ( 
  <Modal 
   open={visible} 
   title={currentRecord ? 'Редактировать' : 'Создать'} 
   onOk={onOkHandler} 
   onCancel={onCancel} 
  > 
   <Space direction="vertical"> 

 
    <Select 
     value={proxyBody?.productId || null} 
     onChange={value => setProxyBody({...proxyBody, productId: value})} 
     placeholder={"Выберите продукт"} 
     style={{ width: '100%' }} 
    > 
     {products.map(it => <Option 
      value={it.id}> 
      {it.title} 
     </Option>)} 

 
    </Select> 

 
    <Space> 

 
     <Input  
      value={proxyBody?.unit || ''}
      onKeyDown={e => {
        if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " ") {
            e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
        }
        }} 
      onChange={e => { if (e.target.value.length <= 8) { setProxyBody({ ...proxyBody, unit: e.target.value })}}} 
      placeholder="Укажите ед. измерения" 
     /> 

 
     <Input 
      value={proxyBody?.count || ''} 
      onKeyDown={e => {
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
        }
    }} 
      onChange={e => setProxyBody({ ...proxyBody, count: e.target.value })} 
      placeholder="Укажите количество" 
     /> 

 
    </Space> 

 
   </Space> 

 
  </Modal> 
 ) 

} 