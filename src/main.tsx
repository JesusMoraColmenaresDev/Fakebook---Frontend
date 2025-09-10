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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProfileFriends from "./components/profile/ProfileFriends";
import ProfileAbout from "./components/profile/ProfileAbout";
import ProfilePost from "./components/profile/ProfilePost";
import CommentsView from "./views/CommentsView";



const router = createBrowserRouter([
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
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <HomePageView></HomePageView>,
        loader: isNotLogin
      },

      {
        path: "/profile/:userId",
        element: <ProfileView></ProfileView>,
        loader: isNotLogin,
      },
      {
        // Esta ruta captura tanto /posts/:id/comments como /shares/:id/comments
        path: "/:type/:id/comments",
        element: <CommentsView />,
        loader: isNotLogin
      }
    ]
  }
]);

export const queryClient = new QueryClient()

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(

  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer />
  </QueryClientProvider>

);
