import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import db from './firebase'
import { useEffect } from 'react'
import { useStateValue } from './StateProvider'
import firebase from 'firebase'

export default function Chat(props) {
    const [input, setinput] = useState("");
    const [messages, setmessages] = useState([]);
    const {roomId} = useParams();
    const [roomName, setroomName] = useState("");
    const [{user}, dispatch] = useStateValue();
    let src = `https://avatars.dicebear.com/api/human/${Math.round(Math.random()*5000)}.svg`;

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setroomName(snapshot.data().name)
            ));
            
            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                setmessages(snapshot.docs.map(doc => doc.data()))
                
            });
        }
    }, [roomId])

    let chats = []
    messages.map(c => {
        c.name===user.displayName ?
        chats.push(<ChatMessage name={"You"} message={c.messages} timestamp={c.timestamp} chatReceiver />) :
        chats.push(<ChatMessage name={c.name} message={c.messages} timestamp={c.timestamp}/>);
    })
    
    const sendMessage = (e)=>{
        e.preventDefault();
        console.log(input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            messages: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setinput("");
    }
    
    return (
        <div className="chat">
            <ChatHeader name={roomName} src={src} timestamp={new Date(messages.lastItem?.timestamp).toLocaleTimeString()}/>

            <div class="chat__body">
                {chats}
            </div>
          
            <ChatFooter onSubmit={sendMessage} input={input} setinput={(e)=>{
                setinput(e);
            }} />
        </div>
    )
}

function ChatHeader(props){

    return(
        <div className="chat__header">
                <Avatar src={props.src} />
                <div className="chat__headerLeft">
                    <h2>{props.name}</h2>
                    <p>Last seen at {props.timestamp?props.timestamp:""}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
    )
}

function ChatBody(props){
    return (
        <div class="chat__body">
            {props.chats}
        </div>
    )
}

function ChatMessage(props){
    const text_colors = ["#42d09d","#e544a4","#78cff0"]
    const classes = props.chatReceiver ? "chat__message chat__receiver" : "chat__message";
    let dateD = new Date(props.timestamp?.toDate());
    let dateDisplay = ""+dateD.getDate()+
        "-"+
        dateD.getMonth()+" "+
        dateD.getHours()+
        ":"+dateD.getMinutes();
    return (
        <div className="">
            
            <p className={classes}>
            <span className="chat__message__chatname" 
                style={{color:text_colors[0]}}>
                    {props.name}
            </span>
                {props.message}
            <span className="chat__message__timestamp">{dateDisplay}</span></p>
        </div>
    )
}


function ChatFooter(props){

    return(
        <div className="chat__footer">
            <IconButton>
                <InsertEmoticon/>
            </IconButton>
            <form onSubmit={(e)=>props.onSubmit(e)}>
                <input type="text" placeholder="Type a message" 
                value={props.input} onChange={(e)=>{
                    props.setinput(e.target.value);                    
                }}
                 />
                <button>Send a Message</button>
            </form>
            <IconButton>
                <MicIcon/>
            </IconButton>
        </div>
    )
}