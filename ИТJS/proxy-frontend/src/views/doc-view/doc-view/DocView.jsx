import { DatePicker, Button, Space, Table, Select, Input } from "antd"; 
import React, { useEffect, useRef, useState } from "react"; 
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { useParams } from "react-router"; 
import DocBodyService from "../../../api/services/doc-body-service"; 
import DocHeadersService from "../../../api/services/doc-header-service"; 
import OrganizationService from "../../../api/services/organization-service";
import MarksService from "../../../api/services/marks-service";
import ClasService from "../../../api/services/clas-service"; 
import IndividualService from "../../../api/services/individuals-service"; 
import { DocBodiesDialog } from "../../../components/dialogs/doc-bodies-dialog/DocBodiesDialog"; 
import { useReactToPrint } from "react-to-print"; 
import dayjs from 'dayjs';

 

const { Option } = Select; 

 

export const DocView = ({ 
 onOk, 
 onClick, 
 ...props 

}) => { 
 const columns = [ 
    { 
        title: 'Код', 
        dataIndex: 'id', 
        key: 'id', 
       },
       { 
        title: 'В чьё распоряжение', 
        dataIndex: 'rasp',  
       },
       { 
        title: 'Откуда взять груз', 
        dataIndex: 'otkuda',  
       },
       { 
        title: 'Куда доставить груз', 
        dataIndex: 'kuda',  
       },
       { 
        title: 'Расстояние', 
        dataIndex: 'rasst',  
       },
       { 
        title: 'Название груза', 
        dataIndex: 'name',  
       },
       {
        title: 'Класс груза',
        dataIndex: 'classId',
        key: 'classId',
        render: (text, record) => clas.find(it => it.id === record.classId)?.title,
        },
        { 
            title: 'Число ездок', 
            dataIndex: 'chislo',  
           },
           { 
            title: 'Кол-во мест', 
            dataIndex: 'kolvo',  
           },
           { 
            title: 'Вес груза', 
            dataIndex: 'ves',  
           },
        



  { 
   title: 'Действия', 
   key: 'actions', 
   render: (text, record) => { 
    return ( 
     <Space size="middle"> 
      <div onClick={() => updateRecordHandler(record)}> 
       <EditOutlined /> 
      </div> 
      <div onClick={() => deleteRecordHandler(record.id)}> 
       <DeleteOutlined /> 
      </div> 
     </Space> 
    ) 
   } 
  } 
 ]; 

 
 const componentRef = useRef(); 
 const handlePrint = useReactToPrint({ 
  content: () => componentRef.current, 
 }); 
 const { id } = useParams(); 
 const [doc, setDoc] = useState(null); 
 const [list, setList] = useState([]); 
 const [individuals, setIndividuals] = useState([]); 
 const [organizations, setOrganizations] = useState([]); 
 const [currentRecord, setCurrentRecord] = useState(null); 
 const [visible, setVisible] = useState(false); 
 const [marks, setMarks] = useState([]);
const [clas, setClas] = useState([]);

 
 useEffect( () => { 
  async function fetchData() { 

   const list = await DocBodyService.getAllHeadersRecords(id); 
   const individuals = await IndividualService.getAllRecords(); 
   const organizations = await OrganizationService.getAllRecords();  
   const doc = await DocHeadersService.getOneRecord(id);
   const marks = await MarksService.getAllRecords();
   const clas = await ClasService.getAllRecords();
   console.log(doc)
 
   setList(list); 
   setDoc(doc); 

 
   setIndividuals(individuals); 
   setOrganizations(organizations); 
   setMarks(marks);
   setClas(clas);

 
   return () => { 
    setList([]); 
    setDoc(null); 

 
    setIndividuals([]); 
    setOrganizations([]); 
    setMarks([]);
    setClas([]);
  }; 
  } 
  fetchData(); 
 }, [id]); 



 const createRecordHandler = () => { 
  setCurrentRecord(null) 
  setVisible(true); 
 } 
 const updateRecordHandler = (record) => { 
  setCurrentRecord(record) 
  setVisible(true) 
 } 
 const deleteRecordHandler = async (recordId) => { 
  await DocBodyService.removeRecord(recordId); 
  setList(list.filter(it => it.id !== recordId)); 
 } 

 
 return ( 
  <div style={{ padding: 16 }}> 
   <div ref={componentRef}> 
   <Button href="/doc"> 
     Назад
    </Button> 

    <tt ><br/>Согласовано:<br/>письмом Госкомстата России<br/>от 10.04.2003 г. № КЛ-01-21/1381</tt>

    <tt><br/>Утверждено:<br/>приказом Минсельхоза России<br/>от 16.05.2003 г. № 750</tt>


 
    <Space 
     direction={'vertical'} 
     align={'center'}  
     style={{ width: '100%', marginBottom: 24 }} 
    > 
     <h2>Путевой Лист № <strong>{doc?.num}</strong></h2> 
     
     <Space style={{ width: '100%' }}> 

    Организация:
<Select 
 value={doc?.organizationId || null} 
 onChange={value => setDoc({ ...doc, organizationId: value })} 
 placeholder={"Выберите организацию"} 
 style={{ width: 232 }} 
> 
 {organizations.map(it => <Option 
  value={it.id}> 
  {it.title} 
 </Option>)} 
</Select> 

Тракторист:
<Select 
 value={doc?.trackId || null} 
 onChange={value => setDoc({ ...doc, trackId: value })} 
 placeholder={"Выберите тракториста"} 
 style={{ width: 232 }} 
> 
 {individuals.map(it => <Option 
  value={it.id}> 
  {it.lastName} 
 </Option>)} 
</Select> 

</Space>

<Space style={{ width: '100%' }}> 

Марка машины:
<Select 
 value={doc?.markId || null} 
 onChange={value => setDoc({ ...doc, markId: value })} 
 placeholder={"Выберите марку машины"} 
 style={{ width: 232 }} 
> 
 {marks.map(it => <Option 
  value={it.id}> 
  {it.title} 
 </Option>)} 
</Select> 



Прицепщик:
<Select 
 value={doc?.individualId || null} 
 onChange={value => setDoc({ ...doc, individualId: value })} 
 placeholder={"Выберите прицепщика"} 
 style={{ width: 232 }} 
> 
 {individuals.map(it => <Option 
  value={it.id}> 
  {it.lastName} 
 </Option>)} 
</Select> 

</Space>

<Space style={{ width: '100%' }}> 
Прицеп:
<Input 
value={doc?.pric || ''}
onKeyDown={e => {
 if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
     e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
 }
}} 
onChange={e =>  setDoc({ ...doc, pric: e.target.value })}
placeholder="Укажите прицеп" 
style={{ width: 232 }} 
/> 


Бригадир:
<Select 
 value={doc?.brigId || null} 
 onChange={value => setDoc({ ...doc, brigId: value })} 
 placeholder={"Выберите бригадира"} 
 style={{ width: 232 }} 
> 
 {individuals.map(it => <Option 
  value={it.id}> 
  {it.lastName} 
 </Option>)} 
</Select> 
</Space>
<Space>
Дата:
<DatePicker  
 value={dayjs(doc?.date , 'YYYY-MM-DD').isValid() ? dayjs(doc.date , 'YYYY-MM-DD') : null} 
 onKeyDown={e => {
   if ( e.key !== 'Backspace') {
       e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
   }
}} 
 onChange={date => setDoc({ ...doc, date: date })} 
 placeholder={"Укажите дату"} 
 style={{ width: 232 }} 
 format="DD.MM.YYYY" 
 allowClear={false} 
/> 

ОКУД:
<Input 
value={doc?.OKUD || ''}
onKeyDown={e => {
 if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
     e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
 }
}} 
onChange={e =>  setDoc({ ...doc, OKUD: e.target.value })}
placeholder="Укажите ОКУД" 
style={{ width: 232 }} 
/> 

</Space>

<Space style={{ width: '100%' }}> ОКПО:
<Input 
value={doc?.OKPO || ''}
onKeyDown={e => {
 if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
     e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
 }
}} 
onChange={e =>  setDoc({ ...doc, OKPO: e.target.value })}
placeholder="Укажите ОКПО" 
style={{ width: 232 }} 
/> 

Табельный номер:
<Input 
value={doc?.tabel || ''}
onKeyDown={e => {
 if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
     e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
 }
}} 
onChange={e =>  setDoc({ ...doc, tabel: e.target.value })}
placeholder="Укажите табельный номер" 
style={{ width: 232 }} 
/> 

</Space>

<Space style={{ width: '100%' }}> Регистрационный номер:
<Input 
value={doc?.registr || ''}
onKeyDown={e => {
 if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
     e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
 }
}} 
onChange={e =>  setDoc({ ...doc, registr: e.target.value })}
placeholder="Укажите регистрационный номер" 
style={{ width: 232 }} 
/> 

Инвентарный номер:
<Input 
value={doc?.inventnum || ''}
onKeyDown={e => {
 if (!/^\d$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
     e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
 }
}} 
onChange={e =>  setDoc({ ...doc, inventnum: e.target.value })}
placeholder="Укажите инвентарный номер" 
style={{ width: 232 }} 
/> 

</Space>

<Space style={{ width: '100%' }}> Отделение(участок):
<Input 
value={doc?.otdel || ''}
onKeyDown={e => {
 if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
     e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
 }
}} 
onChange={e =>  setDoc({ ...doc, otdel: e.target.value })}
placeholder="Укажите отдел(участок)" 
style={{ width: 232 }} 
/> 

Бригада:
<Input 
value={doc?.brigada || ''}
onKeyDown={e => {
 if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " " && e.key !== 'Backspace') {
     e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
 }
}} 
onChange={e =>  setDoc({ ...doc, brigada: e.target.value })}
placeholder="Укажите бригаду" 
style={{ width: 232 }} 
/> 

</Space>





     </Space>

 

 
    <Table  dataSource={list} columns={columns} /> 
   </div> 

 
   <Space> 
    <Button onClick={createRecordHandler}> 
     Добавить 
    </Button> 
    <Button type="dashed" onClick={handlePrint}> 
     Печать 
    </Button> 
   </Space> 

 
   <DocBodiesDialog 
    visible={visible} 
    onOk={(record) => { 
     currentRecord 
      ? setList(list.map(it => it.id === currentRecord.id 
       ? { ...record } 
       : it)) 
      : setList([...list, record]); 

 
     setCurrentRecord(null); 
     setVisible(false); 
    }} 
    onCancel={() => setVisible(false)} 
    currentRecord={currentRecord} 
    marks={marks}
    clas={clas} 
    docHeaderId={id} 
    individuals={individuals}
   /> 
  </div> 
 ) 

}