

import { redirect } from "next/navigation";
import  Boards  from "./_components/borad-grid";
import { Toolbar } from "./_components/toolbar";
import { Createbutton } from "./_components/createbutton";
import { getCurrentUser } from "../actions/getcurrentUser";

export default async function Dashboard  (){
  
  //at the time of testing try to make this server component
  // make datetime consize
  // authenticate with jwt and signin callback
   const user = await getCurrentUser()

   if(!user){
    redirect("/")
   }
  

    return <div>
      <Toolbar />
      <Createbutton />
      <Boards />
      </div>
}

