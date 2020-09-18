import React from "react";

export default function Home({
    roomName,
    setRoomName,
    userName,
    setUserName,
    setIsJoin,
}) {
    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    return (
        <React.Fragment>
            <div
                className="p-4 card mt-4"
                style={{
                    width: "300px",
                    height: "300px",
                    alignItems: "center",
                }}
            >
                <div className="row mt-1 mb-4" style={{ width: "100%" }}>
                    <div className="col-sm" style={{ width: "100%" }}>
                        <h1>Chat Room</h1>
                    </div>
                </div>
                <div className="row mt-1 mb-1" style={{ width: "100%" }}>
                    <div className="col-sm" style={{ width: "100%" }}>
                        <input
                            type="text"
                            placeholder="Room"
                            value={roomName}
                            onChange={handleRoomNameChange}
                            className="text-input-field"
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
                <div className="row mt-1 mb-1" style={{ width: "100%" }}>
                    <div className="col-sm" style={{ width: "100%" }}>
                        <input
                            type="text"
                            placeholder="User Name"
                            value={userName}
                            onChange={handleUserNameChange}
                            className="text-input-field"
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
                <div className="row mt-1 mb-1" style={{ width: "100%" }}>
                    <div className="col-sm" style={{ width: "100%" }}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                if (roomName && userName) {
                                    setIsJoin(true);
                                } else {
                                    alert(
                                        "Please input User name and Room name"
                                    );
                                }
                            }}
                            style={{ width: "100%" }}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
