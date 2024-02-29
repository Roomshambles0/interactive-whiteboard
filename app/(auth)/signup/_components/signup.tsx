"use client"


import { useState } from "react"

import TypingAnimationS from "./textanimationS";

import localFont from 'next/font/local'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const myFonts = localFont({
    src: '../../../../public/fonts/Virgil.woff2',
    variable: '--excal',
  });

//use whiteboard at background of auth(like do something unique in ui)



const SignupComp =  ()=>{
const [username ,setUsername] =useState<string>()
const [password,setPassword] = useState<string>()

const router = useRouter();


  const onclick = async()=>{
    if(!username || !password) return
     const data = {username,password};

   
    const response = await fetch("/api/register",{
        method:"POST",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(data),
          cache: 'default'
    })

   const newdata = await response.json()
   if(newdata.name){
    signIn("admin", { redirect: false ,username:username,password:password})
    .then((callback) => {
      if (callback?.error) {
        console.log("error")
        toast.error("Invalid Credentials..!")
      }
  
      if (callback?.ok) {
        console.log("okk")
        toast.success("account created successfully")
        toast.success(`Welcome  ${username}`)
        router.push("/dashboard");
      }
    })
   }
}


const borderStyle = {
  borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
  padding:'2em',
  lineheight:' 1.5em',
  border: 'solid 2px hsla(0, 0%, 20%, 1)',
  boxShadow:'1px 9px 9px '
};

const inputStyle = {
  borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
  padding:'4px',
  lineheight:' 1.5em',
  border: 'solid 2px hsla(0, 0%, 20%, 1)',
  fontfamily: myFonts.style.fontFamily,
  width:300
};

    return <div>
       <TypingAnimationS/>
     <div className={`flex justify-center mt-12 shrink z-40` }>
      <div style={borderStyle} >
        <p className={`${myFonts.className} text-3xl font-bold pb-3 text-emerald-600`}>Create your account</p>
         <div className={`flex-none ${myFonts.className} text-lg font-normal`}>
          <p className="text-3xl ">Username</p>
          <input type="text" style={inputStyle}  onChange={(e)=>{
          setUsername(e.currentTarget.value)
     }} />
         </div>
         <div className={`flex-none ${myFonts.className} text-lg font-normal mt-2`}>
          <p className="text-3xl ">Password</p>
          <input type="password" style={inputStyle} onChange={(e)=>{
          setPassword(e.currentTarget.value)
     }}/>
         </div>
         <div className="mt-4 w-24 hover:bg-black">
         <div style={{
                    borderRadius: '255px 20px 225px 15px/15px 225px 15px 255px',
                    border: 'solid 2px hsla(0, 0%, 20%, 1)',
         }}>
          <button className={` ${myFonts.className} text-lg font-normal px-7 hover:text-white `} onClick={onclick}>Signup</button>
          </div> 
       
    </div>
    <div className={` ${myFonts.className} text-lg font-normal flex justify-center mt-8 underline underline-offset-4 decoration-emerald-500`}><Link href="/signin">already have an account?click here</Link></div>
    </div>
    </div>
    </div>
}

export default SignupComp;

