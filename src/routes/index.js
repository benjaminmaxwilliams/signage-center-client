import AdminHome from "../views/AdminHome";
import PlaylistPlayPage from "../views/PlaylistPlayPage";
import LoginPage from "../views/LoginPage";
import Signup from "../views/Signup";

const indexRoutes = [
    {exact: false, path: "/playlist/:playlistId/play", name: "PlaylistPlayPage", component: PlaylistPlayPage},
    {exact: false, path: "/admin", name: "Admin", component: AdminHome},
    {exact: true,  path: "/signup", name: "Signup", component: Signup},
    {exact: true, path: "/login", name: "Login", component: LoginPage},
    {exact: true, path: "/", name: "Login", component: LoginPage}
];

export default indexRoutes;