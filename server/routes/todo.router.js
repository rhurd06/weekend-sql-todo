const { Router, response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


//GET Route
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "weekend_to_do_list" ORDER BY "id";';
    pool.query(queryText)
    .then(result => {
        //sends back results in an object
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error getting tasks', error);
        res.sendStatus(500);
    });
});

//POST Route
router.post('/', (req, res) =>{
    let newTask = req.body;
    console.log('Adding task', newTask);
    let queryText = `INSERT INTO "weekend_to_do_list" ("task")
                        VALUES ( $1);`;
    pool.query(queryText, [newTask.task])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new task', error);
            res.sendStatus(500);
        });
});

//PUT Route
router.put('/:id', (req, res) => {
    let taskId = req.params.id;
    let queryText = `UPDATE "weekend_to_do_list" SET "complete" = 'true' WHERE "id"=$1;`;
    pool.query(queryText, [taskId])
    .then( response => {
        console.log('Marked complete');
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('Error with request', error);
        res.sendStatus(500);
    });
});

//DELETE Route
router.delete('/:id', (req, res) =>{
    let reqId = req.params.id;
    console.log('Delete request id', reqId);
    let sqlText = 'DELETE FROM "weekend_to_do_list" WHERE "id"=$1;';
    pool.query(sqlText, [reqId])
    .then((result) => {
        console.log('Task deleted');
        res.sendStatus(200);
    })
    .catch((error) =>{
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
    })
})

module.exports = router;
