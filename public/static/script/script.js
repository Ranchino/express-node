
function getTask(){
    const url = 'http://localhost:3000/getTask';
    (async () => {
        const response = await fetch(url, {});
        const responseData = await response.json();
        console.log(responseData);
        renderTask(responseData.newTaskTodo);
    })()
}
 function renderTask(responseData){
     var myTaskList = document.getElementById("taskList");
     myTaskList.innerHTML = ""
     for (var i = 0; i < responseData.length; i++) {
         myTaskList.innerHTML += "<li>" + "<input type='checkbox' name='check' value='" + responseData[i].uppgift + "'>" + responseData[i].uppgift + "</li>" + "<br><br>"
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
            document.getElementById("result").innerHTML = "<br><input type='text' id='updateTaskValue' name='check' value='" + uppgift + "'><button>Uppdatera</button>";  
        } 
    }
    updateTaskApi(uppgift);
}

function updateTaskApi(uppgift){
    const url = 'http://localhost:3000/updateTask';
    (async () => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
           body: JSON.stringify({postTaskValue: uppgift})
        });
        getTask();
    })()

}



