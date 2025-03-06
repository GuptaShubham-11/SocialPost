import { createSlice } from "@reduxjs/toolkit";

// Load posts from localStorage if available
const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

export const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: storedPosts, // Set initial state from localStorage
    },
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
            localStorage.setItem("posts", JSON.stringify(state.posts)); // Save updated posts
        },
        updatePost: (state, action) => {
            const { id, title, description, updateImage } = action.payload;
            const postToUpdate = state.posts.find((post) => post.id === id);
            if (postToUpdate) {
                postToUpdate.title = title;
                postToUpdate.description = description;
                postToUpdate.image = updateImage || postToUpdate.image;
                localStorage.setItem("posts", JSON.stringify(state.posts)); // Save updated posts
            }
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
            localStorage.setItem("posts", JSON.stringify(state.posts)); // Save updated posts
        },
    },
});

export const { addPost, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducer;
