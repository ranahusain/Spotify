import React from "react";
import styles from "./LeftBar.module.css";
import { FiPlus } from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";

const LeftBar = () => {
  return (
    <>
      <div className={styles.left_side}>
        <div className={styles.left_heading}>
          <h3>Your Library</h3>
          <FiPlus className={styles.library_icon} />
        </div>

        <div className={styles.card}>
          <h3>Create Your first Playlist</h3>
          <p>It's easy, we'll help you</p>
          <button className={styles.nav_btn}>Create Playlist</button>
        </div>

        <div className={styles.card}>
          <h3>Let's find some podcasts to follow</h3>
          <p>We'll keep you updated on new episodes</p>
          <button className={styles.nav_btn}>Browse Podcasts</button>
        </div>

        <div className={styles.left_footer}>
          <a href="#">Legal</a>
          <a href="#">Safety & Privacy Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
          <a href="#">About Ads</a>
          <a href="#">Accessibility</a>
        </div>
        <a href="#" className={styles.cookie}>
          Cookies
        </a>

        <div className={styles.search_bar}>
          <CiGlobe className={styles.icon} />
          <button className={styles.language_btn}>English</button>
        </div>
      </div>
    </>
  );
};

export default LeftBar;
