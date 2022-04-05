const express = require('express')
const cors = require('cors')
const app = express()
const bp = require('body-parser')
const generateUniqueId = require('generate-unique-id');

const fs = require('fs')
const usersDb = require('./database/users.json')
const channelsDb = require('./database/channels.json')
const directMessagesDb = require('./database/directMessage.json')
const helper = require('./helpers');

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.post('/getUser/withLoginInfo', (req, res) => {
  const { userName, password: loginPassword } = req.body;
  const userId = helper.userIdGenerator(userName)

  if (!usersDb.users[userId]) {
    res.json({ status: 'user does not exist' })
  }
  const { firstName, lastName, password } = usersDb.users[userId]
  if (password !== loginPassword) {
    res.json({ status: 'incorrect password' })
  }
  const displayName = helper.getDisplayName(firstName, lastName);
  res.json({ status: 'success', userId, displayName })
})

app.post('/addUser', (req, res) => {
  const { firstName, lastName, userName, password } = req.body;
  const userId = helper.userIdGenerator(userName);

  const isExists = usersDb.users[userId];

  if (isExists) {
    res.json({ status: 'exists' })
  }
  else {
    const newUser = { firstName, lastName, userName, password, channels: [], directMessages: [] }
    usersDb.users[userId] = newUser;
    const displayName = helper.getDisplayName(firstName, lastName)
    res.json({ status: 'success', userId, displayName })
  }
})

app.post('/userData/longPolling/:loggedUserId', (req, res) => {
  const loggedUserId = req.params.loggedUserId;
  const { type, selectedId } = req.body;

  const selectedInfo = helper.getSelectedIdInfo(loggedUserId,type, selectedId, directMessagesDb, channelsDb,usersDb)

  function getUserData() {
    const { channels, directMessages } = usersDb.users[loggedUserId];
    const channelsInfo = channels.map(channelId => ({ channelId, channelName: channelsDb.channels[channelId].channelName }));
    const directMessagesInfo = directMessages.map(dmId => ({ dmId, displayName: helper.getDMDisplayName(loggedUserId,directMessagesDb.directMessages[dmId].members,usersDb) }))
    return {
      channelsInfo,
      directMessagesInfo,
      selectedInfo
    }
  }
  const timeoutId = setTimeout(() => {
    const data = getUserData()
    res.json(data)
    clearTimeout(timeoutId);
  }, 500)
})


app.post('/create/directMessage', (req, res) => {
  const { loggedUserId, directUsersId } = req.body;
  // as of now we supporting only one to one conversation, in the case of multiple members directUserId will contain more then one element

  // check that all users exist in usersDb

  const directUsersIncluded = directUsersId.every(id => !!usersDb.users[id])

  if (!directUsersIncluded) res.json({ status: 'users does not exits', data: null })
if(directUsersIncluded)
{
  let directMessageId = helper.getDirectMessageId(loggedUserId, directUsersId, directMessagesDb);
  if (directMessageId) res.json({ status: 'success', data: directMessagesDb.directMessages[directMessageId] });

  directMessageId = generateUniqueId();
  usersDb.users[loggedUserId].directMessages.push(directMessageId);


  const newDirectMessageInfo = {
    directMessageId,
    messageStream: [],
    members: [...new Set([loggedUserId,...directUsersId])]
  }
  directMessagesDb.directMessages[directMessageId] = newDirectMessageInfo;

  res.json({ status: 'success', data:newDirectMessageInfo});
}

})

app.get('/get/allUsers',(req,res)=>{
  const allUsers=Object.keys(usersDb.users).map(userId=>({userId,displayName:
    helper.getDisplayName(usersDb.users[userId].firstName,usersDb.users[userId].lastName)}))
  res.json({allUsers});
})



app.post('/remove/channel/:loggedUserId', (req, res) => {
  const loggedUserId = req.params.loggedUserId;
  const { channelId } = req.body;
  usersDb.users[loggedUserId].channels = usersDb.users[loggedUserId].channels.filter(id => id !== channelId)
  channelsDb.channels[channelId].members = channelsDb.channels[channelId].members.filter(id => id !== loggedUserId);
  res.send('channel removed successfully');
})

app.post('/remove/directMessage/:loggedUserId', (req, res) => {
  const loggedUserId = req.params.loggedUserId;
  const { directMessageId } = req.body;
  usersDb.users[loggedUserId].directMessages = usersDb.users[loggedUserId].directMessages.filter(id => id !== directMessageId);
  res.send('directMessage removed successfully');
})

app.post('/remove/user/fromChannel', (req, res) => {
  const { channelId, userId } = req.body;
  const filteredChannels = usersDb.users[userId].channels.filter(id => id !== channelId);
  const filteredMembers = channelsDb.channels[channelId].members.filter(id => id !== userId);
  usersDb.users[userId].channels = filteredChannels;
  channelsDb.channels[channelId].members = filteredMembers;
  res.send('successfully removed')
})

app.post('/add/user/toChannel', (req, res) => {
  const { channelId, userId } = req.body;
  usersDb.users[userId].channels.push(channelId);
  channelsDb.channels[channelId].members.push(userId);
  res.send('successfully added')
})

app.post('/send/message/channel/:channelId', (req, res) => {
  const channelId = req.params.channelId;
  const { message, userId } = req.body;
  const {firstName,lastName}=usersDb.users[userId]
  const displayName = helper.getDisplayName(firstName,lastName)
  channelsDb.channels[channelId].messageStream.unshift({ sender: displayName, time: new Date(), message });
  res.send('message sent successfully');
})

app.post('/send/directMessage/:loggedUserId', (req, res) => {
  const loggedUserId = req.params.loggedUserId;
  const { directMessageId, message } = req.body;

  const members = directMessagesDb.directMessages[directMessageId].members;

  members.forEach(userId => {
    if (!usersDb.users[userId].directMessages.includes(directMessageId)) {
      usersDb.users[userId].directMessages.push(directMessageId)
    }
  })
 
  const {firstName,lastName}=usersDb.users[loggedUserId];

  const displayName =helper.getDisplayName(firstName,lastName)
 
  directMessagesDb.directMessages[directMessageId].messageStream.unshift({ sender: displayName, message, time: new Date() })
  res.send('message sent successfully')
})

app.post('/create/channel/:channelId', (req, res) => {
  const channelId = req.params.channelId;
  const { channelName, userId } = req.body;

  const newChannel = {
    channelName,
    messageStream: [],
    members: [userId]
  }
  usersDb.users[userId].channels.push(channelId);
  channelsDb.channels[channelId] = newChannel;
  res.send('channel created successfully')
})

const PORT = 4000
app.listen(PORT, () => {

  console.log(`Server listening at port ${PORT}`)
})