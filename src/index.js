const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// ############# making mango db connection ##############
const { startDatabase } = require('./database/mongo');``
const { insertTodo, getTodos, deleteTodo, updateTodo, } = require('./database/todos');


// defining Express app
const app = express();

// adding helmet to enhance security
app.use(helmet());

// using body parser to parse JSON into Js objects
app.use(bodyParser.json());

// enabling cors for all request
app.use(cors());

// adding morgan to log HTTP request
app.use(morgan('combined'));

// defining end point to return all todos
app.get('/todolist', async (req, res) => {
    res.send(await getTodos())
})

// ... app definition, middleware configuration, and 

app.post('/todolist/add', async (req, res) => {
    const newTodo = req.body;
    await insertTodo(newTodo);
    res.send({ message: 'New todolist inserted.' });
});

// endpoint to delete
app.delete('/todolist/delete/:id', async (req, res) => {
    await deleteTodo(req.params.id);
    res.send({ message: 'Todo item removed.' });
});

// endpoint to update
app.put('/todolist/update/:id', async (req, res) => {
    const updatedTodo = req.body;
    await updateTodo(req.params.id, updatedTodo);
    res.send({ message: 'Todo item updated.' });
});

// start the in-memory mongoDB instance
startDatabase().then(async () => {
    await insertTodo({ title: "Hello i'm new from MangoDB database!!!" })

    app.listen(3005, () => {
        console.log("Listening from port 3005 mongoDB!")
    })
})