import styles from "./NavBar.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSpotify } from "react-icons/fa";
import { IoFolderOpenOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDownloading } from "react-icons/md";

const Navbar = () => {
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
            <a href="#">Premium</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <MdOutlineDownloading className={styles.download_icon} />

          <li>
            <a href="#">Download</a>
          </li>
          <li>
            <span className={styles.separator}>|</span>
          </li>
          <li>
            <a href="#">Install App</a>
          </li>
          <li>
            <a href="#">Signup</a>
          </li>
          <li>
            <button type="button" className={styles.nav_btn}>
              Login
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
