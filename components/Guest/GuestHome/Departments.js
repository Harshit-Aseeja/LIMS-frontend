import styles from "./Departments.module.css";
import { useEffect, useContext } from "react";
import useHttp from "../../../hooks/use-http";
import Department from "./Department";
import AuthContext from "../../../store/authContext";

const Departments = (props) => {
  console.log("departments loaded");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/departments";
  const authCtx = useContext(AuthContext);
  const { data, loading, error, get } = useHttp();

  console.log(data);

  useEffect(() => {
    const makeRequest = async () => {
      await get({
        url: url,
        headers: {
          authorization: authCtx.token,
        },
      });
    };
    makeRequest();
  }, []);

  useEffect(() => {
    if (data) {
      if (data.status !== 200) alert(error);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(error);
      authCtx.logout();
    }
  }, [error]);

  return (
    <div className={styles.main}>
      {!error &&
        !loading &&
        data &&
        data.data?.map((department, index) => {
          return <Department key={index} department={department} />;
        })}
    </div>
    //   <div className={styles["main"]}>
    //   <Navbar></Navbar>
    //   <div className={styles["main-content"]}>
    //     <div className={styles["main-content-heading"]}>Departments</div>
    //     <Departments></Departments>
    //     {/* {!error && data && <Labs data={data.labs} />} */}
    //   </div>
    // </div>
  );
};

export default Departments;
