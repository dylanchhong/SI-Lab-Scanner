const { sql, poolPromise } = require('../db');

class LabsRepository {
    async getLabs() {
        const pool = await poolPromise;
        const result = await pool.request().execute('SiLabCheckin.GetLabs');
        return result.recordset;
    }

    async getLabById(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('CourseId', sql.Int, id)
            .execute('SiLabCheckin.GetLabById');
        return result.recordset[0];
    }
}

module.exports = new LabsRepository();
