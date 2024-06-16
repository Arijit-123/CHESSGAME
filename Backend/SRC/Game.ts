import WebSocket from "ws";
import {Chess} from "chess.js";
import { GAME_OVER, INIT_GAME } from "./Messages";
export class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    public board:Chess;
    private moves:string[];
    private starttime:Date;
private Movecount=0;

    constructor(player1:WebSocket, player2:WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board=new Chess();
        this.moves=[];
        this.starttime = new Date();


        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))

        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))
    }


makeMove(socket:WebSocket,move:{from:string,to:string}){

    console.log(this.board.board);
if(this.Movecount % 2===0 && socket!== this.player1){
        return;

}

if(this.Movecount % 2===0 && socket!== this.player2){
    return;

}


    try{
this.board.move(move)
this.Movecount++;
    }
    catch(e){
return;
    }



    if(this.board.isGameOver()){
        this.player1.emit(JSON.stringify({
            type: GAME_OVER,
            payload:{
                winner:this.board.turn()==="w"?"black":"white"
            }
        }))
        return;
    }

    if(this.board.moves().length %2 ===0){
        this.player2.send(JSON.stringify({
                type: "move",
                payload:move
            }))
        }
    else{
        this.player1.send(JSON.stringify({
            type: "move",
            payload:move
        }))
    }
this.Movecount++
    
// if(socket===this.player1 || socket===this.player2){
//     this.moves.push(move);
//     this.board=move;
//     this.checkWinner();
}

}


