//import express
const express = require('express')

//import swagge
const {
    specs,
    swaggerUi
} = require('./swagger');

//import CORS
const cors = require('cors')

//import bodyParser
const bodyParser = require('body-parser')

//init app
const app = express()

//use cors
app.use(cors())

//use body parser
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//define port
const port = 3000;

//import router
const router = require('./routes')
//route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//use router
app.use('/api/v1', router)

//start server
app.listen(port, () => {
    console.log(`Server started on 127.0.0.1:${port}`);
})