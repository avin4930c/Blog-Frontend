import dateFormatter from "./dateFormatter";

function BlogComment({ data, paramId }) {
    console.log(data)
    const formattedDate = dateFormatter({ inputDate: data.time_stamp, options: "time" });

    return (
        <div id="blog-comments" className="flex bg-gray-100 p-4 rounded-lg">
            <div className="w-16 h-16 mr-4">
                <img
                    className="w-full h-full object-cover rounded-full"
                    src={data.user_id?.imgUrl ? data.user_id.imgUrl : "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}
                    alt="User Avatar"
                />
            </div>
            <div className="w-full">
                <h3 className="text-lg font-semibold">
                    <span className={data.blog_id === paramId ? "text-blue-600" : "text-gray-900"}>
                        {data.user_id?.first_name} {data.user_id?.last_name}
                    </span>
                    {data.user_id?._id === data.blog_id?.user_id  &&  <span className="text-xs text-red-500 ml-1">- Author</span>}
                </h3>
                <p className="mt-1 text-gray-700">{data.commentText}</p>
                <p className="mt-2 text-sm text-gray-500">Posted on {formattedDate}</p>
            </div>
        </div>
    );
}

export default BlogComment;