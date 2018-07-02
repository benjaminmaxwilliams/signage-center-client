import App from "../App";
import AdminHome from "../views/AdminHome";
import CalendarSlide from "../components/slides/CalendarSlide";
import PlaylistPlayPage from "../views/PlaylistPlayPage";
import PlaylistTablePage from "../views/PlaylistTablePage";
import PlaylistPage from "../views/PlaylistPage";

var indexRoutes = [
    {path: "/playlist/:playlistId/play", name: "PlaylistPlayPage", component: PlaylistPlayPage},
    // {path: "/playlist/all", name: "PlaylistTablePage", component: PlaylistTablePage},
    {path: "/playlist/:playlistId", name: "PlaylistPage", component: PlaylistPage},
    // {path: "/slide/image/create", name: "ImageSlideCreatePage", component: ImageSlideCreatePage},
    {path: "/calendar", name: "Calendar", component: CalendarSlide},
    {path: "/admin", name: "Admin", component: AdminHome},
    {path: "/", name: "AppPage", component: App}
];

export default indexRoutes;