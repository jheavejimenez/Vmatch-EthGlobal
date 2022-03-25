import { useMoralis } from 'react-moralis'

export const sendNotification = async (toUserId:string,action:string,actionid:string,message:string,user:any,Moralis:any) =>{

  const Notification = Moralis.Object.extend("Notification");
  const note =  new Notification();
  const User = Moralis.Object.extend("_User");
  const _toUser = new User();
  _toUser.set("objectId",toUserId);

  note.set("from",user);
  note.set("to",_toUser);
  note.set("action",action);
  note.set("message",message);
  note.set("actionid",actionid);
  note.save();

}