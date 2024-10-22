import styles from "./Navbar.module.css";
import AuthContext from "store/authContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import Link from "next/link";
const GuestNavbar = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-logo"]}>
        <Link href="/">
          <img src="/images/logo.svg" alt="logo" />
        </Link>
      </div>
      <div className={styles["navbar-profile"]}>
        <div>Guest</div>
      </div>
    </div>
  );
};

export default GuestNavbar;
