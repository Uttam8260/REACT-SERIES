import { useState,useEffect } from "react";

function useCurrencyinfo(currency){
    const [data,setData] =useState({})

    useEffect(() =>{
        fetch(`https://api.frankfurter.app/latest?from=${currency}`)
        .then((res)=> res.json())
        .then((res)=> setData(res.rates))
        console.log(data);
        
    },[currency, data])
    //console.log(data);
    return data;
}
export default useCurrencyinfo