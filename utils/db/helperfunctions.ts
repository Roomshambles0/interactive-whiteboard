import { Pclient } from "@/utils/prismaclient";

import { Point } from "@/types/point";


export async function getproperties(id:string){
    try{
    const Canvas = await Pclient.canvas.findUnique({
        where:{
            id:id
        }
    })

  
        return Canvas

}catch(e){
   console.log("getproperties error", e)
}

  
}

export async function createcanvas(
    id:string,
    name:string,
    elements:any[],
    Scale:number,
    panoffset:Point, 
    history:any[]){
        try{

   const scale = Scale.toString()
   const createCanvas = await Pclient.canvas.create({
        data:{
            autherId:id,
            name,
            elements,
            scale,
            panoffset,
            history,
        }
    })
//    console.log(createCanvas)
     return createCanvas

}catch(e){
    console.log(e)
}
}


export async function updatecanvas( 
     id:string, 
    elements:any[],
    Scale:number,
    panoffset:Point){

   try{
    const scale = Scale.toString()
        const updatedcanvas = await Pclient.canvas.update({
            where:{
                id:id
            },
            data:{
                elements,
                scale,
                panoffset,
                
            }
        })
   
     return updatecanvas

    }catch(e){
    console.log(e)
    }
}



export async function undoredo(
    id:string,
    elements:any[],
    history:any[]
){
try{
    
    const upadatehistroy = await Pclient.canvas.update(
        {
            where:{
                id:id
            },
            data:{
                elements,
                history
            }

        }
    )

    return upadatehistroy;
}catch(e){
    console.log(e,"undo redo helper error")
}
}