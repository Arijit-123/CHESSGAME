"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Gamemanager_1 = require("./Gamemanager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new Gamemanager_1.GameManager();
wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
});
