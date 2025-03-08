import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./component/Navbar";


const App: React.FC = () => {
  return (

    <>
      <Navbar />
       <div className="content">
      <RouterProvider router={AppRoutes} />
      </div> 
    </>
  
  );
};

export default App;
