const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require("path")

app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))

app.listen(port, () => console.log('Exempel app listening on port ${port}!'));


app.use(express.static('public'))

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

app.get('/getTask', function (req, res) {
    res.send({newTaskTodo});
})

app.put('/updateTask', function (req, res) {
    res.send('performing a PUT request at /user')
})

app.delete('/deleteTask', function (req, res) {
    console.log("du raderar nu detta obejekt");
    for(var i = 0; i < newTaskTodo.length; i++){
        newTaskTodo.splice(i,1);
    }
    res.send({newTaskTodo});
    console.log(newTaskTodo);
})

