import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RegisterView from "./views/autentication/RegisterView";
import LoginView from "./views/autentication/LoginView";
import "./styles/index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path : "/register",
    element: <RegisterView></RegisterView>
  },
  {
    path : "/login",
    element: <LoginView></LoginView>
  }
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
