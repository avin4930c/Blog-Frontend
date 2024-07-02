import { useState, useEffect } from "react";
import BlogCard from "./blogCard";
import LoadingComponent from "./loadingComponent";
import React from "react";

function BlogMain() {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/published`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setBlogData(data);
                } else {
                    console.error("Error fetching data");
                }
            } catch (error) {
                console.error("Network error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="container mx-auto px-4 min-h-[80vh]">
            <h1 className="text-4xl text-center py-6 font-bold text-gray-800 tracking-wide">Published Blogs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {blogData.map((blog) => (
                    <BlogCard key={blog._id} data={blog} />
                ))}
            </div>
        </div>
    );
}

export default BlogMain;