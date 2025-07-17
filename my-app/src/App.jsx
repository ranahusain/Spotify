import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Router,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import AddSong from "./pages/AddSong/AddSong";
import TrendingSongs from "./pages/TrendingSongs/TrendingSongs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/AddSong" element={<AddSong />} />
      <Route path="/TredingSongs" element={<TrendingSongs />} />
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
