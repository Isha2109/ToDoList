var express = require('express');
var router = express.Router();

const {getId} = require('../general/general')
const {addTask, getAllTasks, deleteTask, getTask, updateTask} = require('../controller/controller')

// Home page route.
router.put('/updateTask', async function(req, res){
    let updObj= {
        taskTitle: req.body.taskTitle,
        taskMessage: req.body.taskMessage,
        taskId: req.query.taskId,
        taskStatus: req.body.taskStatus,
        userId: req.userId
    }
    ok = await updateTask(updObj)
    if (ok) res.status(200).send({status:"ok", data: {message: "Updation Successful"}})
    else res.status(404).send({status:"ok", data: {message: "Updation Unsuccessful"}})
})

router.post('/addTask',async function(req,res){
    let taskObj={
        taskTitle: req.body.taskTitle,
        taskMessage: req.body.taskMessage,
        taskId: getId(),
        createDate: new Date(),
        taskStatus: "pending",
        userId: req.userId
    }
    ok = await addTask(taskObj)

    if(ok) res.status(200).send({status:"ok", data:{message:"task added successfully"}})
    else res.status(404).send({status:"ok", data:{message:"task addition failed"}})

})

router.get('/viewTask', async function(req, res){
    userId = req.userId
    taskList = await getAllTasks(userId)
    res.status(200).send({status:"ok", data:{taskList: taskList }})
})

router.put('/deleteTask', async function(req, res){
        var delObj ={
           userId : req.userId,
           taskId: req.query.taskId 
        }
        let ok = await deleteTask(delObj)
        if (ok) res.status(200).send({status:"ok", data:{message:ok}})
        else res.status(404).send({status:"ok", data:{message:"task deletion failed"}})
})

router.get('/viewTaskById', async function(req, res){
        taskId = req.query.taskId
        userId = req.userId    
        taskById = await getTask(userId, taskId) 
        res.status(200).send({status:"ok", data:{taskById: taskById}})
})

module.exports = router;