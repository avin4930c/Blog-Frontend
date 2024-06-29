import { useState, useEffect } from "react";
import BlogDetailPage from "../components/blogDetailPage";
import LoadingComponent from "../components/loadingComponent";
import NavBar from "../components/navbar";
import { useParams } from "react-router-dom";

function DetailPage() {
    const { id } = useParams();
    const [blogData, setBlogData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/blog/${id}`, {
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
    }, [])

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <>
            <NavBar />
            <BlogDetailPage data={blogData} paramId={id} />
        </>
    )
}

export default DetailPage