const { Router } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


//GET Route
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "to_do_list_db" ORDER BY "id";';
    pool.query(queryText)
    .then(result => {
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
    if (newTask.complete === 'true'){
        newTask.complete = true;
        console.log( newTask.complete);
    }
    if (newTask.complete === 'false'){
        newTask.complete = false;
        console.log( newTask.complete);
    }
    let queryText = `INSERT INTO "to_do_list_db ("task", "complete")
                        VALUES ( $1, $2);`;
    pool.query(queryText, [newTask.task, newTask.complete])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new task', error);
            res.sendStatus(500);
        });
});

//PUT Route
router.put('/complete/:id', (req, res) => {
    let taskId = req.params.id;
    let boolean = req.body.boolean;
    let sqlText = '';
    if (boolean === 'true') {
        sqlText = `UPDATE "to_do_list_db" SET "complete" = true WHERE "id"=$1;`;
    }
    else {
        res.sendStatus(500);
        return;
    }
    pool.query(sqlText, [taskId])
    .then((resDB) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error with request', error);
        res.sendStatus(500);
    });
});

//DELETE Route
router.delete('/:id', (req, res) =>{
    let reqId = req.params.id;
    console.log('Delete request id', redId);
    let sqlText = 'DELETE FROM "to_do_list_db" WHERE "id"=$1;';
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
