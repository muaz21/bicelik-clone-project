import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  // createBrowserRouter,
  Route,
  Routes,
  // Router,
  // RouterProvider,
} from "react-router-dom";
import Home from "./container/Home.tsx";
import ManageGallery from "./container/ManageGallery.tsx";
import Header from "./components/Header.tsx";
import {Toaster} from "@/components/ui/sonner";
import {UserProvider} from "./context/UserContext";
import GalleryForm from "./components/forms/GalleryForm.tsx";
import LoginForm from "./components/forms/LoginForm.tsx";
import GalleryUpdateForm from "./components/forms/GalleryUpdateForm.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Header />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/gallery" element={<ManageGallery />}></Route>
          <Route path="/gallery/create" element={<GalleryForm />}></Route>
          <Route
            path="/gallery/edit/:id"
            element={<GalleryUpdateForm />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
        </Routes>
        <Toaster />
      </UserProvider>
    </BrowserRouter>
  </>
);
