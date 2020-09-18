var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const PORT = process.env.PORT || 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const UPDATE_CHAT_MSG = "updateChatMessage";
const UPDATE_CHAT_CLIENT_NUMBER = "updateChatClientNumber";

app.get("/", (req, res) => {
    res.send('hello world');
});

const nsp = io.of("/namespace");

nsp.on("connection", (socket) => {
    console.log("a user connected");

    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        nsp.in(roomId).emit(UPDATE_CHAT_MSG, data);
    });

    nsp.in(roomId).clients(function (error, clients) {
        var numClients = clients.length;
        console.log("numClients:", numClients);
        nsp.in(roomId).emit(UPDATE_CHAT_CLIENT_NUMBER, numClients);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
        socket.leave(roomId);
    });
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
