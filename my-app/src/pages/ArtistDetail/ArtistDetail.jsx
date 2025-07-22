import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ArtistDetail.module.css";
import axios from "axios";
const ArtistDetail = () => {
  const { artistname } = useParams();
  const [artistData, setArtistData] = useState({ artist: {}, songs: [] });

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/artist/${encodeURIComponent(artistname)}`
        );
        setArtistData(res.data);
      } catch (error) {
        console.log("error in fetching songs");
      }
    };
    fetchSongs();
  }, [artistname]);

  return (
    <>
      <Navbar />
      <section className={styles.main_section}>
        <LeftBar />

        <div className={styles.right_side}>
          <div className={styles.artist_info}>
            {/* <img src={songs.artist.imageURL} alt={artist.name} /> */}
            {/* <h2>{songs.artist.name}</h2> */}
            {/* <p>{artist.bio || "No bio available."}</p> */}
          </div>
          <h3>Songs</h3>
          {/* <ul>
            {songs.map((song) => (
              <li key={song._id}>{song.songname}</li>
            ))}
          </ul> */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArtistDetail;
