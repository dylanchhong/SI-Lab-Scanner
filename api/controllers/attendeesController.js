const attendeesRepository = require('../repositories/attendeesRepository');

class AttendeesController {
    async getAttendeesWithLabPass(req, res) {
        try {
            const attendees = await attendeesRepository.getAttendeesWithLabPass();
            res.json(attendees);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getAttendeesByCourseId(req, res) {
        try {
            const attendees = await attendeesRepository.getAttendeesByCourseId(req.params.id);
            res.json(attendees);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    /*async create(req, res) {
        try {
            const result = await userRepository.createUser(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async update(req, res) {
        try {
            const result = await userRepository.updateUser(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const result = await userRepository.deleteUser(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }*/
}

module.exports = new AttendeesController();
