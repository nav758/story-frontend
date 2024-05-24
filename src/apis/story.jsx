import axios from "axios";
import { Navigate } from "react-router-dom";
const backendUrl = `https://story-backend-rho.vercel.app/api/v1`;

export const createStory = async (slides) => {
    try {
        console.log(slides);
        const reqUrl = `${backendUrl}/story/stories`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, {slides});
        console.log(response.data);
    } catch (error) {
        if (error.isTokenExpired) {
            localStorage.clear();
            Navigate("/home");
        }
        console.log(error);
    }
};



export const getAllStories = async (filter) => {
    try {
        // console.log("Filter:", filter); // Check the filter object
        const category = filter?.category || "";
        // console.log("Category:", category); // Check the category value
        const reqUrl = `${backendUrl}/Story/all?category=${category}`;
        // console.log("Request URL:", reqUrl); // Log the constructed URL
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        // console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



export const getStoryById = async (StoryId) => {
    try {
    const reqUrl = `${backendUrl}/Story/story-details//${StoryId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};



export const updateStoryById = async (storyId, updatedFormData, userId) => {
    try {
        const reqUrl = `${backendUrl}/story/update/${storyId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, {
            ...updatedFormData, 
            userId,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};