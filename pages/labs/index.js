import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useHttp from "hooks/use-http";
import Labs from "components/Labs/Labs";
import styles from "./index.module.css";
import AuthContext from "store/authContext";
import Navbar from "components/Navbar/Navbar";
import GuestNavbar from "components/Guest/Navbar/GuestNavbar";
function index(props) {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const id = router.query.id;
  const { data, loading, error, get } = useHttp();
  useEffect(() => {
    const makeRequest = async () => {
      await get({
        url: process.env.NEXT_PUBLIC_BACKEND_URL + `/api/labs/${id}`,
      });
    };
    if (id) makeRequest();
  }, [id]);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data.status !== 200) alert(error);
    }
  }, [data]);

  // return <Labs data={data && data.labs} />;
  return (
    <div className={styles["main"]}>
      {authCtx.type === "student" && <Navbar />}
      {authCtx.type === "guest" && <GuestNavbar />}
      <div className={styles["main-content"]}>
        <div className={styles["main-content-heading"]}>
          {/* Department: {authCtx.details.dept} */}
        </div>
        {!error && data && <Labs data={data.labs} />}
      </div>
    </div>
  );
}

export default index;
