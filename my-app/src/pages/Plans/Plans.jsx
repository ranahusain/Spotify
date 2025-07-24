import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Plans.module.css";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import Payment from "../../pages/Payment/Payment";
import { useEffect } from "react";

const Plans = () => {
  const [showPayment, setShowPayment] = useState(false);

  const handleOpenPayment = () => {
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  useEffect(() => {
    if (showPayment) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPayment]);

  return (
    <>
      <Navbar />

      <div className={styles.heading}>
        <h1>Experience the difference</h1>
        <p>
          Go Premium and enjoy full control of your listening. Cancel anytime.
        </p>
        <div className={styles.cards}>
          <img
            src="https://img.icons8.com/color/48/000000/visa.png"
            alt="Visa"
          />
          <img
            src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
            alt="MasterCard"
          />
          <img
            src="https://img.icons8.com/color/48/000000/amex.png"
            alt="American Express"
          />
          <img
            src="https://img.icons8.com/color/48/000000/discover.png"
            alt="Discover"
          />
        </div>
      </div>

      <div className={styles.container}>
        {/* Individual Plan */}
        <div className={`${styles.card} ${styles.individual}`}>
          <h2>Individual</h2>
          <p className={styles.price}>Rs 349 / month</p>
          <ul className={styles.features}>
            <li>1 Premium account</li>
            <li>Subscription remains</li>
            <li>Cancel anytime</li>
            <li>Subscribe or one-time payment</li>
          </ul>
          <button className={styles.primary} onClick={handleOpenPayment}>
            Try 1 month for Rs 0
          </button>
          <button className={styles.secondary} onClick={handleOpenPayment}>
            One-time payment
          </button>
          <p className={styles.note}>
            Rs 0 for 1 month, then Rs 349 per month after.{" "}
            <a href="#">Terms apply</a>.
          </p>
        </div>

        {/* Other Plans (repeat button logic) */}
        <div className={`${styles.card} ${styles.student}`}>
          <h2>Student</h2>
          <p className={styles.price}>Rs 175 / month</p>
          <ul className={styles.features}>
            <li>1 verified Premium account</li>
            <li>Discount for eligible students</li>
            <li>Cancel anytime</li>
            <li>Subscribe or one-time payment</li>
          </ul>
          <button className={styles.primary} onClick={handleOpenPayment}>
            Try 1 month for Rs 0
          </button>
          <button className={styles.secondary} onClick={handleOpenPayment}>
            One-time payment
          </button>
        </div>

        <div className={`${styles.card} ${styles.duo}`}>
          <h2>Duo</h2>
          <p className={styles.price}>Rs 449 / month</p>
          <ul className={styles.features}>
            <li>2 Premium accounts</li>
            <li>Cancel anytime</li>
            <li>Subscribe or one-time payment</li>
          </ul>
          <button className={styles.primaryYellow} onClick={handleOpenPayment}>
            Get Premium Duo
          </button>
          <button className={styles.secondary} onClick={handleOpenPayment}>
            One-time payment
          </button>
        </div>

        <div className={`${styles.card} ${styles.family}`}>
          <h2>Family</h2>
          <p className={styles.price}>Rs 579 / month</p>
          <ul className={styles.features}>
            <li>Up to 6 Premium accounts</li>
            <li>Control explicit content</li>
            <li>Cancel anytime</li>
            <li>Subscribe or one-time payment</li>
          </ul>
          <button className={styles.primaryBlue} onClick={handleOpenPayment}>
            Get Premium Family
          </button>
          <button className={styles.secondary} onClick={handleOpenPayment}>
            One-time payment
          </button>
          <p className={styles.note}>
            agni dolore consequatur repellat modi. Repellendus, saepe quisquam!
            <a href="#">Terms apply</a>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <hr
        style={{
          width: "90%",
          margin: "auto",
          backgroundColor: "#2c2c2c",
          border: "none",
          height: "1px",
        }}
      />
      <div className={styles.main_img_cards}>
        {/* Footer Cards */}
        <div className={styles.img_cards}>
          <h3>Company</h3>
          <p>About</p>
          <p>Jobs</p>
          <p>For the Record</p>
        </div>
        <div className={styles.img_cards}>
          <h3>Communities</h3>
          <p>For Artist</p>
          <p>Developers</p>
          <p>Advertising</p>
          <p>Investors</p>
          <p>Vendors</p>
        </div>
        <div className={styles.img_cards}>
          <h3>Spotify Plan</h3>
          <p>Premium Individual</p>
          <p>Premium Duo</p>
          <p>Premium Family</p>
          <p>Premium Student</p>
          <p>Free</p>
        </div>
        <div className={styles.img_cards}>
          <h3>Useful Link</h3>
          <p>Support</p>
          <p>Free Mobile App</p>
          <p>Popular by country</p>
        </div>
        <div className={styles.img_cards_icons}>
          <FaInstagram className={styles.icon_footer} />
          <FaTwitter className={styles.icon_footer} />
          <FaFacebook className={styles.icon_footer} />
        </div>
      </div>

      <hr
        style={{
          width: "90%",
          margin: "auto",
          backgroundColor: "#2c2c2c",
          border: "none",
          height: "1px",
        }}
      />
      <p
        style={{
          color: "#b3b3b3",
          margin: "60px 0 60px 300px",
          fontSize: "14px",
        }}
      >
        &copy; 2025 Spotify AB
      </p>

      {/* Modal Overlay */}
      {showPayment && (
        <div className={styles.modalOverlay} onClick={handleClosePayment}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Payment />
            <button onClick={handleClosePayment} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Plans;
