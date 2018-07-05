import AdminHome from "../views/AdminHome";
import PlaylistPlayPage from "../views/PlaylistPlayPage";
import LoginPage from "../views/LoginPage";

var indexRoutes = [
    {exact: false, path: "/playlist/:playlistId/play", name: "PlaylistPlayPage", component: PlaylistPlayPage},
    {exact: false, path: "/admin", name: "Admin", component: AdminHome},
    {path: "/login", name: "Login", component: LoginPage},
    {path: "/", name: "Login", component: LoginPage}
];

export default indexRoutes;