
import { Authenticated, Refine } from "@refinedev/core";
import {BrowserRouter,Routes,Route, Navigate} from "react-router"
import routerBindings from "@refinedev/react-router";

import { authProvider } from "../dataproviders/auth-prov";
import Home from "../pages/Home";
import { ConfigProvider } from "antd";
import Post from "../pages/Post";
import { Login } from "../pages/Login";
import { MainLayout } from "../layout/Mainlayout";
export function App() {
  return (
    
      <BrowserRouter>
        <ConfigProvider>
          <Refine routerProvider={routerBindings} authProvider={authProvider}>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route
                path="/home"
                element={
                  <Authenticated
                    key="protected"
                    fallback={<Navigate to="/login" />}
                  ><MainLayout/></Authenticated>
                }
              >
                <Route index element={<Home />} />
                <Route path="post" element={<Post />} />
              </Route>
            </Routes>
          </Refine>
        </ConfigProvider>
      </BrowserRouter>
  
  );
}

export default App;


