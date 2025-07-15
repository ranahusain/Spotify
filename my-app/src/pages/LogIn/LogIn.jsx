import styles from "./LogIn.module.css";
import { BsSpotify } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const [step, setStep] = useState(1);
  const handleNext = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      submitForm(e);
    }
  };

  //LOGIN

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login/", {
        email,
        password,
      });
      console.log(res.data);
      if (res.data.success) {
        console.log("login Success");
        const loggedInUser = res.data.user.name;
        console.log(loggedInUser);
        localStorage.setItem("user", loggedInUser);
        localStorage.setItem("token", res.data.token);
        return navigate("/");
      } else {
        console.log("LogIn Failed");
      }
    } catch (error) {
      console.log(error);
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              )}

              <button type="submit" className={styles.next_btn}>
                {step < 2 ? "Continue" : "Log In"}
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
