import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat';
import './Chat.css';
import { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {
  let [{user}, dispatch] = useStateValue();
  // if(localStorage.getItem("user")){
  //   let user_pre = JSON.parse(localStorage.getItem("user"));
  //   if(alert("User "+user_pre.providerData[0].displayName+" already LoggedIn in this system, do you want to still continue?")){
  //     user = user_pre;
  //   }
  // }else{
  //   localStorage.setItem("user", JSON.stringify(user));
  // }
  
  return (
    <div>
    {user==null ? <Login/> : (
    <div className="app">
      <div className="app__body">
      <Router>
        <Sidebar user={user} />
        <Switch>
          <Route path="/rooms/:roomId">
            <Chat />
          </Route>
          <Route path="/">
            <Chat />
          </Route>
        </Switch>
      </Router>
      </div>
      </div>
    )}
    </div>
);
}

export default App;
