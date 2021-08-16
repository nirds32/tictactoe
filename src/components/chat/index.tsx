import socketService from "../../services/socketService";
import { useState,useEffect } from "react";
import ChatService, { IMessages } from "../../services/chatService";
import styled from "styled-components";

//Styles
const RowContainer = styled.div`
  width: 100%;
  display: flex;
`;
const SetBottom = styled.div`
    position: absolute;
    bottom: 70px;
`;
const ChatPadding = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
`;

const Messages = () => {
    console.log(socketService.socket)
    const [messagesArray, setMessagesArray] = useState(new Array<IMessages>());
    const [input, setInput] = useState("");
    const socketRef=socketService.socket;

    useEffect(() => {
        if(socketRef!=null) 
            ChatService.OnsendMessage(socketRef, (message) => setMessagesArray([...messagesArray, message]));;
        });
    
      const sendMessage = () => {
          let username = localStorage.getItem('registeredKey') || '';
          
            if(socketService.socket){
                ChatService.sendMessage(socketService.socket, {message: input, username: username, date: new Date()})
            }
            else{
                console.log("socket not connected");              
            }      
         }

    return (
        <div> 
            <ChatPadding>
                {messagesArray.map((item, index) => <div key = {index}>{item.username}: {item.message}<div>{item.date.toDateString}</div></div>)}
            </ChatPadding>
                
            <SetBottom>
                <input type="text" value={input} onChange={(e)=> setInput(e.target.value)} />
                <button onClick={sendMessage}>SEND</button>
            </SetBottom>        
        </div>    
    )
}

export default Messages;