import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import BlogComment from "./blogComment";

function BlogCommentMain({ paramId }) {
    const { authToken } = useContext(AuthContext);
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${paramId}/comments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setComments(data);
                } else {
                    console.error("Error fetching comments");
                    console.error(data);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        }

        fetchComments();
    }, [commentCount]);

    async function handleCommentSubmit(e) {
        e.preventDefault();
        try {_
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${paramId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ commentText }),
            });

            if (response.ok) {
                setCommentText("");
                setCommentCount((prev) => prev + 1);
            } else {
                console.error("Error submitting comment");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }

    return (
        <section>
            <div className="max-w-3xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Comments</h2>
                <div className="comment-form mb-8">
                    <form onSubmit={handleCommentSubmit}>
                        <div className="space-y-4">
                            <label
                                htmlFor="commentText"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Leave a Comment:
                            </label>
                            <textarea
                                id="commentText"
                                name="commentText"
                                rows="4"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                disabled={!authToken}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder={authToken ? "Write your comment here..." : "Please login to leave a comment"}
                                required
                            ></textarea>
                            <button
                                type="submit"
                                disabled={!authToken || commentText.trim().length === 0}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="comments-list space-y-6">
                    {comments.map((comment) => (
                        <BlogComment key={comment._id} data={comment} paramId={paramId} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BlogCommentMain;