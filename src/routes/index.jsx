import Class from "@/pages/Manage/Class";
import Student from "@/pages/Manage/Student";
import Subject from "@/pages/Manage/Subject";
import HomePage from "@/pages/HomePage";
import SignIn from "@/pages/User/SignIn/SignIn";
import SignUp from "@/pages/User/SignUp/SignUp";

//public routes
const publicRoutes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/class",
    component: Class,
  },
  {
    path: "/student",
    component: Student,
  },
  {
    path: "/subject",
    component: Subject,
  },
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "/signup",
    component: SignUp,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
