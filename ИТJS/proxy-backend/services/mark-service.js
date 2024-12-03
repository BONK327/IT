const MarkModel = require('../models/mark-model');

class MarkService {
    /** получить все записи из таблицы "marks" */
    async getAllRecords() {
        const list = await MarkModel.findAll();
        return list;
    }

    /** создать запись в таблице "marks" */
    async createRecord(payload) {
        const data = await MarkModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "marks" */
    async updateRecord(payload) {
        let record = await MarkModel.findOne({ where: { id: payload.id } });
        record.title = payload?.title || record.title;
        return await record.save();
    }

    /** удалить запись из таблицы "marks" */
    async removeRecord(recordId) {
        const record = await MarkModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new MarkService();