import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { Pclient } from "@/utils/prismaclient";


export async function POST(req:NextRequest){
    try{
        const body = await req.json();
        console.log(body)
        const {username ,password} = body;
        
        const hashedpassword = await bcrypt.hash(password,12);

       const isuser = await Pclient.user.findUnique({
        where:{
            name:username,
        }
       })
       
       console.log(isuser)
          if(isuser) return NextResponse.json({"message":"username is present"},{status:400});
          
          const User =  await Pclient.user.create({
            data:{
                name:username,
                hashedpassword
            }
        })
        console.log(User)
        if(User){
            return NextResponse.json({"message":"user created succesfully",name:username});
        }else{
            return NextResponse.json({"message":"username is present"},{status:400});
        }

    }catch(error){
        console.log(error,"register error");
        return NextResponse.json({ message: "internal server error" });
    }
} 