import styles from "./Login.module.css";
import { useEffect, useState, useContext } from "react";
import useHttp from "../../hooks/use-http";
import { EMPTY_FIELDS } from "messages/login_messages";
import Loader from "components/Loader/Loader";
import { useRouter } from "next/router";
import AuthContext from "store/authContext";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("student");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + `/${type}/login`;
  const { data, loading, error, post } = useHttp();
  // useEffect(() => {
  //   console.log(authCtx.isLoggedIn);
  //   if (authCtx.isLoggedIn) {
  //     router.replace("/");
  //   }
  // }, []);
  // send the login request to the backend
  const processLogin = async () => {
    await post({
      url: url,
      body: { email, password },
    });
  };

  // validate the form fields
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      alert(EMPTY_FIELDS);
      return;
    }
    processLogin();
  };

  useEffect(() => {
    if (data) {
      if (data.status === 200) {
        authCtx.login(data.token, type, data.data);
      }
    }
  }, [data]);

  const loginAsGuestHandler = () => {
    authCtx.login("", "guest", "");
    router.push("/");
  };

  const page = (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <div className={styles["main-left"]}>
            <div className={styles["main-left-content"]}>
              <img
                className={styles["main-left-content-logo"]}
                src="images/login/logo.svg"
              ></img>
              <img
                className={styles["main-left-content-illustration"]}
                src="images/login/illustration.svg"
              ></img>
              <span className={styles["main-left-content-span"]}>
                Inventory Management <br></br> System
              </span>
            </div>
          </div>
          <div className={styles["main-right"]}>
            <div className={styles["main-right-content"]}>
              <span className={styles["main-right-content-heading"]}>
                Log In
              </span>
              <form className={styles["main-right-content-form"]}>
                <div className={styles["main-right-content-form-group"]}>
                  <label
                    className={styles["main-right-content-form-group-label"]}
                  >
                    Email Address
                  </label>
                  <input
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    className={styles["main-right-content-form-group-input"]}
                    type="email"
                    placeholder="Enter your email"
                  ></input>
                </div>
                <div className={styles["main-right-content-form-group"]}>
                  <label
                    className={styles["main-right-content-form-group-label"]}
                  >
                    Password
                  </label>
                  <input
                    onChange={(event) => setPassword(event.target.value)}
                    name="password"
                    className={styles["main-right-content-form-group-input"]}
                    type="password"
                    placeholder="Enter your password"
                  ></input>
                </div>
                <div className={styles["main-right-content-form-group2"]}>
                  <div
                    className={styles["main-right-content-form-group2-group"]}
                  >
                    <input
                      type="radio"
                      id="student"
                      name="type"
                      value="student"
                      defaultChecked
                      onClick={() => setType("student")}
                    />
                    <label htmlFor="student">Student</label>
                  </div>
                  {/* <div
                    className={styles["main-right-content-form-group2-group"]}
                  >
                    <input
                      type="radio"
                      id="faculty"
                      name="type"
                      value="faculty"
                      defaultChecked
                      onClick={() => setType("faculty")}
                    />
                    <label htmlFor="faculty">Faculty</label>
                  </div>
                  <div
                    className={styles["main-right-content-form-group2-group"]}
                  >
                    <input
                      type="radio"
                      id="admin"
                      name="type"
                      value="admin"
                      defaultChecked
                      onClick={() => setType("admin")}
                    />
                    <label htmlFor="admin">Admin</label>
                  </div> */}
                  <div
                    className={styles["main-right-content-form-group2-group"]}
                  >
                    <input
                      type="radio"
                      id="hod"
                      name="type"
                      value="hod"
                      onClick={() => setType("hod")}
                    />
                    <label htmlFor="hod">HOD</label>
                  </div>
                  <div
                    className={styles["main-right-content-form-group2-group"]}
                  >
                    <input
                      type="radio"
                      id="labstaff"
                      name="type"
                      value="labstaff"
                      onClick={() => setType("labstaff")}
                    />
                    <label htmlFor="labstaff">Lab Staff</label>
                  </div>
                </div>
                <button
                  onClick={onSubmitHandler}
                  className={styles["main-right-content-form-button"]}
                >
                  Sign In
                </button>
              </form>
              <div>
                <div className={styles["div-span-or"]}>
                  <span>or</span>
                </div>

                <button
                  className={styles["main-right-content-btn-guest"]}
                  onClick={loginAsGuestHandler}
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  return <>{page}</>;
};
export default Login;
