
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
         myTaskList.innerHTML += "<li>" + responseData[i].uppgift + "</li>" + "<br><br>"
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
