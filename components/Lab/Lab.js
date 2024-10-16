import Link from "next/link";
import styles from "./Lab.module.css";

const Lab = (props) => {
  console.log("Labs: " + props.lab);
  const { labName, location, lab_id, name, email, mobile } = props.lab;
  return (
    <div className={styles.main}>
      <div className={styles["main-header"]}></div>
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>{labName}</div>
        <div className={styles["main-content-subheading"]}>{name}</div>
        <div className={styles["main-details"]}>
          <div className={styles["main-details-item"]}>
            <div className={styles["main-details-item-img"]}>
              <img src="/images/phone.svg" alt="phone" />
            </div>
            <div className={styles["main-details-item-text"]}>{mobile}</div>
          </div>
          <div className={styles["main-details-item"]}>
            <div className={styles["main-details-item-img"]}>
              <img src="/images/mail.svg" alt="mail" />
            </div>
            <div className={styles["main-details-item-text"]}>{email}</div>
          </div>
          <div className={styles["main-details-item"]}>
            <div className={styles["main-details-item-img"]}>
              <img src="/images/map-pin.svg" alt="map-pin" />
            </div>
            <div className={styles["main-details-item-text"]}>{location}</div>
          </div>
        </div>
        <div className={styles["main-footer"]}>
          <Link href={`/labs/${lab_id}`}>
            <button className={styles["main-footer-button"]}>View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lab;