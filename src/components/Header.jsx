import React from "react";

const Header = ({ roomId, onlineNumber }) => {
    return (
        <div className="card-header" style={{ backgroundColor: "#ededed" }}>
            <div>
                <h1>Room: {roomId}</h1>
            </div>
            <div>
                <span>{onlineNumber} online</span>
            </div>
        </div>
    );
};
export default Header;
