const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const labsController = require('./controllers/labsController');
const attendeesController = require('./controllers/attendeesController');

const app = express();
const PORT = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET',
    allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use(cors(corsOptions));
app.get('/labs', labsController.getLabs.bind(labsController));
app.get('/labs/:id', labsController.getLabById.bind(labsController));
app.get('/attendees/:id', attendeesController.getAttendeesByCourseId.bind(attendeesController));
app.get('/attendees-with-lab-pass', attendeesController.getAttendeesWithLabPass.bind(attendeesController));
/*app.post('/users', labsController.create.bind(userController));
app.put('/users/:id', labsController.update.bind(userController));
app.delete('/users/:id', labsController.delete.bind(userController));
*/
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
