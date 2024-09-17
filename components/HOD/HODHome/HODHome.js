import Navbar from "components/Navbar/Navbar";
import useHttp from "hooks/use-http";
import styles from "./HODHome.module.css";
import Labs from "components/Labs/Labs";
import { useContext, useEffect } from "react";
import Loader from "components/Loader/Loader";
import AuthContext from "store/authContext";
const HODHome = () => {
  const authCtx = useContext(AuthContext);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/hod/labs";
  const { data, loading, error, get } = useHttp();
  useEffect(() => {
    const makeRequest = async () => {
      await get({
        url: url,
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
    };
    makeRequest();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className={styles["main"]}>
      <Navbar></Navbar>
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>
          Department: {authCtx.details.dept}
        </div>
        {!error && data && <Labs data={data.labs} />}
      </div>
    </div>
  );
};

export default HODHome;
