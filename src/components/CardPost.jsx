import { Button } from ".";

export default function CardPost({ post }) {

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            {/* Image */}
            <div className="w-full h-48 bg-gray-200">
                <img
                    src={post?.image || "/default.jpg"}
                    alt={post?.title || "Post"}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {post.title}
                </h2>

                <Button
                    text="View Post"
                />
            </div>
        </div>
    );
}
