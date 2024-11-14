import styles from "./Navbar.module.css";
import AuthContext from "store/authContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const lab_id = authCtx.details?.lab_id;

  const handleLogout = () => {
    authCtx.logout();
    router.replace("/login");
  };

  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbar-logo"]}>
        <Link href="/">
          <img src="/images/logo.svg" alt="logo" />
        </Link>
      </div>
      <div className={styles["navbar-main"]}>
        {authCtx.type === "labstaff" ? (
          <Link
            style={{ color: "white", textDecoration: "none" }}
            href={`/labs/${lab_id}`}
          >
            <div>Home</div>
          </Link>
        ) : (
          <Link style={{ color: "white", textDecoration: "none" }} href="/">
            <div>Home</div>
          </Link>
        )}

        {/* Update: Dashboard link for 'labstaff' and 'student' */}
        {authCtx.type === "labstaff" ? (
          <Link
            style={{ color: "white", textDecoration: "none" }}
            href="/labstaff/dashboard" // New path for labstaff dashboard
          >
            <div>Dashboard</div>
          </Link>
        ) : authCtx.type === "student" ? (
          <Link
            style={{ color: "white", textDecoration: "none" }}
            href="/student/dashboard"
          >
            <div>Dashboard</div>
          </Link>
        ) : (
          <div>Dashboard</div>
        )}
      </div>
      <div className={styles["navbar-profile"]}>
        <div>{authCtx.details?.name || "Guest"}</div>
        <div>|</div>
        <div className={styles["navbar-logout"]} onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;
