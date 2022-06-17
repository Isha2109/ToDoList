const express= require('express');
const app = express();
const bodyParser = require('body-parser')
const { createDBConn } = require('./config/db')
const {getId} = require('./general/general')
const {addTask, getAllTasks, deleteTask, getTask, updateTask} = require('./controller/controller')


app.use(bodyParser.json({}))
createDBConn();

app.get('/', function(req,res){
    res.status(200).send({status: "ok", message:"wrong path"})
})

app.post('/addTask',async function(req,res){
    let taskObj={
        taskTitle: req.body.taskTitle,
        taskMessage: req.body.taskMessage,
        taskId: getId(),
        createDate: new Date(),
        taskStatus: "pending"
    }

    ok = await addTask(taskObj)

    if(ok) res.status(200).send({status:"ok", data:{message:"task added successfully"}})
    else res.status(404).send({status:"ok", data:{message:"task addition failed"}})

})

app.get('/viewTask', async function(req, res){
    taskList = await getAllTasks() 
    res.status(200).send({status:"ok", data:{taskList: taskList }})
})

app.put('/deleteTask', async function(req, res){

    
        var taskId= req.body.taskId
        let ok = await deleteTask(taskId)
        console.log(ok)
        if (ok) res.status(200).send({status:"ok", data:{message:ok}})
        else res.status(404).send({status:"ok", data:{message:"task deletion failed"}})
})

app.get('/viewTaskById', async function(req, res){
        taskId = req.query.id        
        taskById = await getTask(taskId)
        res.status(200).send({status:"ok", data:{taskById: taskById}})
})

app.put('/updateTask', async function(req, res){
    let updObj= {
        taskTitle: req.body.taskTitle,
        taskMessage: req.body.taskMessage,
        taskId: req.body.taskId,
        taskStatus: req.body.taskStatus
    }
    ok = await updateTask(updObj)
    if (ok) res.status(200).send({status:"ok", data: {message: "Updation Successful"}})
    else res.status(404).send({status:"ok", data: {message: "Updation Unsuccessful"}})
})


app.listen(3000, ()=>{
    console.log("connection open on 3000")
})