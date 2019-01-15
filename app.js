const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const port =  process.env.PORT || 3000

//routes to api
app.use('/interfaces', require('./routes/bankAccounts'))

//if the route isn't found
app.use((req, res, next) => next({status: 404, message: 'Route not found.'}))

//the error handler just in case
app.use((err, req, res, next) => {
    const errorMessage = {}

    if(process.env.NODE_ENV !== 'production' && err.stack)
        errorMessage.stack = err.stack

    errorMessage.status = err.status || 500
    errorMessage.message = err.message ||'Internal Server Error'

    res.status(errorMessage.status).send(errorMessage.message)
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
module.exports = app