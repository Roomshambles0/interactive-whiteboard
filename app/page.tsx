import Landing from "@/components/landing";
import { getCurrentUser } from "./actions/getcurrentUser";
import { redirect } from "next/navigation";




export default async function  Home() 
{
 const user = await getCurrentUser()
 if(user){
  redirect("/dashboard");
 }
  
  return(
    <Landing></Landing>
  )
}