import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice.js";

export const store = configureStore({
    reducer: {
        posts: postReducer,
    },
});