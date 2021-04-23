const { response } = require("express");

console.log('js');
$(onReady);

function onReady(){
    console.log('jQuery added');
    //Establish click listeners
    setupClickListeners();
    getTasks();
}//end onReady

function setupClickListeners(){
    $('#addTask').on('click', function(){
        console.log('In addTask on click');
        let taskToAdd = {
            name: $('#taskName').val(),
        };
        //call saveTask with new object
        saveTask(taskToAdd);
    });
    $('#viewTasks').on('click', '.delete-task', removeTaskHandler);
    $('#viewTasks').on('click', '.complete-task', completeTaskHandler);
}//end setupClickListeners

function getTasks(){
    console.log('In getTasks');
    //ajax call to server to get tasks
    $.ajax({
        type: 'GET',
        url: '/tasks'
    })
    .then( response => {
        console.log( response );
        renderTasks();
    })
    .catch( error => {
        console.log( 'Error in GET', error);
    })
}// end getTasks

function renderTasks(tasks){
    $('#viewTasks').empty();
    for (let i=0; i < tasks.length; i++) {
        let newRow = $(`
        <tr>
            <td>${tasks[i].name}</td>
            <td>
                <button type="button" class="complete-task" data-id="${tasks[i].id}">
                Complete
                </button>
            </td>
            <td>
                <button type="button" class="delete-task" data-id="${koalas[i].id}"
                Delete
                </button>
            </td>
        </tr>
        `)
        $('#viewTasks').append(newRow);
    }
}

function saveTasks(newTask){
    console.log('In saveTasks', newTask);
    //ajax call to server to get tasks
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask,
    })
    .then( response => {
        console.log('Response from server.', response);
        getTasks();
        //clear tasks
        $('#taskName').val('');
    })
    .catch( error => {
        console.log( 'Error', error);
    });
}//end saveTasks

function completeTaskHandler(){
    completeTask( $(this).data("id"));
}// end completeTaskHandler

function completeTask(taskId, isComplete){
    console.log('click');
    $.ajax({
        method: 'PUT',
        url: `/tasks/complete/${taskId}`,
        data: {
            boolean: isComplete
        }
    })
    .then( response => {
        getTasks();
    })
    .catch( error => {
        console.log(`Error on task mark complete. ${error}`);
    })
}

function removeTaskHandler(){
    removeTask( $(this).data("id"))
}//end removeTaskHandler

function removeTask(taskId){
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
    })
    .then( response => {
        console.log( 'Removed task woot woot!');
        getTasks();
    })
    .catch( error => {
        alert(`Error removing task.`, error);
    })
}