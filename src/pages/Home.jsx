import { useState } from "react";
import { Button, CardPost, CreatePost, EachPost } from "../components";
import { useSelector } from "react-redux";

export default function Home() {
    const posts = useSelector((state) => state.posts).posts;
    const [isCreatePost, setIsCreatePost] = useState(false);
    const [isViewPost, setIsViewPost] = useState(false);
    const [post, setPost] = useState(null);

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Home</h1>
                <Button
                    text="Create Post"
                    onClick={() => setIsCreatePost(true)}
                    className="ml-auto bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                />
            </div>

            {/* No Posts Message */}
            {posts.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">No posts available. Create one!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {posts.map((postItem) => (
                        <div key={postItem.id} onClick={() => { setIsViewPost(true); setPost(postItem); }}>
                            <CardPost post={postItem} />
                        </div>
                    ))}
                </div>
            )}

            {/* Create Post Modal */}
            {isCreatePost && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                    <CreatePost setIsCreatePost={setIsCreatePost} />
                </div>
            )}

            {/* View Post Modal */}
            {isViewPost && post && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                    <EachPost post={post} setIsViewPost={setIsViewPost} />
                </div>
            )}
        </div>
    );
}
