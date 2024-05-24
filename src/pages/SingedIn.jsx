import { useState, useContext, useEffect } from "react";
import styles from "../pages/home.module.css";
import { FaBookmark } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddStory from "../components/AddStory/AddStory";
import Category from "../components/Category/Category";
import ShowStory from "../components/ShowStroy/ShowStory";
import { UserContext, SelectedItemContext } from "../utils/UserContext";

function SingedIn() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddStory, setShowAddStory] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
  const [refreshStories, setRefreshStories] = useState(false); // State to trigger re-render
  const navigate = useNavigate();
  const { selectedItem } = useContext(SelectedItemContext);
  const { username } = useContext(UserContext);

  const handleSignOut = () => {
    setShowDropdown(false);
    localStorage.removeItem("token");
    navigate("/home");
  };

  const handleShowAddStory = () => {
    setShowAddStory(true);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 600);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddStoryClose = () => {
    setShowAddStory(false);
    setRefreshStories((prev) => !prev); // Toggle refreshStories to trigger re-render
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar__left}>
          <h1>SwipTory</h1>
        </div>
        <div className={styles.navbar__right}>
          {!isMobileView && (
            <>
              <button className={styles.navbar__button_r}>
                <FaBookmark className={styles.navbar__icon_b} /> Bookmark
              </button>
              <button
                className={styles.navbar__button_r}
                onClick={handleShowAddStory}
              >
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
                {!isMobileView && (
                  <center>
                    <h4>{username}!</h4>
                  </center>
                )}
                <center>
                  {isMobileView && (
                    <>
                      <div className={styles.dropdown__content_t}>
                        <img
                          className={styles.navbar__avatar}
                          src="https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg"
                          alt="Avatar"
                        />
                        <h4>{username}</h4>
                      </div>
                      <button className={styles.navbar__button_r}>
                        <FaBookmark className={styles.navbar__icon_b} /> Bookmark
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
          </div>
        </div>
      </nav>
      {showAddStory && <AddStory onClose={handleAddStoryClose} />}
      <Category />
      <div>
        {["", "Food", "Health and Fitness", "Movie", "Travel", "Education"].map(
          (category) => (
            <div
              key={category}
              style={{
                display:
                  !selectedItem || selectedItem === category ? "block" : "none",
              }}
            >
              {<h1>{category === "" ? "All" : category}</h1>}
              <ShowStory setSelectedItemContext={category} refresh={refreshStories} />
            </div>
          )
        )}
      </div>
    </>
  );
}

export default SingedIn;
