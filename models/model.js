const mongoose=require('mongoose')
const todoUserSchema = require('../models/user')

var Schema = mongoose.Schema

var taskSchema = new Schema({
    taskTitle:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    taskMessage:{
        type:String
    },
    taskId:{
        type:String,
        required: true,
        unique: true
    },
    taskStatus:{
        type:String,
        required: true
    },
    createDate:{
        type: Date,
        required: true
    },
    deletionStatus:{
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('task', taskSchema)