const express=require('express')
const cors=require('cors')
const app=express()
const bp = require('body-parser')
// const generateUniqueId = require('generate-unique-id');

const fs= require('fs')
const usersDb=require('./database/users.json')
const channelsDb=require('./database/channels.json')
const directMessagesDb=require('./database/directMessage.json')

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))





app.post('/getUser/withLoginInfo',(req,res)=>{
  const {userName,password}=req.body;
  const userId=userName+'-'+password;
  if(!usersDb.users[userId])
  {
    res.json({status:'user does not exist'})
  }
  const {firstName,lastName}=usersDb.users[userId]
  const displayName=firstName+' '+lastName;
  res.json({status:'success',userId,displayName})
})

app.post('/addUser',(req,res)=>{
  const {firstName,lastName,userName,password}=req.body;
  const newUser={firstName,lastName,userName,password,channels:[],directUsers:[]}
  const userId=userName+"-"+password;
 
  const isExists=usersDb.users[userId];
 
  if(isExists)
  {
    res.json({status:'exists'})
  }
  else{
   const fullName=firstName+' '+lastName;
  usersDb.users[userId]=newUser;
  res.json({status:'success',userId,displayName:fullName})
  }
 })

app.get('/allDatabase/:userId',(req,res)=>{
  const userId=req.params.userId;

  function getDatabase(){
    const allChannels=channelsDb.channels;
    const allUsers=usersDb.users;
    const allDirectMessages=directMessagesDb.directMessages;
    const channelsId=usersDb.users[userId].channels;
    const directUsersId=usersDb.users[userId].directUsers;
    return {
      allChannels,
      allUsers,
      allDirectMessages,
      channelsId,
      directUsersId
    }
  }
 const timeoutId=setTimeout(()=>{
   const data=getDatabase()
   res.json(data)
   clearTimeout(timeoutId);
 },1000)
})

app.post('/remove/channel/:userId',(req,res)=>{
  const userId=req.params.userId;
  const {channelId}=req.body;
  usersDb.users[userId].channels=usersDb.users[userId].channels.filter(id=>id!==channelId)
  channelsDb.channels[channelId].members= channelsDb.channels[channelId].members.filter(id=>id!==userId);
  res.send('channel removed successfully');
})

app.post('/add/user/toChannel',(req,res)=>{
  const {channelId,userId}=req.body;
  usersDb.users[userId].channels.push(channelId);
  channelsDb.channels[channelId].members.push(userId);
  res.send('successfully added')
})

app.post('/remove/user/fromChannel',(req,res)=>{
  const {channelId,userId}=req.body;
  const filteredChannels= usersDb.users[userId].channels.filter(id=>id!==channelId);
  const filteredMembers=channelsDb.channels[channelId].members.filter(id=>id!==userId);
  usersDb.users[userId].channels=filteredChannels;
  channelsDb.channels[channelId].members=filteredMembers;
  res.send(' successfully removed')
})

app.post('/remove/directUser/:loggedUserId',(req,res)=>{
  const loggedUserId=req.params.loggedUserId;
  const {directUserId}=req.body;
  usersDb.users[loggedUserId].directUsers=usersDb.users[loggedUserId].directUsers.filter(id=>id!==directUserId);
  res.send('directUser removed successfully');
})

app.post('/send/message/channel/:channelId',(req,res)=>{
  const channelId=req.params.channelId;
  const {message,userId}=req.body;
  const fullName=usersDb.users[userId].firstName+' '+usersDb.users[userId].lastName
  channelsDb.channels[channelId].messageStream.unshift({sender:fullName,time:new Date(),message});
  res.send('message sent successfully');
})

app.post('/create/channel/:channelId',(req,res)=>{
  const channelId=req.params.channelId;
  const {channelName,userId}=req.body;
  
  const newChannel={
    channelName,
    messageStream:[],
    members:[userId]
  }
  usersDb.users[userId].channels.push(channelId);
  channelsDb.channels[channelId]=newChannel;
  res.json({usersDb,channelsDb})
})


// TILL NOW......

app.get('/user/channels/:userId',(req,res)=>{
  const userId=req.params.userId;
   
 function getAllChannels(userId)
 {
   const channelsId=usersDb.users[userId].channels;
  return channelsId.map(id=>({id,...channelsDb.channels[id]}))
 }
   let timeoutId=setTimeout(()=>{
    const data= {"channels":getAllChannels(userId)};
    clearTimeout(timeoutId);
    res.json(data);  
  },4000);
})





app.get('/channel/:channelId',(req,res)=>{
const channelId=req.params.channelId;
res.json(channelsDb.channels[channelId]);
})









app.post('/send/message/directUser/:loggedUserId',(req,res)=>{
  const loggedUserId=req.params.loggedUserId;
  const {directUserId,message}=req.body;
  const directMessageId_1=`${loggedUserId}-to-${directUserId}`;
  const directMessageId_2=`${directUserId}-to-${loggedUserId}`;
  const directMessageId=directMessagesDb.directMessages[directMessageId_1] ? directMessageId_1:directMessageId_2;
  const isDirectUser=usersDb.users[directUserId].directUsers.includes(loggedUserId);
  if(!isDirectUser)
  {
    usersDb.users[directUserId].directUsers.push(loggedUserId);
  }
  const fullName=usersDb.users[loggedUserId].firstName+' '+usersDb.users[loggedUserId].lastName
  directMessagesDb.directMessages[directMessageId].messages.unshift({sender:fullName,message,time:new Date()})
  res.send('message sent successfully')
})


app.post('/add/directUser/:loggedUserId',(req,res)=>{
  const loggedUserId=req.params.loggedUserId;
  const {directUserId}=req.body;
  usersDb.users[loggedUserId].directUsers.push(directUserId);
  // if(directUserId!==loggedUserId) usersDb.users[directUserId].directUsers.push(loggedUserId);
  const directMessageId_1=`${loggedUserId}-to-${directUserId}`;
  const directMessageId_2=`${directUserId}-to-${loggedUserId}`
  if(!directMessagesDb.directMessages[directMessageId_1] && !directMessagesDb.directMessages[directMessageId_2])
  {
    directMessagesDb.directMessages[directMessageId_1]={messages:[]};
  }
  res.send('direct User added');
})

// app.post('/remove/directUser/:loggedUserId',(req,res)=>{
//   const loggedUserId=req.params.loggedUserId;
//   const {directUserId}=req.body;

//   usersDb.users[loggedUserId].directUsers=usersDb.users[loggedUserId].directUsers.filter(userId=>userId!==directUserId);
//   if(directUserId!==loggedUserId)
//   {
//     usersDb.users[directUserId].directUsers=usersDb.users[directUserId].directUsers.filter(userId=>userId!==loggedUserId)
//   }
//   res.send('direct user removed');
// })



  const PORT= 4000
  app.listen(PORT,()=>{
    
      console.log(`Server listening at port ${PORT}`)
  })