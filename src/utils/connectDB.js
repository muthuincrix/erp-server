const mongoose = require('mongoose')

const connect = (uri) => {
    mongoose.connect(uri)
    .then(res => console.log('connect'))
     .catch(err => console.log(err))
}

module.exports = connect
