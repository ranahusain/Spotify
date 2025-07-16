import styles from "./AddSong.module.css";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import SongUpload from "../../components/SongUpload/SongUpload";
import { BsSpotify } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";

const AddSong = () => {
  const [songname, setsongName] = useState("");
  const [artistname, setArtistName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [songURL, setSongURL] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/addsong/", {
        songname,
        artistname,
        imageURL,
        songURL,
      });
      console.log(res.data);
      setsongName("");
      setArtistName("");
      setImageURL("");
      setSongURL("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <h1 className={styles.heading}>
            Add a Song
            <span>
              <BsSpotify className={styles.logo} />
            </span>
          </h1>

          <form className={styles.form} onSubmit={submitForm}>
            <label>Song Name</label>
            <input
              type="text"
              name="name"
              placeholder="Shape of You"
              required
              value={songname}
              onChange={(e) => setsongName(e.target.value)}
            />

            <label>Artist Name</label>
            <input
              type="text"
              name="text"
              placeholder="Ed Shereen"
              required
              value={artistname}
              onChange={(e) => setArtistName(e.target.value)}
            />

            <label>Image Url</label>
            <input
              type="text"
              name="text"
              placeholder="https://urlwillautomaticallyappearhere"
              required
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />

            <label>Song Url</label>

            <input
              type="text"
              name="text"
              placeholder="https://"
              required
              value={songURL}
              onChange={(e) => setSongURL(e.target.value)}
            />
            <ImageUpload OnUpload={setImageURL} />

            <SongUpload OnUpload={setSongURL} />
            <button type="submit" className={styles.next_btn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSong;
