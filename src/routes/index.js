import AdminHome from "../views/AdminHome";
import PlaylistPlayPage from "../views/PlaylistPlayPage";
import LoginPage from "../views/LoginPage";
import Signup from "../views/Signup";

const indexRoutes = [
    {
        private: true,
        exact: false,
        path: "/playlist/:playlistId/play",
        name: "PlaylistPlayPage",
        component: PlaylistPlayPage
    },
    {private: true, exact: false, path: "/admin", name: "Admin", component: AdminHome},
    {private: false, exact: true, path: "/signup", name: "Signup", component: Signup},
    {private: false, exact: true, path: "/login", name: "Login", component: LoginPage},
    {private: false, exact: true, path: "/", name: "Login", component: LoginPage}
];

export default indexRoutes;