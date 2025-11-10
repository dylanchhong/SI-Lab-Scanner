const express = require('express');
const bodyParser = require('body-parser');
const labsController = require('./controllers/labsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.get('/labs', labsController.getLabs.bind(labsController));
app.get('/labs/:id', labsController.getLabById.bind(labsController));
/*app.post('/users', labsController.create.bind(userController));
app.put('/users/:id', labsController.update.bind(userController));
app.delete('/users/:id', labsController.delete.bind(userController));
*/
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
