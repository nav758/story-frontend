import React, { useState } from "react";
import styles from "./AddStory.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { DEFAULT_CATEGORY } from "../../utils/constant";
import { createStory, updateStoryById } from "../../apis/story"; // Updated import
import { useLocation, useNavigate } from "react-router-dom";

function AddStory({ onClose }) {
  const { state } = useLocation();
  const [stateData] = useState(state?.StoryDetails || {}); // Corrected naming

  const initialSlides = stateData.slides // Corrected property name
    ? stateData.slides.map((slide) => ({
        // Corrected property name
        heading: slide.heading,
        description: slide.description,
        image: slide.image,
        category: slide.category,
      }))
    : [
        { heading: "", description: "", image: "", category: "" },
        { heading: "", description: "", image: "", category: "" },
        { heading: "", description: "", image: "", category: "" },
      ];

  const [slides, setSlides] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);
  const navigate = useNavigate();

  const handleAddSlide = () => {
    console.log("handleAddSlide called");
    if (slides.length < 6) {
      console.log("Slides length less than 6");
      const newSlide = {
        heading: slides[slides.length - 1].heading,
        description: slides[slides.length - 1].description,
        image: slides[slides.length - 1].image,
        category: slides[0].category,
      };
      console.log("New slide:", newSlide);
      setSlides([...slides, newSlide]);
      setCurrentSlide(slides.length);
      console.log("New slides:", slides);
    }
    console.log("handleAddSlide completed");
  };

  const handleRemoveSlide = (index) => {
    if (slides.length > 3) {
      const updatedSlides = slides.filter((_, i) => i !== index);
      setSlides(updatedSlides);
      if (currentSlide >= updatedSlides.length)
        setCurrentSlide(updatedSlides.length - 1);
    }
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedSlides = [...slides];
    updatedSlides[index][name] = value;
    setSlides(updatedSlides);
  };

  const addCategory = (event) => {
    const { value } = event.target;
    const updatedSlides = slides.map((slide) => ({
      ...slide,
      category: value,
    }));
    setSlides(updatedSlides);
  };

  const handleSubmit = async () => {
    const isAnyFieldEmpty = slides.some(
      (slide) =>
        slide.heading.trim() === "" ||
        slide.description.trim() === "" ||
        slide.image.trim() === "" ||
        slide.category.trim() === ""
    );

    if (isAnyFieldEmpty) {
      alert("Fill all fields");
      return;
    }

    if (state?.edit) {
      // Check if it's an edit
      const userId = localStorage.getItem("userId");
      await updateStoryById(stateData._id, { slides }, userId); // Updated function call
      navigate("/singedIn");
    } else {
      await createStory(slides);
      onClose();
      navigate("/singedIn"); 
    }
  };

  const handleSlideClick = (index) => {
    setCurrentSlide(index);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 600);
  };

  window.addEventListener("resize", handleResize);

  return (
    <div className={`${styles.popup} ${styles.show}`}>
      <div
        className={`${styles.container} ${isMobileView && styles.mobileView}`}
      >
        {isMobileView && <h2>Add story to feed</h2>}
        <div className={styles.mViwe}>
          <div className={styles.slides}>
            {slides.map((slide, index) => (
              <div
                className={`${styles.slide} ${
                  index === currentSlide ? styles.active : ""
                }`}
                key={index}
                onClick={() => handleSlideClick(index)}
              >
                <h6>
                  Slide {index + 1}{" "}
                  {slides.length > 3 && index >= 3 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSlide(index)}
                      className={styles.popup_button_cancel}
                    >
                      <IoIosCloseCircleOutline />
                    </button>
                  )}
                </h6>
              </div>
            ))}
            {slides.length < 6 && (
              <>
                <button className={styles.Addslide} onClick={handleAddSlide}>
                  <h5>Add Slide</h5>
                </button>
                {!isMobileView && (
                  <h6 className={styles.info1}>Add up to 6 slides</h6>
                )}
              </>
            )}
          </div>
          <form>
            <div className={styles.formGroup}>
              <label>Heading: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input
                type="text"
                id="heading"
                name="heading"
                value={slides[currentSlide]?.heading}
                onChange={(e) => handleInputChange(e, currentSlide)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Description:&nbsp;</label>
              <textarea
                id="description"
                name="description"
                value={slides[currentSlide]?.description}
                onChange={(e) => handleInputChange(e, currentSlide)}
              ></textarea>
            </div>
            <div className={styles.formGroup}>
              <label>
                Image: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={slides[currentSlide]?.image}
                onChange={(e) => handleInputChange(e, currentSlide)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>
                Category: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <select
                className={styles.select}
                type="text"
                name="category"
                value={slides[currentSlide]?.category}
                onChange={(e) => addCategory(e)}
              >
                <option disabled selected="">
                  Please select Category
                </option>
                {DEFAULT_CATEGORY.map((element, index) => (
                  <option key={index} value={element}>
                    {element}
                  </option>
                ))}
              </select>
              {!isMobileView && (
                <h6 className={styles.info2}>
                  This field will be common for all slides
                </h6>
              )}
            </div>
          </form>
          <div className={styles.controls}>
            {!isMobileView && (
              <button
                className={styles.previousButtonContainer}
                onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
                disabled={currentSlide === 0}
              >
                Previous
              </button>
            )}
            {!isMobileView && (
              <button
                className={styles.nextButtonContainer}
                onClick={() =>
                  setCurrentSlide((prev) =>
                    Math.min(prev + 1, slides.length - 1)
                  )
                }
                disabled={currentSlide === slides.length - 1}
              >
                Next
              </button>
            )}
            <button
              className={styles.postButtonContainer}
              onClick={handleSubmit}
            >
              {state?.edit ? "Update" : "Post"}{" "}
              {/* Update button text based on whether it's an edit or not */}
            </button>
          </div>
          <button className={styles.close} onClick={onClose}>
            <IoIosCloseCircleOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStory;
