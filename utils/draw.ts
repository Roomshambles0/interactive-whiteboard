import { element } from "@/types/element";
import { genratortype } from "@/types/gen";

export const drawfunction = (elements:element[],genrator?:genratortype,scale?:number)=>{
 elements.map((element)=>{
    try{
      genrator?.drawElement(element,scale);
     // console.log("draw")
    }catch(e){
        console.log("draw function error")
    }
 })
}