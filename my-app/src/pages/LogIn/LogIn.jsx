import { useState } from "react";
import styles from "./LogIn.module.css";
import { BsSpotify } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [step, setStep] = useState(1);
  const handleNext = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    }
  };

  return (
    <div className="maha_container">
      <div className={styles.main_container}>
        <div className={styles.container_bg}>
          <div className={styles.container}>
            <BsSpotify className={styles.logo} />
            <h1 className={styles.heading}>Log in to Spotify</h1>

            <form className={styles.form} onSubmit={handleNext}>
              {step >= 1 && (
                <>
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    required
                  />
                </>
              )}

              {step >= 2 && (
                <>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Example5%"
                    required
                  />
                </>
              )}

              <button type="submit" className={styles.next_btn}>
                {step < 3 ? "Continue" : "Log In"}
              </button>
            </form>

            <>
              <div className={styles.divider}>
                <hr />
                <span>or</span>
                <hr />
              </div>

              <div className={styles.social_buttons}>
                <button className={styles.google_btn}>
                  <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
                  Continue with Google
                </button>
                <button>
                  <FaGithub className={styles.git_btn} />
                  Continue with Github
                </button>
              </div>
            </>

            <p className={styles.login_link}>
              Don't have an Account? <Link to="/SignUp">SignUp here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
