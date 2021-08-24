import { Avatar } from '@material-ui/core';
import { SettingsEthernetRounded } from '@material-ui/icons';
import React, {useEffect, useState} from 'react';
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from 'react-router-dom';


function SidebarChat(props) {
    const [seed, setSeed] = useState("");
    const [messages, setmessages] = useState("");
    useEffect(()=>{
            setSeed(Math.floor(Math.random() * 5000));
            if(props.id){
                db.collection('rooms')
                        .doc(props.id)
                        .collection('messages')
                        .orderBy('timestamp', 'desc')
                        .onSnapshot((snapshot) => {
                            setmessages(snapshot.docs.map(doc => 
                                doc.data()))
                        });
            }
        }, [props.id]);
        
    let btn_exists = false;

    const createChat = ()=>{
        const roomName = prompt("Room Name? ");

        if(roomName){
            db.collection("rooms").add({
                name: roomName,
            });
        }
    }
    return !props.addNewChat || btn_exists ? (
        <Link to={`/rooms/${props.id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{props.name}</h2>
                    <p>{messages[0]?.messages}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat addNewChat">
            <h2>Add New Chat</h2>{btn_exists = true}
        </div>
    )
}

export default SidebarChat
