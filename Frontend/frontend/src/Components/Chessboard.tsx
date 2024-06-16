import React, { useState } from 'react'
import { Color,PieceSymbol,Square } from 'chess.js';
import { MOVE } from '../screens/Game';
import { useSocket } from '../hooks/Usesocket';
export const Chessboard=({chess, board,socket,setBoard}: {
  chess:any;
  setBoard:any;
  board:({
  
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][];
socket:WebSocket;
})=> {
 
  const [from,setFrom]=useState<null|Square>(null);
  const [to,setTo]=useState<null|Square>(null);
  return (
    <div className='text text-white'>
      {
        board.map((row,i)=>{
          return<div key={i} className='flex'>
{
  row.map((square,j)=>{

    const squareRepresentation=String.fromCharCode(97 + (j % 8))+""+(8 - i) as Square;
    console.log("square", squareRepresentation);


    return <>
    <div onClick={()=>{
if(!from){
  setFrom(squareRepresentation);

}
else{
 
  // setTo(square?.square??null);
  socket?.send(JSON.stringify({
    type:MOVE,
    payload:{
      move:{
        from,
        to:squareRepresentation
      }
     
    }
  }))

  setFrom(null);
  console.log({from, to:squareRepresentation})
chess.move({
  from,
  to:squareRepresentation
});
setBoard(chess.board());
console.log({from,to:squareRepresentation});


}

    }}
    
    key={j} className={`w-16 h-16 ${(i+j)%2==0?'bg-green-500':'bg-green-300'}`}>
{square?square.type:""}
      </div>
      </>
  })
}

            </div>
        })
      }
    </div>
  )
}

export default Chessboard
