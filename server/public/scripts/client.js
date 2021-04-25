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
            task: $('#taskName').val(),
        };
        //call saveTask with new object
        saveTasks(taskToAdd);
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
        renderTasks(response);
    })
    .catch( error => {
        console.log( 'Error in GET', error);
    })
}// end getTasks

function renderTasks(task){
    $('#viewTasks').empty();
    for (let i=0; i < task.length; i++) {
        if(task[i].complete == false){
        $('#viewTasks').append(`
        <tr>
            <td>${task[i].task}</td>
            <td>${task[i].complete}</td>
            <td>
                <button type="button" class="complete-task" data-id="${task[i].id}">
                Complete
                </button>
            </td>
            <td>
                <button type="button" class="delete-task" data-id="${task[i].id}">
                Delete
                </button>
            </td>
        </tr>
        `);
        } else{
            $('#viewTasks').append(`
        <tr class="complete-task" id="red">
            <td>${task[i].task}</td>
            <td>${task[i].complete}</td>
            <td><button type="button" class="complete-task" data-id="${task[i].id}">
            Complete
            </button>
            </td>
            <td>
                <button type="button" class="delete-task" data-id="${task[i].id}">
                Delete
                </button>
            </td>
        </tr>
        `);
        }
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
    })
    .catch( error => {
        console.log( 'Error', error);
    });
     //clear tasks
    $('#taskName').val('');
}//end saveTasks

function completeTaskHandler(){
    completeTask( $(this).data("id"));
}// end completeTaskHandler

function completeTask(taskId){
    console.log('click');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: taskId
    })
    .then( response => {
        getTasks();
    })
    .catch( error => {
        console.log(`Error on task mark complete. ${error}`);
    });
}

function removeTaskHandler(){
    removeTask( $(this).data("id"))
}//end removeTaskHandler

function removeTask(taskId){
    console.log('Am I deleted?');
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
    });
}