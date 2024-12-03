import { DatePicker, Input, Space, Select, Button } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import DocHeadersService from "../../../api/services/doc-header-service"; 

import dayjs from 'dayjs';

 

const { Option } = Select; 

 

export const DocHeadersDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord,
 organizations,
 individuals,
 marks,
 clas, 
 ...props 

}) => { 
 const [docHeader, setDocHeader] = useState({data: dayjs(new Date())}) 


 
 useEffect(() => { 
  if (currentRecord) { 
   setDocHeader(currentRecord); 
  } else { 
   setDocHeader(null); 
  } 
 }, [currentRecord]) 


 const onOkHandler = async () => { 
    if (!docHeader?.num) {
      alert('Пожалуйста, укажите номер документа'); // Выводим message box
  }
  else if (!docHeader?.organizationId) {
    alert('Пожалуйста, выберите организацию'); // Выводим message box
  }
  else if (!docHeader?.trackId) {
    alert('Пожалуйста, выберите тракториста'); // Выводим message box
  }
  else if (!docHeader?.markId) {
    alert('Пожалуйста, выберите марку машины'); // Выводим message box
  }
  else if (!docHeader?.individualId) {
    alert('Пожалуйста, выберите прицепщика'); // Выводим message box
  }
  else if (!docHeader?.pric) {
    alert('Пожалуйста, укажите прицеп'); // Выводим message box
  }
  else if (!docHeader?.brigId) {
    alert('Пожалуйста, выберите бригадира'); // Выводим message box
  }
  else if (!docHeader?.date) {
    alert('Пожалуйста, укажите корректную дату(DD.MM.YYYY)'); // Выводим message box
  }
  else if (!docHeader?.OKUD) {
    alert('Пожалуйста, укажите ОКПО'); // Выводим message box
  }
  else if (!docHeader?.OKPO) {
    alert('Пожалуйста, укажите ОКУД'); // Выводим message box
  }
  else if (!docHeader?.tabel) {
    alert('Пожалуйста, укажите табельный номер'); // Выводим message box
  }
  else if (!docHeader?.registr) {
    alert('Пожалуйста, укажите регистрационный номер'); // Выводим message box
  }
  else if (!docHeader?.inventnum) {
    alert('Пожалуйста, укажите инвентарный номер'); // Выводим message box
  }
  else if (!docHeader?.otdel) {
    alert('Пожалуйста, укажите отделение(участок)'); // Выводим message box
  }
  else if (!docHeader?.brigada) {
    alert('Пожалуйста, укажите бригаду'); // Выводим message box
  }


  else{
    const record = 
    currentRecord 
      ? await DocHeadersService.updateRecord({ 
      id: currentRecord.id, 
      ...docHeader, 
      }) 
      : await DocHeadersService.createRecord(docHeader) 
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
     value={docHeader?.num || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e => setDocHeader({ ...docHeader, num: e.target.value })} 
     placeholder="Укажите номер документа" 
     style={{ width: 464 }} 
    /> 
</Space> 
 
<Space style={{ width: '100%' }}> 

    
     <Select 
      value={docHeader?.organizationId || null} 
      onChange={value => setDocHeader({ ...docHeader, organizationId: value })} 
      placeholder={"Выберите организацию"} 
      style={{ width: 413 }} 
     > 
      {organizations.map(it => <Option 
       value={it.id}> 
       {it.title} 
      </Option>)} 
    </Select>
    <Button href="/organizations" target="_blank">
        +
       </Button> 

    </Space>

    <Space style={{ width: '100%' }}> 

    
     <Select 
      value={docHeader?.trackId || null} 
      onChange={value => setDocHeader({ ...docHeader, trackId: value })} 
      placeholder={"Выберите тракториста"} 
      style={{ width: 413 }} 
     > 
      {individuals.map(it => <Option 
       value={it.id}> 
       {it.lastName} 
      </Option>)} 
    </Select>
    <Button href="/individuals" target="_blank">
        +
       </Button> 

    </Space>

    <Space style={{ width: '100%' }}> 

    
     <Select 
      value={docHeader?.markId || null} 
      onChange={value => setDocHeader({ ...docHeader, markId: value })} 
      placeholder={"Выберите марку машины"} 
      style={{ width: 413 }} 
     > 
      {marks.map(it => <Option 
       value={it.id}> 
       {it.title} 
      </Option>)} 
    </Select>
    <Button href="/marks" target="_blank">
        +
       </Button>  
    </Space>





    <Space style={{ width: '100%' }}> 

    
     <Select 
      value={docHeader?.individualId || null} 
      onChange={value => setDocHeader({ ...docHeader, individualId: value })} 
      placeholder={"Выберите прицепщика"} 
      style={{ width: 413 }} 
     > 
      {individuals.map(it => <Option 
       value={it.id}> 
       {it.lastName} 
      </Option>)} 
    </Select>
    <Button href="/individuals" target="_blank">
        +
       </Button>  

    </Space>

    <Space style={{ width: '100%' }}> 

    <Input 
     value={docHeader?.pric || ''}
     onKeyDown={e => {
      if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e =>  setDocHeader({ ...docHeader, pric: e.target.value })}
     placeholder="Укажите прицеп" 
     style={{ width: 464 }} 
    /> 

</Space>
<Space>
     <Select 
      value={docHeader?.brigId || null} 
      onChange={value => setDocHeader({ ...docHeader, brigId: value })} 
      placeholder={"Выберите бригадира"} 
      style={{ width: 413 }} 
     > 
      {individuals.map(it => <Option 
       value={it.id}> 
       {it.lastName} 
      </Option>)} 
    </Select>
    <Button href="/individuals" target="_blank">
        +
       </Button>  
       </Space>
    <Space>

    <DatePicker  
      value={dayjs(docHeader?.date , 'YYYY-MM-DD').isValid() ? dayjs(docHeader.date , 'YYYY-MM-DD') : null} 
      onKeyDown={e => {
        if ( e.key !== 'Backspace') {
            e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
        }
    }} 
      onChange={date => setDocHeader({ ...docHeader, date: date })} 
      placeholder={"Укажите дату"} 
      style={{ width: 464 }} 
      format="DD.MM.YYYY" 
      allowClear={false} 
     /> 

 </Space>
   

 <Space style={{ width: '100%' }}> 
    <Input 
     value={docHeader?.OKUD || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e =>  setDocHeader({ ...docHeader, OKUD: e.target.value })}
     placeholder="Укажите ОКУД" 
     style={{ width: 464 }} 
    /> 

</Space>

<Space style={{ width: '100%' }}> 
    <Input 
     value={docHeader?.OKPO || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e =>  setDocHeader({ ...docHeader, OKPO: e.target.value })}
     placeholder="Укажите ОКПО" 
     style={{ width: 464 }} 
    /> 

</Space>

<Space style={{ width: '100%' }}> 
    <Input 
     value={docHeader?.tabel || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e =>  setDocHeader({ ...docHeader, tabel: e.target.value })}
     placeholder="Укажите табельный номер" 
     style={{ width: 464 }} 
    /> 

</Space>

<Space style={{ width: '100%' }}> 
    <Input 
     value={docHeader?.registr || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e =>  setDocHeader({ ...docHeader, registr: e.target.value })}
     placeholder="Укажите регистрационный номер" 
     style={{ width: 464 }} 
    /> 

</Space>

<Space style={{ width: '100%' }}> 
    <Input 
     value={docHeader?.inventnum || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e =>  setDocHeader({ ...docHeader, inventnum: e.target.value })}
     placeholder="Укажите инвентарный номер" 
     style={{ width: 464 }} 
    /> 

</Space>

<Space style={{ width: '100%' }}> 
    <Input 
     value={docHeader?.otdel || ''}
     onKeyDown={e => {
      if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e =>  setDocHeader({ ...docHeader, otdel: e.target.value })}
     placeholder="Укажите отдел(участок)" 
     style={{ width: 464 }} 
    /> 

</Space>

<Space style={{ width: '100%' }}> 
    <Input 
     value={docHeader?.brigada || ''}
     onKeyDown={e => {
      if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
  }} 
     onChange={e =>  setDocHeader({ ...docHeader, brigada: e.target.value })}
     placeholder="Укажите бригаду" 
     style={{ width: 464 }} 
    /> 

</Space>


  </Modal> 
 ) 

 

}  