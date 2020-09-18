import React from "react";
import Header from "./Header";
import useChat from "./useChat";
import ChatBubble from "./ChatBubble";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Styles from "./ChatRoom.module.css";

const ChatRoom = (props) => {
    const { roomId, userName } = props;
    const { messages, sendMessage, clientNumber } = useChat(roomId);
    const [newMessage, setNewMessage] = React.useState("");

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage({ userName: userName, data: newMessage });
        setNewMessage("");
    };
    console.log("messages", messages);

    return (
        <div className={`card ${Styles["chatroom_container"]}`}>
            <div className={Styles["chat-room-container"]}>
                <Header roomId={roomId} onlineNumber={clientNumber} />
                <div className={`${Styles["messages-container"]} card-body`}>
                    <div className="messages-list">
                        {messages.map((message, i) => (
                            <div
                                key={i}
                                className={`message-item ${
                                    message.ownedByCurrentUser
                                        ? Styles["my-message"]
                                        : Styles["received-message"]
                                }`}
                            >
                                <ChatBubble isOwner={message.ownedByCurrentUser}>
                                    <span
                                        style={{
                                            fontSize: "20px",
                                            color: "white",
                                        }}
                                    >
                                        {message.ownedByCurrentUser
                                            ? message.body
                                            : `${message.userName} : ${message.body}`}
                                    </span>
                                </ChatBubble>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="d-flex card-footer align-items-center"
                    style={{
                        bottom: "0px",
                        position: "absolute",
                        width: "100%",
                        backgroundColor:"#ededed"

                    }}
                >
                    <div style={{ width: "100%" }}>
                        <input
                            value={newMessage}
                            onChange={handleNewMessageChange}
                            placeholder="Write message..."
                            className="new-message-input-field"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="ml-2" style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                            onClick={handleSendMessage}
                            icon={faPaperPlane}
                            size="lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
