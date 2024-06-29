import { useEffect, useState } from "react";
import BlogCard from "./blogCard";

function TopicPageMain() {
    const [topic, setTopic] = useState('Tech');
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/blog/topic`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        topic: topic,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setBlogData(data);
                }
                else {
                    console.error('Error fetching data');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        }
        fetchData();
    }, [topic]);

    return (
        <section className="py-10 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Topics</h1>
                    <p className="text-gray-600">Select a topic to explore relevant blogs.</p>
                    <div className="mt-4">
                        <select
                            id="category"
                            onChange={(e) => setTopic(e.target.value)}
                            value={topic}
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="Tech">Tech</option>
                            <option value="Food">Food</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Cars">Cars</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {blogData.map((blog) => (
                        <BlogCard key={blog._id} data={blog} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TopicPageMain;