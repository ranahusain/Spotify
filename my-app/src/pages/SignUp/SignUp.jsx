import { useState } from "react";
import styles from "./SignUp.module.css";
import { BsSpotify } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <BsSpotify className={styles.logo} />
        <h1>
          Sign up to <br />
          start listening
        </h1>

        <form className={styles.form} onSubmit={handleNext}>
          {step >= 1 && (
            <>
              <label>Name</label>
              <input type="text" name="name" placeholder="John Doe" required />
            </>
          )}

          {step >= 2 && (
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

          {step >= 3 && (
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
            {step < 3 ? "Next" : "Sign Up"}
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
              Sign up with Google
            </button>
            <button>
              <FaGithub className={styles.git_btn} />
              Sign up with Github
            </button>
          </div>
        </>

        <p className={styles.login_link}>
          Already have an account? <a href="#">Log in here</a>.
        </p>

        <footer>
          <p>
            This site is protected by reCAPTCHA and the Google
            <br />
            <a href="#">Privacy Policy</a> and
            <a href="#">Terms of Service</a> apply.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
