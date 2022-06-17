const express= require('express');
const app = express();
const bodyParser = require('body-parser')
const { createDBConn } = require('./config/db')
const {getId} = require('./general/general')
const {addTask, getAllTasks, deleteTask, getTask, updateTask} = require('./controller/controller')
const{registerUser, loginUser} = require('./controller/userController')


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
        taskStatus: "pending",
        userId: req.body.userId
    }
   // console.log(taskObj)
    ok = await addTask(taskObj)
    //console.log(ok)

    if(ok) res.status(200).send({status:"ok", data:{message:"task added successfully"}})
    else res.status(404).send({status:"ok", data:{message:"task addition failed"}})

})

app.get('/viewTask', async function(req, res){
    userId = req.query.userId
    taskList = await getAllTasks(userId) 
    res.status(200).send({status:"ok", data:{taskList: taskList }})
})

app.put('/deleteTask', async function(req, res){
        var delObj ={
           userId : req.query.userId,
           taskId: req.query.taskId 
        }
        let ok = await deleteTask(delObj)
        console.log(ok)
        if (ok) res.status(200).send({status:"ok", data:{message:ok}})
        else res.status(404).send({status:"ok", data:{message:"task deletion failed"}})
})

app.get('/viewTaskById', async function(req, res){
        taskId = req.query.taskId
        userId = req.query.userId    
        taskById = await getTask(taskId)
        res.status(200).send({status:"ok", data:{taskById: taskById}})
})

app.post('/signup', async function(req, res){
    let userObj= {
        email: req.body.emailId,
        password: req.body.password,
        userId: getId(),
        }
    
        ok = await registerUser(userObj)
        console.log(ok)
        if (ok) res.status(200).send({status:ok , data:{message:"user registered successfully", userId: userObj.userId, password: userObj.password}})
        else res.status(404).send({status:ok, message:"user not registered"})
})

app.post('/login', async(req, res)=>
{
    let loginObj= {
        userId: req.body.userId,
        password: req.body.password,
    }

    ok = await loginUser(loginObj)

    if (ok) res.status(200).send({status:"ok", data:{message: "user logged in successfully"}})
    else res.status(404).send({status:"ok", data:{message:"user does not exist, please signup first"}})

})

app.post('/logoff', async(req, res)=>{
    let logoffObj= {
        logoff: new Date()
    }
    ok = await addLoggoffTime(logoffObj)
    if(ok) res.status(200).send({status:ok, data:{message:"hello, logout successful", lastLogoff: logoffObj.logoff}})
    else res.status(404).send({status:ok, data:{message:"user signout failed"}})
})

app.put('/updateTask', async function(req, res){
    let updObj= {
        taskTitle: req.body.taskTitle,
        taskMessage: req.body.taskMessage,
        taskId: req.query.taskId,
        taskStatus: req.body.taskStatus,
        userId: req.query.userId
    }
    ok = await updateTask(updObj)
    if (ok) res.status(200).send({status:"ok", data: {message: "Updation Successful"}})
    else res.status(404).send({status:"ok", data: {message: "Updation Unsuccessful"}})
})


app.listen(3000, ()=>{
    console.log("connection open on 3000")
})