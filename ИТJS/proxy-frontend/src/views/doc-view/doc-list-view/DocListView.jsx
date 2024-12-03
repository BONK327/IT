import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import OrganizationService from "../../../api/services/organization-service";
import MarksService from "../../../api/services/marks-service";
import ClasService from "../../../api/services/clas-service";
import DocHeadersService from "../../../api/services/doc-header-service";
import IndividualService from "../../../api/services/individuals-service";
import { DocHeadersDialog } from "../../../components/dialogs/doc-headers-dialog/DocHeadersDialog";
import dayjs from 'dayjs';
import { Link } from "react-router-dom"; 
import { ROUTE_PATHS } from "../../../router/paths"; 

export const DocListView = ({
    ...props
}) => {
    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Номер',
            dataIndex: 'num',
            key: 'num',
        },
        {
            title: 'Организация',
            dataIndex: 'organizationId',
            render: (text, record) => organizations.find(it => it.id === record.organizationId)?.title,
        },
        {
            title: 'Тракторист',
            dataIndex: 'trackId',
            render: (text, record) => individuals.find(it => it.id === record.trackId)?.lastName,
        },
        {
            title: 'Марка машины',
            dataIndex: 'markId',
            render: (text, record) => marks.find(it => it.id === record.markId)?.title,
        },
        {
            title: 'Прицепщик',
            dataIndex: 'individualId',
            render: (text, record) => individuals.find(it => it.id === record.individualId)?.lastName,
        },
        {
            title: 'Прицеп',
            dataIndex: 'pric',
            key: 'pric',
        },
        {
            title: 'Бригадир',
            dataIndex: 'brigId',
            render: (text, record) => individuals.find(it => it.id === record.brigId)?.lastName,
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: 'ОКУД',
            dataIndex: 'OKUD',
            key: 'OKUD',
        },
        {
            title: 'ОКПО',
            dataIndex: 'OKPO',
            key: 'OKPO',
        },
        {
            title: 'Табельный номер',
            dataIndex: 'tabel',
            key: 'tabel',
        },
        {
            title: 'Регистрационный номер',
            dataIndex: 'registr',
            key: 'registr',
        },
        {
            title: 'Инвентарный номер',
            dataIndex: 'inventnum',
            key: 'inventnum',
        },
        {
            title: 'Отделеление(участок)',
            dataIndex: 'otdel',
            key: 'otdel',
        },
        {
            title: 'Бригада',
            dataIndex: 'brigada',
            key: 'brigada',
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

    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [visible, setVisible] = useState(false);

    const [individuals, setIndividuals] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [marks, setMarks] = useState([]);
    const [clas, setClas] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const individuals = await IndividualService.getAllRecords();
          const marks = await MarksService.getAllRecords();
          const clas = await ClasService.getAllRecords();
          const organizations = await OrganizationService.getAllRecords();
          const list = await DocHeadersService.getAllRecords();   //CAS   
          setOrganizations(organizations);
          setIndividuals(individuals);
          setList(list);
          setMarks(marks);
          setClas(clas);
        } catch (res) {
          alert("Произошла ошибка:", res);
        }
      };
    
      fetchData();
    }, []);
    console.log(list);

    const createRecordHandler = () => {
        setCurrentRecord(null)
        setVisible(true);
    }

    const updateRecordHandler = (record) => {
        setCurrentRecord(record)
        setVisible(true)
    }

    const deleteRecordHandler = async (recordId) => {
        await DocHeadersService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }

    return (
        <div style={{ padding: 16 }}>
    <Table
        dataSource={list}
        columns={columns}
        onRow={(record, rowIndex) => ({
            onDoubleClick: event => {
                navigate(`/doc/${record.id}`);
            },
        })}
    />
            <Button onClick={createRecordHandler}>
                Создать
            </Button>
            <Button type="primary">
                <Link  to={ROUTE_PATHS.create}>
                Новый документ
                </Link>
            </Button>
            <DocHeadersDialog
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
                individuals={individuals}
                organizations={organizations}
                marks={marks}
                clas={clas}
                
            />
        </div>
    )
}