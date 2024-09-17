import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext({
  isAuthenticated: false,
  token: "",
  type: "",
  details: null,
  login: (token, type, data) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [type, setType] = useState("");
  const [details, setDetails] = useState(null);

  const login = (token, type, data) => {
    if (type === "guest") {
      localStorage.setItem("type", type);
      setIsAuthenticated(true);
      setType(type);
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("type", type);
    localStorage.setItem("details", JSON.stringify(data));
    setIsAuthenticated(true);
    setType(type);
    setToken(token);
    setDetails(data);
    const prevPath = localStorage.getItem("prevPath");
    // if (prevPath) {
    //   localStorage.removeItem("prevPath");
    //   router.replace(prevPath, prevPath);
    // } else {
      router.replace("/");
    // }
  };

  const logout = () => {
    if (type === "guest") {
      localStorage.removeItem("type");
      setIsAuthenticated(false);
      setType("");
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("details");
    localStorage.removeItem("prevPath");
    setIsAuthenticated(false);
    setType("");
    setToken("");
    setDetails(null);
    router.replace("/login");
  };

  useEffect(() => {
    const type = localStorage.getItem("type");
    if (type === "guest") {
      setType(type);
      return;
    }
    const token = localStorage.getItem("token");
    const details = JSON.parse(localStorage.getItem("details"));
    if (token && type && details) {
      login(token, type, details);
    } else {
      console.log("logout");
      logout();
    }
  }, []);

  useEffect(() => {
    // if (router.pathname !== "/login") {
    //   localStorage.setItem("prevPath", router.asPath);
    // }
  }, [router.pathname]);

  const contextValue = {
    isAuthenticated: isAuthenticated,
    token: token,
    type: type,
    login: login,
    logout: logout,
    details: details,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
