import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_GAME } from "./Messages";
import { MOVE } from "./Messages";
export class GameManager {
    public games: Game[];
    public pendingUsers: WebSocket|null;
    public users:WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUsers=null;
        this.users=[];

    }

    addUser(socket: WebSocket) {
       this.users.push(socket);
       this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        
        this.users=this.users.filter(user=>user!==socket);
       
    }

    private addHandler(socket:WebSocket) {
        // Implementation for handling messages

        socket.on('message',(data)=>{
            const message=JSON.parse(data.toString());
            if(message.type==INIT_GAME){
               if(this.pendingUsers)
                {
                const game=new Game(this.pendingUsers,socket);
                this.games.push(game);
                this.pendingUsers=null;
                }
                else{
                    this.pendingUsers=socket;
                }
            }

            if(message.type==MOVE)
                {

                    console.log("this is within move");
                    const game=this.games.find(game=>game.player1=== socket || game.player2=== socket);

                    if(game){
                        console.log("this is inside makemove");
                        game.makeMove(socket,message.move);
                    }
                }
        })
    }
}
