import React from "react";
import DOMPurify from "dompurify";
import dateFormatter from "./dateFormatter";
import BlogCommentMain from "./blogCommentMain";

const BlogDetailPage = ({ data, paramId }) => {
  const formattedDate = dateFormatter({ inputDate: data.time_stamp });
  const sanitizedContent = DOMPurify.sanitize(data.content);

  return (
    <section className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {data.title}
        </h1>
        <div className="text-center text-gray-600 mb-4">
          <span className="font-semibold">{data.category}</span> -{" "}
          {data.time_read} min read - {formattedDate}
        </div>
        <div className="text-center text-gray-700 font-medium mb-4">
          Author: {data.user_id?.first_name}
        </div>
        <div className="mb-6">
          <img
            className="xl:max-h-[400px] sm:max-h-[300px] object-contain"
            src={data.imgUrl}
            alt={data.title}
          />
        </div>
        <div id="blog-content" className="mx-auto">
          {/* Render sanitized HTML content */}
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
        <BlogCommentMain paramId={paramId} />
      </div>
    </section>
  );
};

export default BlogDetailPage;