import { Link } from "react-router-dom";
import dateFormatter from "./dateFormatter";

function BlogCard({ data }) {
    const formattedDate = dateFormatter({ inputDate: data.time_stamp })
    const finalDesc = data.desc.slice(0, 100) + "...";

    return (
        <Link to={`/blog/${data._id}`} className="transition transform hover:scale-105 duration-300">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
                <div className="h-44 overflow-hidden">
                    <img className="w-auto" src={data.imgUrl} alt={data.title} />
                </div>
                <div className="flex flex-col flex-grow p-6">
                    <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">{data.category}</div>
                    <h1 className="text-xl font-bold text-gray-800 mb-3">{data.title}</h1>
                    <p className="text-gray-600 mb-4 text-sm flex-grow">{finalDesc}</p>
                    <div className="flex justify-between items-center text-gray-500 text-xs mt-auto">
                        <span>{data.time_read} min read</span>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BlogCard;