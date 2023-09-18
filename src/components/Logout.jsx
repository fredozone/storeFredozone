import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout({ setAuth, setToken, setCountProduct }) {
  const naviagte = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setCountProduct("");
    setAuth(false);
    setToken("");
    naviagte("/login");
  }, [naviagte, setAuth, setToken]);
  return <></>;
}

export default Logout;
