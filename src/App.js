import React, { useEffect } from "react";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    const [roomName, setRoomName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [isJoin, setIsJoin] = React.useState(false);

    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else {
            Notification.requestPermission();
        }
    });
    
    return (
        <React.Fragment>
            {isJoin ? (
                <ChatRoom roomId={roomName} userName={userName} />
            ) : (
                <Home
                    roomName={roomName}
                    setRoomName={setRoomName}
                    userName={userName}
                    setUserName={setUserName}
                    isJoin={isJoin}
                    setIsJoin={setIsJoin}
                />
            )}
        </React.Fragment>
    );
}

export default App;
