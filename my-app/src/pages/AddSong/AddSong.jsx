import styles from "./AddSong.module.css";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import SongUpload from "../../components/SongUpload/SongUpload";
import { BsSpotify } from "react-icons/bs";
import { useState } from "react";

const AddSong = () => {
  const [songname, setsongName] = useState("");
  const [artistname, setArtistName] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="maha_container">
        <div className={styles.main_container}>
          <div className={styles.container}>
            <h1 className={styles.heading}>
              Add a Song
              <span>
                <BsSpotify className={styles.logo} />
              </span>
            </h1>

            <form className={styles.form} onSubmit={handleNext}>
              <label>Song Name</label>
              <input
                type="text"
                name="name"
                placeholder="Shape of You"
                required
                value={songname}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Artist Name</label>
              <input
                type="text"
                name="text"
                placeholder="Ed Shereen"
                required
                value={artistname}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Image Url</label>
              <input
                type="text"
                name="text"
                placeholder="https://bkbfkacpgdxbbunehdgi.supabase.co/storage/v1/object/public/songs/0.9846359676765049.png"
                required
                value={imageURL}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ImageUpload />
              <SongUpload />

              <button type="submit" className={styles.next_btn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSong;
