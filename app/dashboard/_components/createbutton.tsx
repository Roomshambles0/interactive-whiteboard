"use client";
import Modal from '@/components/modal';
import { Brush } from 'lucide-react';
import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
const myFonts = localFont({
    src: '../../../public/fonts/Virgil.woff2',
    variable: '--excal',
  });



export const Createbutton= ()=>{
const [open,setOpen] = useState(false);
const [name,setName] = useState<string>();
const router = useRouter()

const onCreate = async()=>{
  if(!name) return
     const data = {name};

   
    const response = await fetch("/api/create",{
        method:"POST",
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(data),
          cache: 'default'
    })

   const newdata = await response.json()
   if(newdata.id){
    toast.success("Canvas Created Successfully..!")
     router.push(`/whiteboard/${newdata.id}`);
   }else{
    toast.error("Something went wrong..!");
   }
}

const inputStyle = {
  borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
  padding:'4px',
  mrgin:'1px',
  lineheight:' 1.5em',
  border: 'solid 2px hsla(0, 0%, 20%, 1)',
  fontfamily: myFonts.style.fontFamily,
  width:300
};

    const borderStyle = {
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
        lineheight:' 1.5em',
        border: 'solid 2px hsla(0, 0%, 20%, 1)',
    
      };

    return <div className={`${myFonts.className} mt-8 ml-5`}>
   
        <button className='pl-5 py-3 font-medium text-xl flex hover:text-white hover:bg-black' style={borderStyle} onClick={()=>{setOpen(true)}}>Create <div className='pl-2'><Brush /></div></button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className='mt-3'>
          <p className="text-2xl pb-2 font-semibold text-slate-400 ">Canvas name</p>
            <input type="text" style={inputStyle} onChange={(e)=>{
              setName(e.currentTarget.value);
            }}/>
        <div className='mt-2 mx-2 font-semibold text-lg'><button style={borderStyle} className='p-1 bg-black text-white' onClick={onCreate}>Submit</button></div>
          </div>
          </Modal>
    </div>
}

