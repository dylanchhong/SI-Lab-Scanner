const labsRepository = require('../repositories/labsRepository');

class LabsController {
    async getLabs(req, res) {
        try {
            const labs = await labsRepository.getLabs();
            res.json(labs);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getLabById(req, res) {
        try {
            const lab = await labsRepository.getLabById(req.params.id);
            if (!lab) return res.status(404).send('Lab not found');
            res.json(lab);
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

module.exports = new LabsController();
