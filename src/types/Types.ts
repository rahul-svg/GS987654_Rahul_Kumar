import { RouteObject } from "react-router-dom";

export type CustomRouteObject = RouteObject & {
  name: string; 
};

export interface AuthState {
  isLoggedIn: boolean;
}

export interface AuthForm {
  email:string;
  password:string;
}


export interface storeDetailsType {
    id: string;
    name: string;  // Changed "Store" → "name"
    city: string;  // Changed "City" → "city"
    state: string; // Changed "State" → "state"
}



export interface skuDetailsType {
    id: number;
    sku: string;  // Changed "Store" → "name"
    price: number;  // Changed "City" → "city"
    cost: number; // Changed "State" → "state"
}
