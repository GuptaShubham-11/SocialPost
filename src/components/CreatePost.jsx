import { useState, useRef } from "react";
import { Button } from ".";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addPost } from "../features/postSlice.js";

export default function CreatePost({ setIsCreatePost }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const imageRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description) return;

        const newPost = { id: nanoid(), ...formData, image };
        dispatch(addPost(newPost));


        setFormData({ title: "", description: "" });
        setImage(null);

        if (imageRef.current) {
            imageRef.current.value = "";
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 mx-auto w-full max-w-xl border border-gray-300 rounded-lg bg-white shadow-lg"
        >
            <h2 className="text-2xl sm:text-3xl text-center font-bold text-gray-700 mb-4">
                Create Post
            </h2>

            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title.."
                    className="outline-none border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500"
                    required
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description.."
                    className="outline-none border border-gray-300 rounded-md p-3 w-full h-24 resize-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="file"
                    ref={imageRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border border-gray-300 rounded-md p-3 w-full cursor-pointer focus:ring-2 focus:ring-blue-500"
                    required
                />

                {image && (
                    <img
                        src={image}
                        alt="Preview"
                        className="mt-3 w-full max-h-40 object-cover rounded-md border"
                    />
                )}

                <Button type="submit" text="Submit" className="w-full mt-2" />
            </div>

            <div className="flex justify-end">
                <Button
                    type="button"
                    text="Cancel"
                    className="bg-red-500 hover:bg-red-700 mt-2"
                    onClick={() => setIsCreatePost((prev) => !prev)}
                />
            </div>
        </form>
    );
}
