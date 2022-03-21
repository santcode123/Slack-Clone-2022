const express=require('express')
const cors=require('cors')
const app=express()
const bp = require('body-parser')
// const generateUniqueId = require('generate-unique-id');

const fs= require('fs')
const usersDb=require('./database/users.json')
const channelsDb=require('./database/channels.json')

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



app.get('/users',(req,res)=>{
    
      res.json({
        name:'santcode'
      })
  })

app.get('/user/:userId',(req,res)=>{
  const userId=req.params.userId;
  res.json(usersDb.users[userId])
})

app.get('/user/channels/:userId',(req,res)=>{
  const userId=req.params.userId;
  res.json({"channels":usersDb.users[userId].channels})
})
app.get('/channel/:channelId',(req,res)=>{
const channelId=req.params.channelId;
 console.log(channelId)
res.json(channelsDb.channels[channelId]);
})

app.post('/addUser',(req,res)=>{
 const newUser=req.body;
 const id=newUser.userName+"-"+newUser.password;

 const isExists=usersDb.users[id];

 if(isExists)
 {
   res.send('exists')
 }
 else{
 usersDb.users[id]=newUser;
 res.send('success')
 }
})
app.post('/create/channel/:channelId',(req,res)=>{
  const channelId=req.params.channelId;
  const {channelName,userId}=req.body;
  const newChannel={
    channelName,
    messageStream:[],
    members:[]
  }
  usersDb.users[userId].channels.push(channelId);
  channelsDb.channels[channelId]=newChannel;
  res.json({usersDb,channelsDb})
  // res.send('success')
})


  const PORT= 4000
  app.listen(PORT,()=>{
    
      console.log(`Server listening at port ${PORT}`)
  })