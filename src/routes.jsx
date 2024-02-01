//auth
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
//pages
import Layout from "./layout/Layout";
import Home from "./views/Home/Home";
import Gallery from "./views/Gallery/Gallery";
import ContactUs from "./views/ContactUs/ContactUs";
import Faq from "./views/Faq/Faq";
import Gspace from "./views/Gspace/Gspace";//dagdag

export const appRoutes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/gallery",
      element: <Gallery />,
    },
    {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/gspace",
        element: <Gspace />,
      },
  ];

const routes = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/*",
      element: <Layout />,
    },
  ];
  
  export default routes;




