import { useContext } from "react";
import { useRouter } from "next/router";
import HODHome from "components/HOD/HODHome/HODHome";
import LabStaffHome from "components/LabStaff/LabStaffHome/LabStaffHome";
import styles from "./styles/home.module.css";
import AuthContext from "store/authContext";
import Error from "components/ErrorPage/Error";
import GuestHome from "components/Guest/GuestHome/GuestHome";
import StudentHome from "components/Student/StudentHome/StudentHome";
import AdminHome from "components/Admin/AdminHome/AdminHome";
const Home = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const page = (
    <div className={styles["main"]}>
      {authCtx.type === "hod" ? (
        <HODHome />
      ) : authCtx.type === "student" ? (
        <StudentHome />
      ) : authCtx.type === "labstaff" ? (
        <LabStaffHome />
      ) : authCtx.type === "guest" ? (
        <GuestHome />
      ) : authCtx.type === "admin" ? (
        <AdminHome />
      ) : (
        <Error />
      )}
    </div>
  );

  return page;
};

export default Home;
