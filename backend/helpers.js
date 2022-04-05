function userIdGenerator(userName)
{
    // there can be other approach to generate the userID, here we are assuming that userName is unique among all the users
    return userName;
}

function getDisplayName(firstName,lastName)
{
    return firstName+' '+lastName;
}
function getSelectedIdInfo(loggedUserId,type,selectedId,directMessagesDb,channelsDb,usersDb)
{
    if(!selectedId) return ;
    if(type==='channel') 
    {
        return {
            selectedId,
            displayName:channelsDb.channels[selectedId].channelName,
            messageStream:channelsDb.channels[selectedId].messageStream,
            members:channelsDb.channels[selectedId].members,
        }

    }
    if(type==='directMessage') 
    {   
       
        return {
            selectedId,
            displayName:getDMDisplayName(loggedUserId,directMessagesDb.directMessages[selectedId].members,usersDb),
            messageStream:directMessagesDb.directMessages[selectedId].messageStream,
            members:directMessagesDb.directMessages[selectedId].members,
        }


    }

  
}

function getDirectMessageId(loggedUserId,directUsersId,directMessagesDb)
{

 return Object.keys(directMessagesDb.directMessages).find(id=>{
     return directUsersId.every(ele=>directMessagesDb.directMessages[id].members.includes(ele));
 })
}


function getDMDisplayName(loggedUserId,members,usersDb)
{   
  
    if(members.length===1 && members[0]===loggedUserId) 
    {return getDisplayName(usersDb.users[loggedUserId].firstName,usersDb.users[loggedUserId].lastName);
    }

    let displayName='';
    members.filter(id=>id!==loggedUserId).map((userId,index)=>{
        if(usersDb.users[userId])
        {
        const {firstName,lastName} =usersDb.users[userId];
       displayName+=getDisplayName(firstName,lastName);
       if(index>0)
       {
           displayName+=',';
       }
      }
    })
 return displayName;
}
module.exports={userIdGenerator,getDisplayName,getSelectedIdInfo,getDirectMessageId,getDMDisplayName}