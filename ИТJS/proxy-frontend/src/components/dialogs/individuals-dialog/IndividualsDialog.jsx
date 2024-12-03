import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import IndividualService from "../../../api/services/individuals-service";

export const IndividualsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [individual, setIndividual] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setIndividual(currentRecord);
        } else {
            setIndividual(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        if (!individual?.lastName) {
            alert('Пожалуйста, укажите фамилию'); // Выводим message box
        }
        else if (!individual?.firstName){
            alert('Пожалуйста, укажите имя');
        }
        else if (!individual?.issued){
            alert('Пожалуйста, укажите кем выдан документ');
        }
        else if (!individual?.series){
            alert('Пожалуйста, укажите серию');
        }
        else if (!individual?.number){
            alert('Пожалуйста, укажите номер');
        }
        else {
            const record =
            currentRecord
                ? await IndividualService.updateRecord({
                    id: currentRecord.id,
                    ...individual,
                })
                
                : await IndividualService.createRecord(individual)
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

            <Space direction="vertical">

                <Space>
                    <Input
                        value={individual?.lastName || ''}
                        onKeyDown={e => {
                            if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key)) {
                                e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                            }
                        }}
                        onChange={e => { if (e.target.value.length <= 25) { setIndividual({ ...individual, lastName: e.target.value })}}}
                        placeholder="Укажите фамилию"
                    />



                    <Input
                        value={individual?.firstName || ''}
                        onKeyDown={e => {
                            if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key)) {
                                e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                            }
                        }}
                        onChange={e => { if (e.target.value.length <= 25) { setIndividual({ ...individual, firstName: e.target.value })}}}
                        placeholder="Укажите имя"
                    />

                    <Input
                        value={individual?.patronymic || ''}
                        onKeyDown={e => {
                            if (!/^[A-Za-zА-Яа-яЁё]*$/.test(e.key)) {
                                e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                            }
                        }}
                        onChange={e => { if (e.target.value.length <= 25) { setIndividual({ ...individual, patronymic: e.target.value })}}}
                        placeholder="Укажите отчество"
                    />
                </Space>

                <Input
                    value={individual?.issued || ''}
                    onKeyDown={e => {
                        if (!/^[A-Za-zА-Яа-яЁё\s]*$/.test(e.key)) {
                            e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                        }
                    }}
                    onChange={e => { if (e.target.value.length <= 80) { setIndividual({ ...individual, issued: e.target.value })}}}
                    placeholder="Укажите, кем выдан документ"
                />

                <Space align="center">
                    <Input
                        value={individual?.series || ''}
                        onKeyDown={e => {
                            if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
                                e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                            }
                        }}
                        onChange={e => { if (e.target.value.length <= 4) { setIndividual({ ...individual, series: e.target.value })}}}
                        placeholder="Укажите серию"
                    />

                    <Input
                        value={individual?.number || ''}
                        onKeyDown={e => {
                            if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
                                e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                            }
                        }}
                        onChange={e => { if (e.target.value.length <= 6) { setIndividual({ ...individual, number: e.target.value })}}}
                        placeholder="Укажите номер"
                    />
                </Space>

            </Space>
        </Modal>
    )
}