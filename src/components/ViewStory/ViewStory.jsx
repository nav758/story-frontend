import React, { useEffect, useState } from "react";
import axios from "axios";
import Stories from "react-insta-stories";

const ViewStories = () => {
  const [storiesData, setStoriesData] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/story/all");
        const storiesData = response.data;
        setStoriesData(storiesData);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      }
    };
    fetchStories();
  }, []);

  // Transform the stories data into the format required by 'react-insta-stories'
  const transformedStories = storiesData.map(story => ({
    // Map each slide to the required format
    stories: story.slides.map(slide => ({
      url: slide.image, // Image URL
      seeMore: { title: slide.heading } // Title for 'See More' button
    }))
  }));

  return (
    <div>
      
      {transformedStories.map((story, index) => (
        <Stories key={index} stories={story.stories} />
      ))}
    </div>
  );
};

export default ViewStories;
