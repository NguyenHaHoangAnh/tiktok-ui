import routesConfig from '../config/routes';

// Layouts
import { HeaderOnly } from "../components/Layout";

import Home from "../pages/Home";
import Following from "../pages/Following";
import Upload from "../pages/Upload";
import Profile from '../pages/Profile';

// public routes: khong can dang nhap
const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
] 

// private routes: phai dang nhap
const privateRoutes = [

]  

export { publicRoutes, privateRoutes }