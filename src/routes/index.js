// Layouts
import { HeaderOnly } from "../components/Layout";

import Home from "../pages/Home";
import Following from "../pages/Following";
import Upload from "../pages/Upload";

// public routes: khong can dang nhap
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: HeaderOnly },
] 

// private routes: phai dang nhap
const privateRoutes = [

]  

export { publicRoutes, privateRoutes }