import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../RightBar/RightBar";
import styles from "./MainContainer.module.css";
import PlaylistBar from "../PlayListLeftBar/PlayListBar";
const MainContainer = () => {
  return (
    <>
      <section className={styles.main_section} style={{ marginBottom: "50px" }}>
        <LeftBar />
        {/* <PlaylistBar /> */}
        <RightBar />
      </section>
    </>
  );
};

export default MainContainer;
