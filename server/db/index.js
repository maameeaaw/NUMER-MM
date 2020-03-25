const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://mm:021000@cluster0-q1hjw.azure.mongodb.net/NumerDB', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db