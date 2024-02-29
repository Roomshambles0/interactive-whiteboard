import { element } from "./element";
import { Point } from "./point";

export interface Data{
  elements:element[],
  history:element[],
  scale:string,
  panoffset:Point

}