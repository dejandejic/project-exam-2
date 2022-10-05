import Intro from "views/Intro";
// import { UserProfile } from "views/pages/index";
import ChangePassword from "views/pages/ChangePassword/ChangePassword";
import Contacts from "views/pages/contacts/Contacts";
import Feedbacks from "views/pages/feedbacks/Feedbacks";
const dashboardRoutes = [
  { path: "/intro", component: Intro },
  // { path: "/profile", component: UserProfile },
  { path: "/change-password", component: ChangePassword },
  { path: "/contacts", component: Contacts },
  { path: "/feedbacks", component: Feedbacks }
];

export default dashboardRoutes;
