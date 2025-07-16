import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
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

  return (
    <>
      <NavBar />
      <MainContainer />
      {isLoggedIn ? <> </> : <Footer />}
    </>
  );
};

export default HomePage;
