import { RouteObject } from "react-router-dom";

export type CustomRouteObject = RouteObject & {
  name: string; 
};


export interface storeDetailsType {
    id: number;
    storeCode: string;  
    storeName: string;  
    city: string;  
    state: string;
}



export interface skuDetailsType {
    id:string;
    label: string;
    class: string;
    department: string;
    price:string;
    cost:string;
}


export interface weeklyData {
  week: string;
  gmDollars: number;
  salesDollars: number;
  gmPercent: number;
}