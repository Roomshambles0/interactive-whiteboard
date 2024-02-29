"use client";
import { useRouter } from "next/navigation";
import TypingAnimation from "@/app/(auth)/signin/_components/textanimation"; 

import localFont from 'next/font/local'

const myFonts = localFont({
  src: '../public/fonts/Virgil.woff2',
  variable: '--excal',
});

function Landing(){
  const router = useRouter()
  
  const onsingin = ()=>{
    router.push("/signin")
  }
  
  const onsignup = ()=>{
    router.push("/signup")
  }
    return   <div className="flex h-screen w-full shrink-0">
      <div className="flex-1 min-w-screen min-h-sscreen bg-drawing bg-no-repeat bg-cover bg-center bg-local overflow-auto shrink-0 z-0">
         <TypingAnimation></TypingAnimation>
         <div className="flex justify-center mt-20">
         <div className="mt-4  mx-4 ">
         <div style={{
                    borderRadius: '255px 20px 225px 15px/15px 225px 15px 255px',
                    border: 'solid 2px hsla(0, 0%, 20%, 1)',
                   
         }}>
         <button className={` ${myFonts.className} text-4xl font-normal px-5 hover:bg-black hover:text-white py-4`} onClick={onsingin}>Login</button>
         </div>
         </div>
         <div className="mt-4 mx-4">
       <div style={{
                    borderRadius: '255px 20px 225px 15px/15px 225px 15px 255px',
                    border: 'solid 2px hsla(0, 0%, 20%, 1)',
                   
         }}>  <button className={` ${myFonts.className} text-4xl font-normal px-5 hover:bg-black hover:text-white py-4`} onClick={onsignup}>Signup</button>
         </div>
         </div>
         </div>
      </div>

    </div>
}

export default Landing;