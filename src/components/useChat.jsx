import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const UPDATE_CHAT_MSG = "updateChatMessage";
const UPDATE_CHAT_CLIENT_NUMBER = "updateChatClientNumber";
const SOCKET_SERVER_URL = "http://127.0.0.1:4000/namespace";

const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const [clientNumber, setClientNumber] = useState(0);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        socketRef.current.on(UPDATE_CHAT_MSG, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            if (message.senderId !== socketRef.current.id) {
                let options = {
                    body: `You have a message from ${message.userName}`,
                    icon: process.env.PUBLIC_URL + '/logo192.png',
                  };
                new Notification("New message!",options);
            }
            setMessages((messages) => [...messages, incomingMessage]);
        });

        socketRef.current.on(UPDATE_CHAT_CLIENT_NUMBER, (message) => {
            if (typeof message === "number") {
                setClientNumber(message);
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (newMessage) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: newMessage.data,
            userName: newMessage.userName ? newMessage.userName : "Anonymous",
            senderId: socketRef.current.id,
        });
    };

    return { messages, sendMessage, clientNumber };
};

export default useChat;
