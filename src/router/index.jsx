import React from 'react'
import { Routes, } from "react-router-dom";
import { routes } from "./routerData";


function RouterManage(props) {
  const route = routes();
  return (

      <Routes>
        {route}
      </Routes>

  );
}


export default RouterManage;