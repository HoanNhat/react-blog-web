import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import parse from "html-react-parser";

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
          className="container flex w-3/4 flex-col place-items-center text-justify"
        >
          <h1 className="mt-2 text-center text-3xl font-bold">{blog.title}</h1>
          <div className="mt-4 flex flex-row flex-wrap place-content-center gap-3">
            <a className="h-6 w-auto bg-gray-300 px-2 rounded">{blog.tags}</a>
          </div>
          <h3 className="my-2 text-center text-sm text-gray-500">
            Created at {blog.createdAtString} by{" "}
            <strong>
              <em>{blog.user?.fullName || "Unknown"}</em>
            </strong>{" "}
            <br />
            Last updated {blog.updatedAtString}
          </h3>
          <img className="h-80" src={blog.image} alt="post_image" />
          <div className="w-3/4 mt-2">
            {blog.content ? parse(blog.content) : null}
          </div>
        </div>
      )}
      <div className="flex w-3/5 flex-col my-8 rounded-lg">
        <h3 className="text-xl font-bold">Bình luận</h3>
        <span className="rounded-lg py-4 flex place-items-start gap-3  even:bg-slate-100">
          <a
            className="pl-6 pt-1 hover:cursor-pointer"
            href="/users/details/65bbbc5ba574c00b4528e600"
          >
            <img
              className="h-10 w-10 rounded-full"
              src="https://cdn.analyticsvidhya.com/wp-content/uploads/2023/08/Magic-AI-.png"
              alt="user_avatar"
            />
          </a>
          <section className="w-96">
            <section className="grid grid-flow-row justify-start">         
              <h3 className="text-sm font-semibold w-fit">Lý Hà</h3>
              <h2 className="text-xs font-light">19:10:23 20/05/2024</h2>
            </section>
            <p className="text-sm">Amazing! Good job</p>
          </section>
        </span>
      </div>
    </>
  );
};

export default ShowBlog;
