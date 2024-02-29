import { getCurrentUser } from "@/app/actions/getcurrentUser"
import { Pclient } from "@/utils/prismaclient";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest){
    try{
     const user = await getCurrentUser();

     if (!user) return NextResponse.json({message:"user not present"},{status:401})
      const can = await Pclient.canvas.findMany({
      where:{
        autherId:user.id
      }
      })
      
      if (!can) return NextResponse.json({message:"canvases not present"},{status:401})
       console.log(can.length)
      // let canvasprops = [];
      
      // for (let index = 0; index < can.length; index++ ){

         
      //    canvasprops[index] = {
      //     id:can[index].id,
      //     name:can[index].name,
      //     createdAt:can[index].createdAt,
      //     updatedAt:can[index].updatedAt
      //    };
      // }
      // console.log(canvasprops)


    return NextResponse.json({message:"Okk",canvas:can},{status:200})
   }catch(e){
    console.log(e)
       return NextResponse.json({message:"Something went wrong"},{status:500})
   }
}

/*

  function timeanddate(data:string){
  console.log(data)

      const time = data.substring(11,19);
      const date = data.substring(0,10)
    const datetime = date +" at " + time;
      return datetime
  }

     console.log(typeof can.createdAt)
    const created = timeanddate(can.createdAt);
    const updated = timeanddate(can.updatedAt);

    can.updatedAt = updated;
    can.createdAt = created;
*/