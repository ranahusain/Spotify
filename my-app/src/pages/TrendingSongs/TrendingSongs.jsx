import { useState, useEffect } from "react";
import styles from "./TrendingSongs.module.css";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import FooterUp from "../../components/FooterUp/FooterUp";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/NavBar";
import LeftBar from "../../components/LeftBar/LeftBar";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";

import { Link } from "react-router-dom";

import { useContext } from "react";
import { SongContext } from "../../context/SongContext";

import { useNavigate } from "react-router-dom";

const TrendingSongs = () => {
  const navigate = useNavigate();

  const { songDetails, setSongDetails, isPlaying, setIsPlaying } =
    useContext(SongContext);

  const [songs, setSong] = useState([]);

  useEffect(() => {
    const fetchsongs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getsong/");
        setSong(res.data);
      } catch (error) {
        console.log("error in fetching songs");
      }
    };
    fetchsongs();
  }, []);

  const togglePlay = (song) => {
    if (songDetails.songURL === song.songURL) {
      setIsPlaying(!isPlaying); // toggle
    } else {
      setSongDetails({
        songURL: song.songURL,
        imageURL: song.imageURL,
        artistName: song.artist.name,
        songName: song.songname,
      });
      setIsPlaying(true);
    }
  };

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
    <div>
      <Navbar showSearch={false} /> {/* Hide search bar here */}
      <section className={styles.main_section} style={{ marginBottom: "50px" }}>
        <LeftBar />

        <div className={styles.right_side}>
          <div className={styles.section_header}>
            <h2>Trending songs</h2>
            <Link to="/TredingSongs">Show all</Link>
          </div>

          <div className={styles.song_grid}>
            {songs.map((song) => (
              <div className={styles.song_card} key={song._id}>
                <div className={styles.image_wrapper}>
                  <img src={song.imageURL} alt={song.songname} />
                  <div
                    className={styles.play_icon}
                    onClick={() => togglePlay(song)}
                  >
                    {isLoggedIn ? (
                      songDetails.songURL === song.songURL && isPlaying ? (
                        <FaPause className={styles.audio_icon} />
                      ) : (
                        <FaPlay className={styles.audio_icon} />
                      )
                    ) : (
                      <Link to="/LogIn" className={styles.audio_icon_link}>
                        <FaPlay className={styles.audio_icon} />
                      </Link>
                    )}
                  </div>
                </div>
                <h3>{song.songname}</h3>
                <p>{song.artist.name}</p>
              </div>
            ))}
          </div>

          <FooterUp />
        </div>
      </section>
      <MusicPlayer />
    </div>
  );
};

export default TrendingSongs;
