import { DatePicker, Input, Space, Select } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import ProxyHeadersService from "../../../api/services/proxy-header-service"; 

import dayjs from 'dayjs';

 

const { Option } = Select; 

 

export const ProxyHeadersDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 individuals, 
 organizations, 
 ...props 

}) => { 
  const [proxyHeader, setProxyHeader] = useState({dischargeDate: dayjs(new Date()), endDate: dayjs(new Date())}) 

 
 useEffect(() => { 
  if (currentRecord) { 
   setProxyHeader(currentRecord); 
  } else { 
   setProxyHeader(null); 
  } 
 }, [currentRecord]) 


 const onOkHandler = async () => { 
    if (!proxyHeader?.number) {
      alert('Пожалуйста, укажите номер документа'); // Выводим message box
  }
  else if (!proxyHeader?.dischargeDate) {
    alert('Пожалуйста, укажите корректную дату выписки(DD.MM.YYYY)'); // Выводим message box
  }
  else if (!proxyHeader?.endDate) {
    alert('Пожалуйста, укажите корректную дату окончания(DD.MM.YYYY)'); // Выводим message box
  }
  else if (!proxyHeader?.individualId) {
    alert('Пожалуйста, выберите физическое лицо'); // Выводим message box
  }
  else if (!proxyHeader?.organizationId) {
    alert('Пожалуйста, выберите организацию'); // Выводим message box
  }


  else{
    const record = 
    currentRecord 
      ? await ProxyHeadersService.updateRecord({ 
      id: currentRecord.id, 
      ...proxyHeader, 
      }) 
      : await ProxyHeadersService.createRecord(proxyHeader) 
    onOk(record); 
}
 } 

 return ( 
  <Modal 
   visible={visible} 
   title={currentRecord ? 'Редактировать' : 'Создать'} 
   onOk={onOkHandler} 
   onCancel={onCancel} DD
  > 

 
   <Space direction="vertical" style={{ width: '100%' }}> 
    <Input 
     value={proxyHeader?.number || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e => setProxyHeader({ ...proxyHeader, number: e.target.value })} 
     placeholder="Укажите номер документа" 
    /> 

 
    <Space style={{width: '100%'}}> 

 
    <DatePicker  
      value={dayjs(proxyHeader?.dischargeDate , 'YYYY-MM-DD').isValid() ? dayjs(proxyHeader.dischargeDate , 'YYYY-MM-DD') : null} 
      onKeyDown={e => {
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== '.') {
            e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
        }
    }} 
      onChange={date => setProxyHeader({ ...proxyHeader, dischargeDate: date })} 
      placeholder={"Укажите дату выписки"} 
      style={{ width: 232 }} 
      format="DD.MM.YYYY" 
      allowClear={false} 
     /> 

 
     <DatePicker 
     value={dayjs(proxyHeader?.endDate , 'YYYY-MM-DD').isValid() ? dayjs(proxyHeader.endDate , 'YYYY-MM-DD') : null} 
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== '.') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
      onChange={date => setProxyHeader({ ...proxyHeader, endDate: date })} 
      placeholder={"Укажите дату окончания"} 
      style={{ width: 232 }} 
      format="DD.MM.YYYY"
      allowClear={false} 
     /> 

 
    </Space> 

 
    <Space style={{width: '100%'}}> 
     <Select 
      value={proxyHeader?.individualId || null} 
      onChange={value => setProxyHeader({ ...proxyHeader, individualId: value })} 
      placeholder={"Выберите физ. лицо"} 
      style={{ width: 232 }} 
     > 
      {individuals.map(it => <Option 
       value={it.id}> 
       {it.lastName} 
      </Option>)} 
     </Select> 

 
     <Select 
      value={proxyHeader?.organizationId || null} 
      onChange={value => setProxyHeader({ ...proxyHeader, organizationId: value })} 
      placeholder={"Выберите организацию"} 
      style={{ width: 232 }} 
     > 
      {organizations.map(it => <Option 
       value={it.id}> 
       {it.title} 
      </Option>)} 
    </Select> 

 
    </Space> 

 
   </Space> 
  </Modal> 
 ) 

 

}  