const ClasModel = require('../models/clas-model');

class ClasService {
    /** получить все записи из таблицы "classs" */
    async getAllRecords() {
        const list = await ClasModel.findAll();
        return list;
    }

    /** создать запись в таблице "classs" */
    async createRecord(payload) {
        const data = await ClasModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "classs" */
    async updateRecord(payload) {
        let record = await ClasModel.findOne({ where: { id: payload.id } });
        record.title = payload?.title || record.title;
        return await record.save();
    }

    /** удалить запись из таблицы "classs" */
    async removeRecord(recordId) {
        const record = await ClasModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new ClasService();