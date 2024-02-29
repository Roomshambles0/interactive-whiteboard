import { getCurrentUser } from "@/app/actions/getcurrentUser";
import { createcanvas } from "@/utils/db/helperfunctions"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest){
     try{
      const user = await getCurrentUser()

        if (!user) return NextResponse.json({message:"user not present"},{status:401})
        const id = user.id;
      const body = await req.json();
      const {name} = body;
       
       const can = await createcanvas(id,name,[],1,{x:0,y:0},[]);    
       
     return NextResponse.json({message:"Canvas Created Succefully",canvas:can.name,id:can.id},{status:200})
    }catch(e){
      console.log(e,"create canvas");
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}
