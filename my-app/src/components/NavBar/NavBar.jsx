import styles from "./NavBar.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSpotify } from "react-icons/fa";
import { IoFolderOpenOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDownloading } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = JSON.parse(localStorage.getItem("user"));
    if (token && name) {
      setIsLoggedIn(true);
      setUsername(name.name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.nav_left}>
          <FaSpotify className={styles.nav_img} />
          <GoHomeFill className={styles.nav_img_1} />
          <div className={styles.search_bar}>
            <IoSearch className={styles.icon} />
            <input type="text" placeholder="What do you want to play?" />
            <span className={styles.separator}>|</span>
            <IoFolderOpenOutline className={styles.icon} />
          </div>
        </div>

        <ul className={styles.nav_right}>
          <li>
            <Link to="#">Premium</Link>
          </li>
          <li>
            <Link to="#">Support</Link>
          </li>

          <li>
            <Link to="#">Download</Link>
          </li>
          <li>
            <span className={styles.separator}>|</span>
          </li>
          <MdOutlineDownloading className={styles.download_icon} />

          <li>
            <Link to="#">Install App</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <h3>Welcome, {username}</h3>
              </li>
              <li>
                <Link to="/">
                  <button
                    type="button"
                    className={styles.nav_btn}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/SignUp">Signup</Link>
              </li>
              <li>
                <Link to="/LogIn">
                  <button type="button" className={styles.nav_btn}>
                    Login
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
