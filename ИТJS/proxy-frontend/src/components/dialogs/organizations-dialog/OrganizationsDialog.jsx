import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import OrganizationService from "../../../api/services/organization-service";

export const OrganizationsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setOrganization(currentRecord);
        } else {
            setOrganization(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        if (!organization?.title) {
            alert('Пожалуйста, укажите наименование'); // Выводим message box
        }
        else if (!organization?.inn){
            alert('Пожалуйста, укажите ИНН');
        }
        else if (!organization?.leader){
            alert('Пожалуйста, укажите должность руководителя');
        }
        else{
        const record =
            currentRecord
                ? await OrganizationService.updateRecord({
                    id: currentRecord.id,
                    ...organization,
                })
                : await OrganizationService.createRecord(organization)
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

            <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                    value={organization?.title || ''}
                    onKeyDown={e => {
                        if (/^\d$/.test(e.key) && e.key !== 'Backspace') {
                            e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                        }
                    }}
                    onChange={e => { if (e.target.value.length <= 50) { setOrganization({ ...organization, title: e.target.value })}}}
                    placeholder="Укажите наименование"
                />

                <Input
                    value={organization?.inn || ''}
                    onKeyDown={e => {
                        if (!/^\d$/.test(e.key) && e.key !== 'Backspace') {
                            e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                        }
                    }}
                    onChange={e => { if (e.target.value.length <= 10) { setOrganization({ ...organization, inn: e.target.value })}}}
                    placeholder="Укажите ИНН"
                />

<Input
                    value={organization?.leader || ''}
                    onKeyDown={e => {
                        if (/^\d$/.test(e.key) && e.key !== 'Backspace') {
                            e.preventDefault(); // Отменяем ввод, если символ не соответствует условию
                        }
                    }}
                    onChange={e => { if (e.target.value.length <= 10) { setOrganization({ ...organization, leader: e.target.value })}}}
                    placeholder="Укажите должность руководителя"
                />
            </Space>

        </Modal>
    )
}