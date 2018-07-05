import AdminHome from "../views/AdminHome";
import PlaylistPlayPage from "../views/PlaylistPlayPage";
import NoMatchUrlPage from "../views/NoMatchUrlPage";

var indexRoutes = [
    {exact: false, path: "/playlist/:playlistId/play", name: "PlaylistPlayPage", component: PlaylistPlayPage},
    {exact: false, path: "/admin", name: "Admin", component: AdminHome},
    {exact: true, path: "/login", name: "Login", component: LoginPage},
{path: "/", name: "AppPage", component: App}
];

export default indexRoutes;