import AdminHome from "../views/AdminHome";
import PlaylistPlayPage from "../views/PlaylistPlayPage";
import LoginPage from "../views/LoginPage";

const indexRoutes = [
    {exact: false, path: "/playlist/:playlistId/play", name: "PlaylistPlayPage", component: PlaylistPlayPage},
    {exact: false, path: "/admin", name: "Admin", component: AdminHome},
    {exact: true, path: "/login", name: "Login", component: LoginPage},
    {exact: true, path: "/", name: "Login", component: LoginPage}
];

export default indexRoutes;