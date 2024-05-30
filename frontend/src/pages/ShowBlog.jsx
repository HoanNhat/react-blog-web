import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import parse from 'html-react-parser';

const ShowBlog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/posts/details/${id}`)
      .then((response) => {
        setBlog(response.data); 
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          key={blog.id}
          className="container flex flex-col place-items-center text-justify w-3/4"
        >
          <h1 className="mt-2 text-center text-3xl font-bold">{blog.title}</h1>
          <div className="mt-4 flex flex-row flex-wrap place-content-center gap-3">
            {blog.tags && Array.isArray(blog.tags) ? (
              blog.tags.map((tag, index) => (
                <a key={index} className="h-6 w-auto bg-gray-300 px-2 rounded">
                  {tag}
                </a>
              ))
            ) : (
              <a key={0} className="h-6 w-auto bg-gray-300 px-2 rounded">
                Unspecified
              </a>
            )}
          </div>
          <h3 className="my-2 text-center text-sm text-gray-500">
            Created at {blog.createdAtString} by {blog.user?.fullName || 'Unknown'} <br />
            Last updated {blog.updatedAtString}
          </h3>
          <img className="h-80" src={blog.image} alt="post_image" />
          <div className="w-3/4 mt-2">
            {blog.content ? parse(blog.content) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default ShowBlog;
