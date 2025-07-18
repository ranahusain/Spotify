import React from "react";
import styles from "./Footer.module.css";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
const Footer = () => {
  return (
    <>
      <div className={styles.spotify_footer}>
        <div className={styles.footer_content}>
          <div className={styles.text_container}>
            <p className={styles.footer_heading}>Preview of Spotify</p>
            <p className={styles.footer_text}>
              Sign up to get unlimited songs and podcasts with occasional ads.
              No credit card needed.
            </p>
          </div>
          <button className={styles.signup_btn}>Sign up free</button>
        </div>
      </div>
    </>
  );
};

export default Footer;
