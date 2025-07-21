import styles from "./SignUp.module.css";
import { BsSpotify } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [step, setStep] = useState(1);
  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      submitForm(e);
    }
  };

  //signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/signup/",
        newUser
      );

      if (res.data.success) {
        if (res.data.token) {
          const loggedInUser = res.data.user;
          console.log(loggedInUser);
          // localStorage.setItem("user", loggedInUser);
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          localStorage.setItem("token", res.data.token);
          return navigate("/");
        }
      } else {
        console.log("SignUp failed");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="maha_container">
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
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            Already have an account? <Link to="/LogIn">Log in here</Link>
          </p>

          <footer>
            <p>
              This site is protected by reCAPTCHA and the Google
              <br />
              <Link to="#">Privacy Policy</Link> and
              <Link to="#">Terms of Service</Link> apply.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
