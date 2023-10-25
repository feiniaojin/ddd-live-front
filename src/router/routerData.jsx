import React from "react";
import { Route } from "react-router-dom";
import { lazy } from 'react'
const ErrorPage = lazy(() => import('@/pages/ErrorPage/index.tsx'))
const LayoutFree = lazy(() => import('@/components/LayoutFree'))
const Home = lazy(() => import('@/containers'))
const PersonManage = lazy(() => import('@/pages/PersonManage'))
const HouseManage = lazy(() => import('@/pages/HouseManage'))
const LiveManage = lazy(() => import('@/pages/LiveManage'))


const routerData= [
    {
        id: "/",
        path: "/",
        element: <PersonManage />,
        desc: '主播管理',
        authority: "",
    },
    {
        id: "/person-manage",
        path: "/person-manage",
        element: <PersonManage />,
        desc: '主播管理',
        authority: "",
    },
    {
        id: "/house-manage",
        path: "/house-manage",
        element: <HouseManage />,
        desc: '房间管理',
        authority: "",
    }, 
    {
        id: "/live-manage",
        path: "/live-manage",
        element: <LiveManage />,
        desc: '直播管理',
        authority: "",
    },
 
{
    id: "*",
    path: "*",
    element: <ErrorPage />,
    desc: 3,
    authority: "",
},];
export const routes = () => {
    return  <Route exact path='/' element={<Home />} children={
        routerData.map(({ id, path, exact, element, authority }) => {
            return (
                <Route
                    path={path}
                    id={id}
                    element={element}
                />
            );
        })
    }>    
    </Route>
};
