import { useState } from "react";
import styles from "../pages/home.module.css";
import { IoReorderThree } from "react-icons/io5";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Category from "../components/Category/Category";
import ShowStory from "../components/ShowStroy/ShowStory"
import ViewStories from "../components/ViewStory/ViewStory";
function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleResize = () => {
    setIsMobileView(window.innerWidth < 600);
 
  };
  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };
  window.addEventListener("resize", handleResize);
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar__left}>
          <h1>SwipTory</h1>
        </div>
        <div className={styles.navbar__right}>
          {!isMobileView && (
            <>
              <button
                onClick={handleShowRegister}
                className={styles.navbar__button_r}
              >
                Register Now
              </button>
              <button
                onClick={handleShowLogin}
                className={styles.navbar__button_s}
              >
                Sign In
              </button>
            </>
          )}
          {isMobileView && (
            <>
              <IoReorderThree
                className={styles.navbar__icon}
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <>
                  <div className={styles.dropdown__content}>
                    <center>
                      <button
                        onClick={handleShowRegister}
                        className={styles.navbar__button_r}
                      >
                        Register Now
                      </button>
                      <button
                        onClick={handleShowLogin}
                        className={styles.navbar__button_s}
                      >
                        Sign In
                      </button>
                    </center>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {showRegister && <Register onClose={() => setShowRegister(false)} />}
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </nav>
      <Category />
      <ShowStory />
      {/* <ViewStories /> */}
    </>
  );
}

export default Home;
