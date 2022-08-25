const express = require('express')
const { pool } = require('./db')
const queries = require('./src/utils/dbQueries')
const userRoutes = require('./src/routes/userRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./src/utils/swagger-json.json')
const app = express()

const port = 3000
const url = '/api/v1'       // URL
app.use(express.json())

//Middlewares
  //Swagger Ui Interface
app.use('/swagger',swaggerUi.serve , swaggerUi.setup(swaggerJson))

//Handles User Routes
app.use(`${url}/users`,userRoutes)

//If user intereact with base path redirect to main path
app.get('/', (req, res) => {
    res.redirect(`${url}/users`)
    })

// Not found route 
app.get('*', (req, res) => {
    res.send("NOT FOUND")
})

// Starting the server when the pool of postgres data base is connected succesfully
pool.connect().then(res => {
    console.log("Database connected successfully")
    pool.query(queries.createTableIfNotExist,(err,result)=>{
        if(err) throw err
        console.log("Tables CREATED")
        app.listen(port, (req, res) => {
            console.log(`port listen at port = http://localhost:${port}/`)
        })
    })
   
}).catch(err => console.log(err + 'error'))

