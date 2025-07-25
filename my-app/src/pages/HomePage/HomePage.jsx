import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log("log in true set hogya");
      console.log(isLoggedIn);
    } else {
      setIsLoggedIn(false);
      console.log("log in false set hogya");
      console.log(isLoggedIn);
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("redirect_status");

    if (status === "succeeded") {
      toast.success("Payment successful!");
    } else if (status === "failed") {
      toast.error("Payment failed. Please try again.");
    }
  }, [location]);
  return (
    <>
      <NavBar />
      <MainContainer />
      {isLoggedIn ? <MusicPlayer /> : <Footer />}
    </>
  );
};

export default HomePage;
