
function getTask(){
    const url = 'http://localhost:3000/getTask';
    (async () => {
        const response = await fetch(url, {});
        const responseData = await response.json();
        console.log(responseData);
        renderTask(responseData);
    })()
}

 function renderTask(responseData){
     var myTaskList = document.getElementById("taskList");
     var finishContainer = document.getElementById("finished")
     myTaskList.innerHTML = "";

     finishContainer.innerHTML= "";
     for (var i = 0; i < responseData.newTaskTodo.length; i++) {
         myTaskList.innerHTML += "<li>" + "<input type='radio' onchange='updateTask()' id='" + responseData.newTaskTodo[i].id + "' name='check' value='" + responseData.newTaskTodo[i].uppgift + "'>" + responseData.newTaskTodo[i].uppgift + "</li>" + "<br><br>"
     }
     for (var i = 0; i < responseData.completeTask.length; i++) {
        finishContainer.innerHTML += "<li>" + responseData.completeTask[i].uppgift + "</li>" + "<br><br>"
     }

   


 }

function sendForm(event){
    event.preventDefault();
    const url = 'http://localhost:3000/addTask';
    var postTask = document.getElementById("newTask").value;
    (async () => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
           body: JSON.stringify({postTaskValue: postTask})
        });
        const json = await response.json();
        getTask ();
    })()

}

function deleteTask(){
    var ele = document.getElementsByName('check');      
    for(var i = 0; i < ele.length; i++) { 
        if(ele[i].checked){
            var uppgift = ele[i].value;
            document.getElementById("result").innerHTML = "Borttagen: "+ele[i].value;
             
        } 
    }
    deleteTaskApi(uppgift);

}

function deleteTaskApi(uppgift){
    const url = 'http://localhost:3000/deleteTask';
    (async () => {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
           body: JSON.stringify({postTaskValue: uppgift})
        });
        getTask();
    })()

}

function updateTask(){
    var ele = document.getElementsByName('check');      
    for(var i = 0; i < ele.length; i++) { 
        if(ele[i].checked){
            var uppgift = ele[i].value;
            document.getElementById("result").innerHTML = "<br><input type='text' id='updateTaskValue' name='check' value='" + uppgift + "'><button onclick='updateThisTask()' type='submit'>Uppdatera</button>"; 
            
        } 
    }
    
}

function updateThisTask(){
    updateTaskApi();
    
}


function updateTaskApi(){
    const url = 'http://localhost:3000/updateTask';
    var updateTask = document.getElementById("updateTaskValue").value;
    var getTaskId = document.getElementsByName("check");

    for( var i = 0; i < getTaskId.length; i++){
        if(getTaskId[i].checked){
            var id = getTaskId[i].id;
        }
    }
    (async () => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
           body: JSON.stringify({postTaskValue: updateTask, id: id})
        });
        getTask();
        document.getElementById("result").innerHTML = "";
    })()

}

function finishedTask(){
   var ele = document.getElementsByName('check');
   var containerFinished = document.getElementById("finished");
   containerFinished.innerHTML = "";
   for(var i = 0; i < ele.length; i++){
       if(ele[i].checked){
           var taskName = ele[i].value;
           var taskId = ele[i].id;
       }
   }
   const urlUpdate = 'http://localhost:3000/addTaskFinished';
   (async () => {
        const response = await fetch(urlUpdate, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({postTaskValue: taskName, id: taskId})
            });
            const json = await response.json();
            getTask();
            deleteTask();

    })()

}


