import styles from "./LogIn.module.css";
import { BsSpotify } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../../supabaseClient";

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

  // Add this useEffect for Google OAuth callback handling
  useEffect(() => {
    const checkGoogleLogin = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (user && session) {
        // Construct a user object similar to backend
        const loggedInUser = {
          _id: user.id, // Supabase user id
          name:
            user.user_metadata.name ||
            user.email?.split("@")[0] ||
            "Google User",
          email: user.email,
          role: "user", // Default role
          createdAt: user.created_at,
        };
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("token", session.access_token);
        navigate("/");
      }
    };
    checkGoogleLogin();

    // Listen for Supabase auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const user = session.user;
          const loggedInUser = {
            _id: user.id,
            name:
              user.user_metadata?.name ||
              user.email?.split("@")[0] ||
              "Google User",
            email: user.email,
            role: "user",
            createdAt: user.created_at,
          };
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          localStorage.setItem("token", session.access_token);
          navigate("/");
        }
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

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
        const loggedInUser = res.data.user;
        console.log(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("token", res.data.token);
        return navigate("/");
      } else {
        console.log("LogIn Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      alert("Google sign-in error: " + error.message);
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
                <button
                  className={styles.google_btn}
                  onClick={handleGoogleSignIn}
                >
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
