"use client";

import { useEffect, useState } from "react";
import Rough from "./_components/roughcanvas"
import socketClient from "@/utils/socketClient";
import { Data } from "@/types/data";




const Canvas =({
    params
}:{
   params: {id:string}
})=>{
    const [data,setData] = useState<Data>()
    const [loading,setLoading] = useState(true)

    const id =params.id

    useEffect(()=>{
       async function fetchdata(){
        const response = await fetch("/api/getcanvas", {
            method: "GET",
            headers: {
              Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            cache: 'default'
          });
      
          const newdata = await response.json();
          console.log(newdata)
          const can = newdata.canvas;
          const actualdata = ()=>{
            for ( let i = 0; i<can.length;i++){
                if(can[i].id == params.id){
                    return can[i];
                }
            }
          }
         setData(actualdata)
       
          setLoading(false);
       }
        fetchdata();
    
        },[params])
    
        if(loading){
            return  ( <div className="flex justify-center mt-24 "><div className="loader"></div></div>)
        }
    return  <Rough id={id} data={data as Data}/> 
}

export default Canvas;