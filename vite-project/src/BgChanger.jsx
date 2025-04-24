import { useState } from "react"

function BgChanger(){
    const[color,setColor]=useState("Magenta")
return(
    <>
    <div className="w-full h-screen duration-200" style={{backgroundColor : color}}>
        <div className="fixed flex-flex-wrap justify-center top-12 inset-x-0 px-2">
            <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
                <button onClick={()=>setColor("Red")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"red"}}>Red</button>
                <button onClick={()=>setColor("Blue")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"Blue"}}>Blue</button>
                <button onClick={()=>setColor("Green")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"Green"}}>Green</button>
                <button onClick={()=>setColor("Black")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"Black"}}>Black</button>
                <button onClick={()=>setColor("White")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"White"}}>White</button>
                <button onClick={()=>setColor("olive")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"olive"}}>Olive</button>
                <button onClick={()=>setColor("Aqua")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"Aqua"}}>Aqua</button>
                <button onClick={()=>setColor("darkblue")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"darkblue"}}>Darkblue</button>
                <button onClick={()=>setColor("darkgreen")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"darkgreen"}}>Darkgreen</button>
                <button onClick={()=>setColor("darkorange")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"darkorange"}}>Darkorange</button>
                <button onClick={()=>setColor("pink")} className="outline-none px-4 py-1 rounded-full text-white shadow-lg" style={{backgroundColor:"pink"}}>Pink</button>
            </div>
        </div>
    </div>
    </>
)
}export default BgChanger