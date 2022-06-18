const express= require('express');
const app = express();
const bodyParser = require('body-parser')
const { createDBConn } = require('./config/db')
const {getId} = require('./general/general')
const{registerUser, loginUser} = require('./controller/userController')
const taskRouter = require('./routes/taskRoutes')
const jwt = require('jsonwebtoken')
require(`dotenv`).config()

createDBConn();

app.use(bodyParser.json({}))

app.use('/tasks',async function(req,res,next){
    authToken = req.headers.authtoken
    try{
        let userId = await jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET)
        req.userId = userId
        next()
    }catch(e){
        console.log(e)
        res.status(403).send({status:"ok", data:{message:"Unauthorized"}})
    }
})

app.use('/tasks',taskRouter)

app.get('/', function(req,res){
    res.status(200).send({status: "ok", message:"wrong path"})
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

    const user = loginObj.userId

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    ok = await loginUser(loginObj)
    if (ok){
        res.status(200).send({status:"ok", data:{message: "user logged in successfully" ,token:accessToken}})
    }
    else res.status(404).send({status:"ok", data:{message:"invalid credentials"}})

})
 


app.listen(3000, ()=>{
    console.log("connection open on 3000")
})