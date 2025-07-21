import { useState, useEffect } from "react";
import styles from "./TrendingSongs.module.css";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import FooterUp from "../../components/FooterUp/FooterUp";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import Footer from "../../components/Footer/Footer";
import { BsThreeDotsVertical } from "react-icons/bs";

const TrendingSongs = () => {
  const [songs, setSong] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [audio, setAudio] = useState(null);

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
    if (playingId === song._id) {
      audio.pause();
      setPlayingId(null);
    } else {
      if (audio) audio.pause();
      const newAudio = new Audio(song.songURL);
      newAudio.play();
      setAudio(newAudio);
      setPlayingId(song._id);
    }
  };

  return (
    <>
      <Navbar />
      <section className={styles.main_section} style={{ marginBottom: "50px" }}>
        <LeftBar />
        <div className={styles.right_side}>
          <div className={styles.section_header}>
            <h2>Trending songs</h2>
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
                    {playingId === song._id ? (
                      <FaPause className={styles.audio_icon} />
                    ) : (
                      <FaPlay className={styles.audio_icon} />
                    )}
                  </div>
                </div>
                <h3>{song.songname}</h3>

                <div className={styles.details}>
                  <span className={styles.threedot}>
                    <BsThreeDotsVertical />
                  </span>
                </div>

                <p>{song.artist.name}</p>
              </div>
            ))}
          </div>
          <FooterUp />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TrendingSongs;
