import config from '../config';

// Layouts
import { HeaderOnly } from "../layouts";

import Home from "../pages/Home";
import Following from "../pages/Following";
import Upload from "../pages/Upload";
import Profile from '../pages/Profile';

// public routes: khong can dang nhap
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
] 

// private routes: phai dang nhap
const privateRoutes = [

]  

export { publicRoutes, privateRoutes }