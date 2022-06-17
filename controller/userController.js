const todoUserSchema = require('../models/user')

async function registerUser(userObj){
    
    request = new todoUserSchema(userObj)
    try{
        await request.save()
        console.log("successful registration")
        return true
    }
    catch(ex){
        console.log(ex)
        return false
    }
}

async function loginUser(loginObj){
    try{
        data = await todoUserSchema.findOne({ userId : loginObj.userId , password : loginObj.password})
        return data
    }
    catch(e){
        console.log("an error occured"+ e)
        return false
    }
}

module.exports={registerUser, loginUser}