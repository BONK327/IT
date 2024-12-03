import { Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import ProductService from "../../../api/services/product-service";

export const ProductsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (currentRecord) {
            setTitle(currentRecord.title);
        } else {
            setTitle('');
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        if (!title) {
            alert('Пожалуйста, укажите наименование'); // Выводим message box
        }
        else{
        const record =
            currentRecord
                ? await ProductService.updateRecord({
                    id: currentRecord.id,
                    title,
                })
                : await ProductService.createRecord({ title })
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
                value={title}
                onChange={e => { if (e.target.value.length <= 50) { setTitle(e.target.value)}}}
                placeholder="Укажите наименование"
            />

        </Modal>
    )
}