import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/posts")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <article className="m-4 flex w-4/5 flex-col items-center gap-4">
          {blogs.map((blog, index) => (
            <div key={blog.id} className="flex w-3/5 mb-4">
              <img
                className="mt-3 h-56 w-56 rounded-lg object-cover"
                src={blog.image}
                alt={blog.id}
              />
              <section className="ml-4 w-full">
                <div className="flex flex-wrap gap-3">
                  {blog.tags.slice(0, 2).map((tag, index) => (
                    <a
                      key={index}
                      className="mt-3 h-6 w-auto rounded-full bg-slate-200 px-2 text-sm font-medium text-slate-400"
                    >
                      {tag}
                    </a>
                  ))}
                  {blog.tags.length > 3 ? (
                    <a
                      key={index}
                      className="mt-3 h-6 w-auto rounded bg-slate-200 px-2 text-sm font-medium text-slate-400"
                    >
                      ...
                    </a>
                  ) : (
                    ""
                  )}
                </div>
                <Link to={`/posts/details/${blog.id}`}>
                  <h1 className="text-sm font-semibold mt-2 md:text-xl">
                    {blog.title}
                  </h1>
                </Link>
                <div className="gap-2">
                  <h3 className="w-4/5 text-xs italic text-gray-500">
                    Created at {blog.createdAtString}
                  </h3>
                  {/* <div className="mt-4 text-pretty text-base">
                    {blog.content
                      ? blog.content.length > 200
                        ? parse(blog.content.substr(0, 200).concat("... "))
                        : parse(blog.content)
                      : null}
                  </div> */}
                </div>
                <Link to={`/users/details/${blog.user.id}`}>
                  <span className="flex gap-3 place-items-start mt-4">
                    <img
                      className="h-11 w-11 rounded-full"
                      src={blog.user.image}
                      alt="user_avatar"
                    />
                    <h3 className="font-semibold mt-3">{blog.user.fullName}</h3>
                  </span>
                </Link>
              </section>
            </div>
          ))}
        </article>
      )}
    </>
  );
};

export default Home;
