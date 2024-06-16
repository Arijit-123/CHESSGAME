import { useEffect,useState } from "react";
import Chessboard from "../Components/Chessboard"
import { useSocket } from "../hooks/Usesocket"
import { Button } from "../Components/Button";
import { Chess } from "chess.js";

export const INIT_GAME="init_game";
export const MOVE="move";
export const GAME_OVER="game_over";

export const Game=()=>{

    const socket=useSocket();
  const [chess,setChess]= useState(new Chess());
  const [board,setBoard]=useState(chess.board());
   
  console.log("chessboard", board);
useEffect(() => {

if(!socket){
    return;
}
socket.onmessage=(event)=>{
    const message=JSON.parse(event.data);

    console.log(message);
    switch(message.type){
            case INIT_GAME:
               
                setBoard(chess.board());
                console.log("Game initialised");
                
                break;

              case MOVE:
                const move=message.payload;
                chess.move(move);
                console.log("Move made");
                break;
                
                case GAME_OVER:
                    console.log("Game Over");
                        break;
    }
}
}, [socket])
    if(!socket) return <div>Connecting...</div>
    return <div className="justify-center flex">
       <div className="pt-8 max-w-screen-lg">
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full bg-red-400 flex justify-center">
<Chessboard chess={chess} setBoard={setBoard}  socket={socket} board={board}/>
</div>
<div className="bg-slate-900">
    <Button onClick={()=>{
        socket?.send(JSON.stringify({
            type:INIT_GAME
        }))
    }}>
        Play
        </Button>
</div>
       </div>
    </div>
}