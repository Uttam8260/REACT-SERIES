import { useCallback, useEffect, useState,useRef } from "react"

export default function PwGenertor(){
    const [length,setlength]=useState(8)
    const [number,setNumber]=useState(false)
    const [char,setChar]=useState(false)
    const [password, setPassword]=useState("")
    //useRef hook
    const passwordRef = useRef(null)

    const passwordGenerator = useCallback( () =>{
        let pass =""
        let str= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMMNOPQRSTUVWXYZ"
        if(number) str +="0123456789"
        if(char) str += "@$%^&*()#!"

        for(let i=1;i<=length;i++){
            let charr=Math.floor(Math.random()*str.length+1)
            pass +=str.charAt(charr);
        }
        setPassword(pass)

    } ,[length, number, char,setPassword])

    const copyPasswordToClipboard= useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password)},[password])

    useEffect(()=>{passwordGenerator()},[length,number,char,passwordGenerator])
    return(
        <>
            
            <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-green-500 bg-gray-800">
                <h1 className="text-white text-center my-3">password Generator</h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input type="text" 
                value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="password"
                readOnly
                ref={passwordRef}
                />
                <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
            </div>
            <div className="flex flex-sm gap-x-2">
                <div className="flex items-center gap-x-1 text-white">
                    <input 
                    type="range"
                    min={6} 
                    max={100}
                    value={length} 
                    className="'cursor-pointer" 
                    onChange={(e) => {setlength(e.target.value)}}/>
                        <label>length: {length}</label>
                    
                </div>
                <div className="flex items-center gap-x-1 text-white">
                <input 
                    type="checkbox"
                    defaultChecked={number}
                    id="numberInput" 
                    className="'cursor-pointer" 
                    onChange={() => {setNumber((prev) => !prev);}}
                    />
                    <label htmlFor="numberInput">Number</label>
                </div>
                <div className="flex items-center gap-x-1 text-white">
                <input 
                    type="checkbox"
                    defaultChecked={char}
                    id="character-Input" 
                    className="'cursor-pointer" 
                    onChange={() => {setChar((prev) => !prev);}}
                    />
                    <label htmlFor="numberInput">Character</label>
                </div>
            </div>
            </div>
        </>
    )
}