import React from 'react';
import './Sidebar.css';
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useState, useEffect } from 'react';

function Sidebar(props){
    const [rooms, setrooms] = useState([])
    const [search_query, setsearch_query] = useState("");

    useEffect(() => {
        
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot)=>{
            setrooms(
                snapshot.docs.map((doc)=>({
                   id: doc.id,
                   data: doc.data(), 
                }))
            )
        });
        return ()=>{
            unsubscribe();
        }
        
    }, [])

    return(
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={props.user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" onChange={e=>setsearch_query(e.target.value)} />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    room.data.name?.toLowerCase().includes(search_query?.toLowerCase()) ? <SidebarChat key={room.id} id={room.id} name={room.data.name} /> : ""
                ))}
           
            </div>

        </div>
    )
}

export default Sidebar;