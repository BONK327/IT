import { Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import MarksService from "../../../api/services/marks-service";

export const MarksDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [mark, setMark] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setMark(currentRecord);
        } else {
            setMark(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        if (!mark?.title) {
            alert('Пожалуйста, укажите название марки машины'); // Выводим message box
        }
        else {
            const record =
            currentRecord
                ? await MarksService.updateRecord({
                    id: currentRecord.id,
                    ...mark,
                })
                
                : await MarksService.createRecord(mark)
        onOk(record);
        }
        
        
    }

    return (
        <Modal
            visible={visible}
            title={currentRecord ? 'Редактировать' : 'Создать'}
            onOk={onOkHandler}
            onCancel={onCancel}
        >
                    <Input
                        value={mark?.title || ''}
                        onKeyDown={e => {
                            if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " ") {
                                e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                            }
                        }}
                        onChange={e => { if (e.target.value.length <= 50) { setMark({ ...mark, title: e.target.value })}}}
                        
                        placeholder="Укажите укажите название марки машины"
                        style={{ width: '100%' }} 
                    />


            
        </Modal>
    )
}