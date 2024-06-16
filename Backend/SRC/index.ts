import { WebSocketServer } from 'ws';
import { GameManager } from './Gamemanager';
const wss = new WebSocketServer({ port: 8080 });


const gameManager=new GameManager();

wss.on('connection', function connection(ws) {

gameManager.addUser(ws)
  
});