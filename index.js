const express = require('express');
const app = express();
const port = 3000;
const path = require("path")

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))

app.listen(port, () => console.log('Exempel app listening on port ${port}!'));


app.use(express.static('public'))




app.get('/todoApi', function (req, res) {
    res.json({
        message: 'thank you for checking out our api',
        count: nrOfVisitors
    })
})


app.post('/todoApi', function (req, res) {
    res.send('performing a POST request')
})

app.put('/todoApi', function (req, res) {
    res.send('performing a PUT request at /user')
})

app.delete('/todoApi', function (req, res) {
    res.send('performing a DELETE request at /user')
})

