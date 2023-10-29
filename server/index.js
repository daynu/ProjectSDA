const express = require('express')

const app = express()

app.get('/api', function(req, res, next)
{
    res.json({"users": ["Coliban", 'Moraru']})
})

app.listen(5000)