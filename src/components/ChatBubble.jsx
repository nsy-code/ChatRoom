import React from "react";

const ChatBubble = (props) => {
    return (
        <div
            className="mb-2 pl-2 pr-2"
            style={{
                border: "solid",
                borderRadius: "10px",
                padding: "0px 10px",
                borderWidth: " 2px",
                backgroundColor: props.isOwner ? "#06d050" : "#097dfc",
                borderColor: props.isOwner ? "#06d050" : "#097dfc",
            }}
        >
            {props.children}
        </div>
    );
};

export default ChatBubble;
