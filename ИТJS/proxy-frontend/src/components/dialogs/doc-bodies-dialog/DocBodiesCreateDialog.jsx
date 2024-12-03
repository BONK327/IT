import { Input, Space, Button } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import { Select } from 'antd'; 



const { Option } = Select; 

let localId = 0 

 

export const DocBodiesCreateDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
marks,
clas,
organizations,
individuals,
 docHeaderId,
 docHeader,
 setDocHeader,


 ...props 

}) => { 
 const [docBody, setDocBody] = useState(null); 

 
 useEffect(() => { 
   if (currentRecord) { 
    setDocBody(currentRecord); 
   } else { 
    setDocBody(null); 
   } 
 }, [currentRecord]) 

 
 const onOkHandler = async () => { 
  if (!docBody?.rasp) {
    alert('Пожалуйста, укажите в чьё распоряжение'); // Выводим message box
  }
  else if (!docBody?.otkuda) {
    alert('Пожалуйста, укажите откуда взять груз'); // Выводим message box
  }
  else if (!docBody?.kuda) {
    alert('Пожалуйста, укажите куда доставить груз'); // Выводим message box
  }
  else if (!docBody?.rasst) {
    alert('Пожалуйста, укажите расстояние'); // Выводим message box
  }
  else if (!docBody?.name) {
    alert('Пожалуйста, укажите название груза'); // Выводим message box
  }
  else if (!docBody?.classId) {
    alert('Пожалуйста, выберите класс груза'); // Выводим message box
  }
  else if (!docBody?.chislo) {
    alert('Пожалуйста, укажите число ездок'); // Выводим message box
  }
  else if (!docBody?.kolvo) {
    alert('Пожалуйста, укажите количество мест'); // Выводим message box
  }
  else if (!docBody?.ves) {
    alert('Пожалуйста, укажите вес груза'); // Выводим message box
  }



  else{
   const record = 
    {id: localId, 
      rasp: docBody.rasp,
      otkuda: docBody.otkuda, 
      kuda: docBody.kuda, 
      rasst: docBody.rasst, 
      name: docBody.name, 
      classId: docBody.classId, 
      chislo: docBody.chislo, 
      kolvo: docBody.kolvo, 
      ves: docBody.ves, 



    } 
   onOk(record); 
   setDocBody(null); 
   localId += 1; 
 }
}

 
 return ( 
   <Modal 
    visible={visible} 
    title={currentRecord ? 'Редактировать' : 'Создать'} 
    onOk={onOkHandler} 
    onCancel={onCancel} 
   > 
    <Space direction="vertical"> 
  
  <Space> 

   <Input  
     value={docBody?.rasp || ''}
     onKeyDown={e => {
      if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
     }} 
     onChange={e => setDocBody({ ...docBody, rasp: e.target.value })}
     placeholder="Укажите в чьё распоряжение" 
     style={{ width: 464 }}
   /> 
   </Space>
   <Space> 

   <Input  
     value={docBody?.otkuda || ''}
     onKeyDown={e => {
      if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
     }} 
     onChange={e => setDocBody({ ...docBody, otkuda: e.target.value })}
     placeholder="Укажите откуда взять груз" 
     style={{ width: 464 }}
   /> 
   </Space>
   <Space> 

   <Input  
     value={docBody?.kuda || ''}
     onKeyDown={e => {
      if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
     }} 
     onChange={e => setDocBody({ ...docBody, kuda: e.target.value })}
     placeholder="Укажите куда доставить груз" 
     style={{ width: 464 }}
   /> 
   </Space>
   <Space> 

   <Input  
     value={docBody?.rasst || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
     }} 
     onChange={e => setDocBody({ ...docBody, rasst: e.target.value })}
     placeholder="Укажите расстояние" 
     style={{ width: 464 }}
   /> 
   </Space>
   <Space> 

   <Input  
     value={docBody?.name || ''}
     onKeyDown={e => {
      if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
     }} 
     onChange={e => setDocBody({ ...docBody, name: e.target.value })}
     placeholder="Укажите название груза" 
     style={{ width: 464 }}
   /> 
   </Space>
   <Space>

  <Select 
   value={docBody?.classId || null} 
   onChange={value => setDocBody({...docBody, classId: value})} 
   placeholder={"Выберите класс груза"} 
   style={{ width: 413 }} 
   
  > 
   {clas.map(it => <Option 
     value={it.id}> 
     {it.title} 
   </Option>)} 


  </Select>
  <Button href="/clas" target="_blank">
        +
       </Button>
  </Space>
  <Space> 

   <Input  
     value={docBody?.chislo || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
     }} 
     onChange={e => setDocBody({ ...docBody, chislo: e.target.value })}
     placeholder="Укажите число ездок" 
     style={{ width: 464 }}
   /> 
   </Space>
   <Space> 

   <Input  
     value={docBody?.kolvo || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
     }} 
     onChange={e => setDocBody({ ...docBody, kolvo: e.target.value })}
     placeholder="Укажите количество мест" 
     style={{ width: 464 }}
   /> 
   </Space>
   <Space> 

   <Input  
     value={docBody?.ves || ''}
     onKeyDown={e => {
      if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== " " && e.key !== 'Backspace') {
          e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
      }
     }} 
     onChange={e => setDocBody({ ...docBody, ves: e.target.value })}
     placeholder="Укажите вес" 
     style={{ width: 464 }}
   /> 
   </Space>





  


  </Space> 

 
   </Modal> 
 ) 

}