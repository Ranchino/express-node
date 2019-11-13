
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
    const url = 'http://localhost:3000/deleteTask';
    var postTask = document.getElementById("newTask").value;
    (async () => {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
           body: JSON.stringify({postTaskValue: postTask})
        });
        deleteTaskTodo();
    })()

}

function deleteTaskTodo(){
    var ele = document.getElementsByName('check');      
    for(var i = 0; i < ele.length; i++) { 
        if(ele[i].checked){
            document.getElementById("result").innerHTML = "Borttagen: "+ele[i].value; 
        } 
    }
    getTask();

}


