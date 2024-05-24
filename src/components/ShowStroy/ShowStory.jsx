import React, { useState, useEffect } from "react";
import styles from "./ShowStory.module.css";
import { getAllStories } from "../../apis/story";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function ShowStory({ setSelectedItemContext, refresh }) {
  const [stories, setStories] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // console.log("Fetching stories for category:", setSelectedItemContext);
        const { stories } = await getAllStories({ category: setSelectedItemContext });
        setStories(stories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStories();
  }, [setSelectedItemContext, refresh]);

  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyList}>
        {stories.length > 0 &&
          stories.slice(0, showMore ? stories.length : 4).map(
            ({ story, isEditable }, index) => (
              <div key={index} className={styles.storyItem}>
                {story.slides.length > 0 && (
                  <div className={styles.story}>
                    <img
                      src={story.slides[0].image}
                      alt={story.slides[0].heading}
                      className={styles.image}
                    />
                    <div className={styles.titles}>
                      <p className={styles.title}>{story.slides[0].heading}</p>
                      <p className={styles.description}>
                        {story.slides[0].description}
                      </p>
                      {isEditable && (
                        <button
                          onClick={() => {
                            navigate("/updateStory", {
                              state: {
                                StoryDetails: story,
                                edit: true,
                              },
                            });
                          }}
                          className={styles.editButton}
                        >
                          <TbEdit />
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
      </div>
      {stories.length > 4 && (
        <button
          className={styles.showMoreButton}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default ShowStory;
