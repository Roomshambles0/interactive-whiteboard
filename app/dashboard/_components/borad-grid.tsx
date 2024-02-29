"use client";


import { useEffect, useState } from "react";
import { Card } from "./Card";
import { card } from "@/types/card";
import './styles/loader.css'; 



const Boards = ()=>{
const [card, setCard] = useState<card[]>()
const [loading,setLoading] = useState(true);




useEffect(() => {

  async function fetchData() {
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
     
    setCard(can);
 
    setLoading(false);
  };



  fetchData();


}, [])



  return  <>{ loading ? ( <div className="flex justify-center mt-24 "><div className="loader"></div></div>) : <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
  {card?.map(

    (car)=>{
  return <Card key={car.id} id={car.id} name={car.name}  createdAt={car.createdAt} updatedAt={car.updatedAt}/>
            })}
    
    </div>
          }
          </>
} 

export default Boards;