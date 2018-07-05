import AdminHome from "../views/AdminHome";
import PlaylistPlayPage from "../views/PlaylistPlayPage";
import NoMatchUrlPage from "../views/NoMatchUrlPage";

var indexRoutes = [
    {exact: false, path: "/playlist/:playlistId/play", name: "PlaylistPlayPage", component: PlaylistPlayPage},
    {exact: false, path: "/admin", name: "Admin", component: AdminHome},
    {exact: true, path: "/", name: "Login", component: {NoMatchUrlPage}},
    // {path: "/", name: "Login", component: LoginPage}
];

export default indexRoutes;