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

  //add to playlist pop up states and functions
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const handleThreeDotClick = (songId) => {
    setOpenMenuId(openMenuId === songId ? null : songId);
  };

  const handleAddToPlaylistClick = async (song) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/getplaylists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Change this
      setPlaylists(res.data);
      setSelectedSong(song);
      setShowPlaylistPopup(true);
    } catch (error) {
      console.error("Error fetching playlists", error);
    }
  };

  const handlePlaylistSelect = async (playlistId) => {
    try {
      await axios.post("http://localhost:5000/api/playlists/add", {
        songId: selectedSong._id,
        playlistId,
      });

      setShowPlaylistPopup(false);
      setOpenMenuId(null);
      alert("Song added to playlist!");
    } catch (error) {
      console.error("Error adding song to playlist", error);
    }
  };

  //click anywhere on screeen to close the opened component
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close 3-dot menu if clicked outside
      if (
        !event.target.closest(`.${styles.threedot}`) &&
        !event.target.closest(`.${styles.popupMenu}`)
      ) {
        setOpenMenuId(null);
      }

      // Close playlist popup if clicked outside
      if (!event.target.closest(`.${styles.playlistPopup}`)) {
        setShowPlaylistPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //-------------------------------------//

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

                {/* <div className={styles.details}>
                  <span className={styles.threedot}>
                    <BsThreeDotsVertical />
                  </span>
                </div> */}

                <div className={styles.details}>
                  <span
                    className={styles.threedot}
                    onClick={() => handleThreeDotClick(song._id)}
                  >
                    <BsThreeDotsVertical />
                  </span>
                </div>
                {openMenuId === song._id && (
                  <div className={styles.popupMenu}>
                    <button
                      onClick={() => handleAddToPlaylistClick(song)}
                      className={styles.btn}
                    >
                      Add to Playlist
                    </button>
                  </div>
                )}
                <p>{song.artist.name}</p>
              </div>
            ))}
          </div>
          {showPlaylistPopup && (
            <div className={styles.playlistPopup}>
              <h4>Select a playlist</h4>
              <ul>
                {playlists.map((pl) => (
                  <li key={pl._id} onClick={() => handlePlaylistSelect(pl._id)}>
                    {pl.name}
                  </li>
                ))}
              </ul>
              <button
                className={styles.btn}
                onClick={() => setShowPlaylistPopup(false)}
              >
                Cancel
              </button>
            </div>
          )}
          <FooterUp />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TrendingSongs;
