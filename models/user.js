const mongoose=require('mongoose')

var Schema = mongoose.Schema

var todoUserSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('todoListUser', todoUserSchema)