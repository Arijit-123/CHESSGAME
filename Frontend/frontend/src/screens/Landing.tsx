import { Navigate, useNavigate } from "react-router-dom"

export const  Landing=()=>{

    const navigate=useNavigate();
return <div className="flex justify-center">
    <div className="mt-2">
<div className="grid grid-cols-1 gap-4  md:grid-cols-2">
<div>

    <img src={"/chessboard.webp"}></img>
</div>

<div>
<h1 className="text-4xl font-bold text text-white">  Play Chess online on second site</h1>

<button className="bg bg-blue-600" onClick={()=>navigate("/game")}>
    Play online
</button>
</div>

</div>

  
</div>
</div>
  
}