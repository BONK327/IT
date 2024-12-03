const DocHeaderModel = require('../models/doc-header-model');

class DocHeaderService {
    /** получить все записи из таблицы "docheaders" */
    async getAllRecords() {
        const list = await DocHeaderModel.findAll();
        return list;
    }

    /** получить одну запись по id из таблицы "docheaders" */
    async getOneRecord(recordId) {
        const record = await DocHeaderModel.findOne({ where: {id: recordId } });
        return record;
    }

    /** создать запись в таблице "docheaders" */
    async createRecord(payload) {
        const data = await DocHeaderModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "docheaders" */
    async updateRecord(payload) {
        let record = await DocHeaderModel.findOne({ where: { id: payload.id } });
        record.num = payload?.num || record?.num;
        record.organizationId = payload?.organizationId || record?.organizationId;
        record.date = payload?.date || record?.date;
        record.brig = payload?.brig || record?.brig;
        record.profId = payload?.profId || record?.profId;
        record.kat = payload?.kat || record?.kat;
        record.post = payload?.post || record?.post;
        record.individualId = payload?.individualId || record?.individualId;
        record.tabel = payload?.tabel || record?.tabel;
        record.pric = payload?.pric || record?.pric;
        record.otdel = payload?.otdel || record?.otdel;
        record.brigada = payload?.brigada || record?.brigada;
        record.mark = payload?.mark || record?.mark;
        record.inventnum = payload?.inventnum || record?.inventnum;

        return await record.save();
    }

    /** удалить запись из таблицы "docheaders" */
    async removeRecord(recordId) {
        const record = await DocHeaderModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new DocHeaderService();