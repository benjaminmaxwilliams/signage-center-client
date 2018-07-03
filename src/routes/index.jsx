import AdminHome from "../views/AdminHome";
import PlaylistPlayPage from "../views/PlaylistPlayPage";

var indexRoutes = [
    {path: "/playlist/:playlistId/play", name: "PlaylistPlayPage", component: PlaylistPlayPage},
    {path: "/admin", name: "Admin", component: AdminHome},
    // {path: "/", name: "Login", component: LoginPage}
];

export default indexRoutes;