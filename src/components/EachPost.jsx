import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "../features/postSlice";
import Button from "./Button";

export default function EachPost({ post, setIsViewPost }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedPost, setUpdatedPost] = useState({
        title: post.title,
        description: post.description,
    });
    const [newUpdatePost, setNewUpdatePost] = useState({ ...post });
    const [updateImage, setUpdateImage] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
    };

    // Handle image changes
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setUpdateImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Handle post update
    const handleUpdate = () => {
        dispatch(updatePost({ id: post.id, ...updatedPost, updateImage }));
        setNewUpdatePost(updatedPost);
        setIsEditing(false);
    };

    // Handle delete post
    const handleDelete = () => {
        dispatch(deletePost(post.id));
        setIsViewPost(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Image */}
                <div className="w-full h-60 bg-gray-200 rounded-md overflow-hidden mb-4">
                    <img
                        src={updateImage || post?.image || "/default.jpg"}
                        alt={post?.title || "Post"}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content - View or Edit Mode */}
                {isEditing ? (
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="title"
                            value={updatedPost.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded p-2"
                        />
                        <textarea
                            name="description"
                            value={updatedPost.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2 h-32 resize-none"
                        />
                    </div>
                ) : (
                    <div className="max-h-48 overflow-y-auto p-2 border rounded">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{newUpdatePost?.title}</h2>
                        <p className="text-gray-600">{newUpdatePost?.description}</p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                    <Button
                        text="Back"
                        onClick={() => setIsViewPost(false)}
                        className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    />
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <Button
                                    text="Save"
                                    onClick={handleUpdate}
                                    className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                                />
                                <Button
                                    text="Cancel"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                                />
                            </>
                        ) : (
                            <Button
                                text="Edit"
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            />
                        )}
                        <Button
                            text="Delete"
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
