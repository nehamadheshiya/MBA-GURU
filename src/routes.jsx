import {
  HomeIcon,
  UserCircleIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon,
  AcademicCapIcon,
  ClockIcon,
  FolderIcon,
  BookOpenIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
 BookmarkIcon,
 PlusIcon,
 EyeIcon,
 UserGroupIcon,
 ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications ,Appuserdetails} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Material from "./pages/dashboard/material";
import Initialswot from "./pages/dashboard/initialswot";
import Backup from "./pages/dashboard/backup";
import Calendar from "./pages/dashboard/calendar";
import Section1 from "./pages/dashboard/section1";
import RegistrationCls from "./components/registration-classes/RegistrationCls";
import Batches from "./components/batchess/Batches";
import ViewStudent from "./pages/dashboard/ViewStudent";
import UploadMat from "./components/upload-material/UploadMat";
import Uploadmaterial from "./pages/dashboard/uploadmaterial";
import Addsection from "./pages/dashboard/addsection";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
     
      {
        icon: <UserIcon {...icon} />,
        name: "student creation",
        path: "/studentcreation",
        element: <Appuserdetails />,
      },
      {
        icon: <ClockIcon {...icon} />,
        name: "initial SWOT",
        path: "/initialswot",
        element: <Initialswot />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "add Batches",
        path: "/batches",
        element: <Batches />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "registration class",
        path: "/registration",
        element: <RegistrationCls />,
      },
      {
        icon: <CalendarIcon {...icon} />,
        name: "calendar",
        path: "/calendar",
        element: <Calendar />,
      },
      {
        icon: <EyeIcon {...icon} />,
        name: "view and edit",
        path: "/viewedit",
        element: <Section1 />,
      },
      {
        icon: <PlusIcon {...icon} />,
        name: "add section",
        path: "/addsection",
        element: <Addsection/>,
      },
      {
        icon: <ArrowUpTrayIcon {...icon} />,
        name: "upload material",
        path: "/uploadmaterial",
        element: <Uploadmaterial/>,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "material",
        path: "/material",
        element: <Material />,
      },
     
      {
        icon: <FolderIcon {...icon} />,
        name: "backup",
        path: "/backup",
        element: <Backup />,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notification",
      //   path: "/notification",
      //   element: <Notifications />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },  
    ],
  },
  {
    // title: "auth pages",
    layout: "auth",
    pages: [
      {
        // icon: <UserCircleIcon {...icon} />,
        // name: "sign out",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        // icon: <ServerStackIcon {...icon} />,
        // name: "sign in",
        path: "auth/sign-in",
        element: <SignIn />,
      },
   
    ],
  },
];

export default routes;
