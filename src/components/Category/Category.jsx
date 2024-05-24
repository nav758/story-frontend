import React, { useContext } from "react";
import styles from "./Category.module.css";
import All from "../../assets/Image/News.png";
import food from "../../assets/Image/Food.png";
import Medical from "../../assets/Image/Medical.png";
import Movie from "../../assets/Image/Movie.jpg";
import Travle from "../../assets/Image/Travle.jpg";
import Education from "../../assets/Image/World.png";
import {SelectedItemContext} from "../../utils/UserContext"
function Category() {
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

 return (
    <div className={styles.horizontalScrollContainer}>
      <div
        className={
          selectedItem === All
            ? `${styles.imageContainer} ${styles.selected}`
            : styles.imageContainer
        }
        onClick={() => setSelectedItem("")}
      >
        <div className={styles.cardOverlay}></div>
        <h3 className={styles.title}>All</h3>
        <img src={All} alt="All" className={styles.image} />
      </div>
      <div
        className={
          selectedItem === food
            ? `${styles.imageContainer} ${styles.selected}`
            : styles.imageContainer
        }
        onClick={() => setSelectedItem("Food")}
      >
        {" "}
        <div className={styles.cardOverlay}></div>
        <h3 className={styles.title}>Food</h3>
        <img src={food} alt="Food" className={styles.image} />
      </div>
      <div
        className={
          selectedItem === 3
            ? `${styles.imageContainer} ${styles.selected}`
            : styles.imageContainer
        }
        onClick={() => setSelectedItem("Health and Fitness")}
      >
        {" "}
        <div className={styles.cardOverlay}></div>
        <h3 className={styles.title}>Health and Fitness</h3>
        <img src={Medical} alt="Medical" className={styles.image} />
      </div>
      <div
        className={
          selectedItem === 4
            ? `${styles.imageContainer} ${styles.selected}`
            : styles.imageContainer
        }
        onClick={() => setSelectedItem("Movie")}
      >
        {" "}
        <div className={styles.cardOverlay}></div>
        <h3 className={styles.title}>Movie</h3>
        <img src={Movie} alt="Movie" className={styles.image} />
      </div>
      <div
        className={
          selectedItem === 5
            ? `${styles.imageContainer} ${styles.selected}`
            : styles.imageContainer
        }
        onClick={() => setSelectedItem("Travel")}
      >
        {" "}
        <div className={styles.cardOverlay}></div>
        <h3 className={styles.title}>Travel</h3>
        <img src={Travle} alt="Travel" className={styles.image} />
      </div>
      <div
        className={
          selectedItem === 6
            ? `${styles.imageContainer} ${styles.selected}`
            : styles.imageContainer
        }
        onClick={() => setSelectedItem("Education")}
      >
        {" "}
        <div className={styles.cardOverlay}></div>
        <h3 className={styles.title}>Education</h3>
        <img src={Education} alt="Education" className={styles.image} />
      </div>
    </div>
  );
}

export default Category;
