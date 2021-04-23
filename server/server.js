const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.router.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use('/tasks', todoRouter);

//Serve back static files by default
app.use(express.static('server/public'));

//Start listening for requests on a specific PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log('Listening on port', PORT);
});