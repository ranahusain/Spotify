import React, { useState, useEffect } from "react";
import styles from "./RightBar.module.css";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import FooterUp from "../FooterUp/FooterUp";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { SongContext } from "../../context/SongContext";

const RightBar = () => {
  // const { songDetails, setSongDetails } = useContext(SongContext);
  const { songDetails, setSongDetails, isPlaying, setIsPlaying } =
    useContext(SongContext);

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
    // If user clicks the currently playing song
    if (songDetails.songURL === song.songURL) {
      setIsPlaying(!isPlaying); // toggle
    } else {
      setSongDetails({
        songURL: song.songURL,
        imageURL: song.imageURL,
        artistName: song.artist.name,
        songName: song.songname,
      });
      setIsPlaying(true); // always play new song
    }
  };

  console.log("HELLO");
  console.log(songDetails.songURL);

  return (
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
                {songDetails.songURL === song.songURL && isPlaying ? (
                  <FaPause className={styles.audio_icon} />
                ) : (
                  <FaPlay className={styles.audio_icon} />
                )}
              </div>
            </div>
            <h3>{song.songname}</h3>
            <p>{song.artist.name}</p>
          </div>
        ))}
      </div>
      {/* //popular artist */}
      <div className={styles.section_header}>
        <h2>Popular artists</h2>
        <Link to="PopularArtist">Show all</Link>
      </div>
      <div className={styles.song_grid}>
        {songs.map((song) => (
          <div className={styles.song_card} key={song._id}>
            <div className={styles.image_wrapper_1}>
              <img src={song.artist.imageURL} alt={song.songname} />
            </div>
            <h3>{song.artist.name}</h3>
            <p>Artist</p>
          </div>
        ))}
      </div>

      <div className={styles.section_header}>
        <h2>Popular albums and singles</h2>
        <Link to="/PopularAlbum">Show all</Link>
      </div>
      <div className={styles.song_grid}>
        {songs.map((song) => (
          <div className={styles.song_card} key={song._id}>
            <div className={styles.image_wrapper}>
              <img src={song.album.imageURL} alt={song.songname} />
            </div>
            <h3>{song.album.name}</h3>
            <p>{song.artist.name}</p>
          </div>
        ))}
      </div>
      <FooterUp />
    </div>
  );
};

export default RightBar;
