const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require("path")
/* var fs = require("fs");*/

app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))

app.listen(port, () => console.log('Exempel app listening on port ${port}!'));


app.use(express.static('public'))

/* fs.writeFile("./test.json", JSON.stringify({test: "test"}));
fs.readFile("./test.json", (err, file) => {console.log(JSON.parse(file))}); */

var newTaskTodo = [
    {
        uppgift: 'Tvätta bilen',
        id: 0
    }
]

var completeTask = [
    {
        uppgift: 'Köpa mat',
        id: 1
    }
]

app.post('/addTask', function (req, res) {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
   console.log(req.body.postTaskValue);
   newTaskTodo.push(
        {
            uppgift: req.body.postTaskValue,
            id: uniqid 
        }
   )
   console.log(newTaskTodo);
   res.send({newTaskTodo});
})
app.post('/addTaskFinished', function (req, res) {
    completeTask.push(
        {
            uppgift: req.body.postTaskValue,
            id: req.body.id
        }
    )
    res.send({completeTask});
})

app.get('/getTask', function (req, res) {
    res.send({newTaskTodo, completeTask});
})

app.put('/updateTask', function (req, res) {
    for(var i = newTaskTodo.length -1; i>= 0; i--){
        if(req.body.id == newTaskTodo[i].id){
            newTaskTodo[i].uppgift = req.body.postTaskValue;
            
            console.log("du har nu uppdaterat detta obejekt till: " + newTaskTodo[i].uppgift);
        }
    }
    res.send({newTaskTodo});
})

app.delete('/deleteTask', function (req, res) {
    console.log("du raderar nu detta obejekt");
    for(var i = newTaskTodo.length -1; i>= 0; i--){
        if(req.body.postTaskValue == newTaskTodo[i].uppgift){
            newTaskTodo.splice(i,1);
        }
    }
    res.send({newTaskTodo});
    console.log(newTaskTodo);
})



