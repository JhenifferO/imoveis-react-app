
import { BrowserRouter,  Route,  createBrowserRouter,  createRoutesFromElements,  useNavigate, useRoutes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import ImovelCadastro from "../pages/ImovelCadastro";
import Imoveis from "../pages/Imoveis";
import { useContext } from "react";
import { TokenContext } from "../contexts/tokenContext";
import MinhaArea from "../pages/MinhaArea";

export const publicRoutes = createBrowserRouter([
        {path:'/', element: <Home />},
        {path:'login', element: <Login />},
        {path:'cadastro', element: <Login />},
        {path:'imoveis', element: <Imoveis />},
        {path: 'minha_area', element: <MinhaArea />},
        {path: 'imovel_cadastro', element: <ImovelCadastro />},
        {path: 'imovel_cadastro_update/:id', element: <ImovelCadastro />}
])




