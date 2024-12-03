const DocBodyModel = require('../models/doc-body-model');

class DocBodyService {
    /** получить все записи из таблицы "docbodies" по  docHeaderId */
    async getAllHeadersRecords(headerId) {
        const list = await DocBodyModel.findAll({ where: { docHeaderId: headerId } });
        return list;
    }

    /** создать запись в таблице "docbodies" */
    async createRecord(payload) {
        const data = await DocBodyModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "docbodies" */
    async updateRecord(payload) {
        let record = await DocBodyModel.findOne({ where: { id: payload.id } });
        record.cult = payload?.cult || record.cult;
        record.term = payload?.term || record.term;
        record.brig = payload?.brig || record.brig;
        record.debet = payload?.debet || record.debet;
        record.unitId = payload?.unitId || record.unitId;
        record.hours = payload?.hours || record.hours;
        record.norma = payload?.norma || record.norma;
        record.ras = payload?.ras || record.ras;
        record.etalon = payload?.etalon || record.etalon;
        record.vnature = payload?.vnature || record.vnature;
        record.uslgek = payload?.uslgek || record.uslgek;
        record.smena = payload?.smena || record.smena;
        record.platosn = payload?.platosn || record.platosn;
        record.platdop = payload?.platdop || record.platdop;
        record.platvsego = payload?.platvsego || record.platvsego;
        record.oplata = payload?.oplata || record.oplata;
        record.rashodnorm = payload?.rashodnorm || record.rashodnorm;
        record.rashodvsego = payload?.aarashodvsegoa || record.rashodvsego;
        record.fact = payload?.fact || record.fact;
        record.docHeaderId = payload?.docHeaderId || record.docHeaderId;

        return await record.save();
    }

    /** удалить запись из таблицы "docbodies" */
    async removeRecord(recordId) {
        const record = await DocBodyModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new DocBodyService();