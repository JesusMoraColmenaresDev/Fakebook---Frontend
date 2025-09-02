import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RegisterView from "./views/autentication/RegisterView";
import LoginView from "./views/autentication/LoginView";
import "./styles/index.css"
import { handleLogout, isLogin, isNotLogin } from "./utils/authenticationUtils";
import HomePageView from "./views/HomePageView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import ProfileView from "./views/ProfileView";
import RootLayout from "./components/Layout";



const router = createBrowserRouter([
  {
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <HomePageView></HomePageView>,
        loader: isNotLogin
      },
      {
        path: "/register",
        element: <RegisterView></RegisterView>,
        loader: isLogin
      },
      {
        path: "/login",
        element: <LoginView></LoginView>,
        loader: isLogin
      },
      {
        path: "/profile/:userId",
        element: <ProfileView></ProfileView>,
        loader: isNotLogin
      }
    ]
  }
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(

  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>

);
