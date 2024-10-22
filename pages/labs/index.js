import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useHttp from "hooks/use-http";
import Labs from "components/Labs/Labs";
import styles from "./index.module.css";
import Navbar from "../../components/Guest/Navbar/Navbar";
function index(props) {
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
      <Navbar></Navbar>
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
