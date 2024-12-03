import { Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import ClasService from "../../../api/services/clas-service";

export const ClasDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [clas, setClas] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setClas(currentRecord);
        } else {
            setClas(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        if (!clas?.title) {
            alert('Пожалуйста, укажите название класса груза'); // Выводим message box
        }
        else {
            const record =
            currentRecord
                ? await ClasService.updateRecord({
                    id: currentRecord.id,
                    ...clas,
                })
                
                : await ClasService.createRecord(clas)
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
                        value={clas?.title || ''}
                        onKeyDown={e => {
                            if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key) && e.key !== " ") {
                                e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                            }
                        }}
                        onChange={e => { if (e.target.value.length <= 50) { setClas({ ...clas, title: e.target.value })}}}
                        
                        placeholder="Укажите укажите название класса груза"
                        style={{ width: '100%' }} 
                    />


            
        </Modal>
    )
}