import { useState } from "react";
import styles from "../pages/home.module.css";
import { FaBookmark } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddStory from "../components/AddStory/AddStory";
import Category from "../components/Category/Category";
import ShowStory from "../components/ShowStroy/ShowStory"
import ViewStories from "../components/ViewStory/ViewStory";
function SingedIn() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddStory, setAddStory] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
  const navigate = useNavigate();


  const handleSignOut = () => {
    setShowDropdown(false);
    localStorage.removeItem("token");
    navigate("/home");
  };

  const handleShowAddStory = () => {
    setAddStory(true);
  };

  

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 600);
    console.log(isMobileView);
  };

  window.addEventListener("resize", handleResize);

  return (<>
    <nav className={styles.navbar}>
      <div className={styles.navbar__left}>
        <h1>SwipTory
        </h1>
      </div>
      <div className={styles.navbar__right}>
        <>
          {!isMobileView && (
            <>
              <button className={styles.navbar__button_r}>
                <FaBookmark className={styles.navbar__icon_b} /> Bookmark
              </button>
              <button className={styles.navbar__button_r} onClick={handleShowAddStory}>
                Add Story
              </button>
              <img
                className={styles.navbar__avatar}
                src="https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg"
                alt="Avatar"
              />
            </>
          )}
          <div className={styles.dropdown}>
            <IoReorderThree
              className={styles.navbar__icon}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className={styles.dropdown__content}>
                {!isMobileView && <center><h4>{username}</h4></center>}
                <center>
                  {isMobileView && (
                    <>
                      <div className={styles.dropdown__content_t}>
                        <img
                          className={styles.navbar__avatar}
                          src="https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg"
                          alt="Avatar"
                        />{" "}
                        <h4>{username}</h4>
                      </div>

                      <button className={styles.navbar__button_r}>
                        <FaBookmark className={styles.navbar__icon_b} />{" "}
                        Bookmark
                      </button>
                      <button
                        className={styles.navbar__button_r}
                        onClick={handleShowAddStory}
                      >
                        Add Story
                      </button>
                    </>
                  )}
                  <button
                    className={styles.navbar__button_r}
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </center>
              </div>
            )}
          </div>{" "}
        </>
      </div>
      {showAddStory && <AddStory onClose={() =>{ setAddStory(false); navigate("/singedIn")}} />}
      
    </nav>
          <Category />
          <ShowStory />
          {/* <ViewStories /> */}
          </>
  );
}

export default SingedIn;
