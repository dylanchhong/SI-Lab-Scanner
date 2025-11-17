const { sql, poolPromise } = require('../db');

class AttendeesRepository {
    async getAttendeesWithLabPass() {
        const pool = await poolPromise;
        const result = await pool.request().execute('SI.getRegistrationsWithLabPass');
        return result.recordset;
    }

    async getAttendeesByCourseId(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('CourseId', sql.Int, id)
            .execute('SiLabCheckin.GetAttendeesByCourseId');
        return result.recordset;
    }
}

module.exports = new AttendeesRepository();
