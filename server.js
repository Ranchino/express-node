app.get('/api/todo', function(req, res, next){
    res.json({
        message: "Cool man"
    })
    next()
})