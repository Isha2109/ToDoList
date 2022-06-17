const taskSchema= require('../models/model')

 async function addTask(taskObj){
     task = new taskSchema(taskObj)
     console.log(task)
    try{
        createTask = await task.save()
       // console.log(createTask)
        return createTask
    }
    catch(e){
        console.log(e)
        return false
    }
 }

 async function getAllTasks(userId){
    console.log(userId)
    try{
        taskList =await taskSchema.find({userId: userId, deletionStatus: false})
        return taskList
    }
    catch(e){
        console.log(e)
        return false
    }
 }

 async function getTask(taskId){
    try{
        task = await taskSchema.findOne({userId: userId, taskId: taskId, deletionStatus: false})
        return task
    }
    catch(e){
        console.log(e)
        return false
    }
 }

 async function deleteTask(delObj){
    try{
        data = await taskSchema.updateOne({userId: delObj.userId, taskId: delObj.taskId},{$set: {deletionStatus: true}})
        if (data.deletedCount == 0) return "taskId not found"
        else return "task id successfully deleted"
    }
    catch(e){
        console.log(e)
        return "taskId deletion failed"
    }
 }

 async function updateTask(updObj){
    try{
        let dbResponse
        let titleFlag = false
        let messageFlag = false
        let statusFlag = false
        let titleUpdationFlag = false
        let messageUpdationFlag = false
        let statusUpdationFlag = false

        if (updObj.taskTitle) {
            titleUpdationFlag = true
            dbResponse = await taskSchema.updateOne({taskId: updObj.taskId, userId: updObj.userId},{$set:{taskTitle: updObj.taskTitle}})
            if (dbResponse.modifiedCount > 0) titleFlag = true
        } if (updObj.taskMessage) {
            messageUpdationFlag = true
            dbResponse = await taskSchema.updateOne({taskId: updObj.taskId, userId: updObj.userId},{$set:{taskMessage: updObj.taskMessage}})
            if (dbResponse.modifiedCount > 0 ) messageFlag = true 
        } if (updObj.taskStatus){
            statusUpdationFlag = true
            dbResponse = await taskSchema.updateOne({taskId: updObj.taskId, userId: updObj.userId},{$set:{taskStatus: updObj.taskStatus}})
            if (dbResponse.modifiedCount > 0 ) statusFlag = true 
        }
        return (titleFlag && titleUpdationFlag) || ( messageFlag && messageUpdationFlag) || ( statusFlag && statusUpdationFlag)
    }
    catch(e){
        console.log(e)
        return false
    }
 }

 module.exports={
    addTask,
    getAllTasks,
    deleteTask,
    getTask,
    updateTask
 }