import AdminDashboard from "../views/AdminDashboard/AdminDashboard";
import PlaylistPlayPage from "../views/PlaylistPlayPage/PlaylistPlayPage";
import LoginPage from "../views/LoginPage/LoginPage";
import Signup from "../views/SignUpPage/SignUpPage";
import SlideViewPage from "../views/SlideViewPage/SlideViewPage";

const indexRoutes = [
    {
        private: false,
        exact: false,
        path: "/playlist/:playlistId/play",
        name: "PlaylistPlayPage",
        component: PlaylistPlayPage
    },
    {private: false, exact: true, path: "/slide/view/:slideId", name: "SlideView", component: SlideViewPage},
    {private: true, exact: false, path: "/admin", name: "Admin", component: AdminDashboard},
    {private: false, exact: true, path: "/signup", name: "Signup", component: Signup},
    {private: false, exact: true, path: "/login", name: "Login", component: LoginPage},
    {private: false, exact: true, path: "/", name: "Login", component: LoginPage}
];

export default indexRoutes;