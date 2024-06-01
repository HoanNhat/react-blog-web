import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import parse from "html-react-parser";
import DateTimeFormat from "../libs/DateTimeFormat";
import { FaRegPaperPlane } from "react-icons/fa";
import { UserContext } from "../Context";

const ShowBlog = () => {
  const [blog, setBlog] = useState({});
  const [inputComment, setInputComment] = useState("")
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const handleInputCommentChange = (e) => {
    const { value } = e.target;
    setInputComment(value);
  }

  const handleSubmitComment = (e) => {
    setLoading(true);
    const commentsOfUserData = {
      content: inputComment,
      postId: blog.id
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/comments?userCommentId=${user.id}`, commentsOfUserData, )
      .then((response) => {
        const newComment = response.data;
        setInputComment("");

        setComments((prevComments) => [...prevComments, newComment]);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
      
  }

  useEffect(() => {
    setLoading(true);

    Promise.all([
      axios.get(`${import.meta.env.VITE_BACKEND_API}/posts/details/${id}`),
      axios.get(`${import.meta.env.VITE_BACKEND_API}/comments/${id}`),
    ])
      .then(([postsResponse, commentsResponse]) => {
        setBlog(postsResponse.data);

        setComments(commentsResponse.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // axios
    //   .get(`${import.meta.env.VITE_BACKEND_API}/posts/details/${id}`)
    //   .then((response) => {
    //     setBlog(response.data);
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
        <h3 className="text-xl font-bold">{comments.length} bình luận</h3>
        <div className="mt-4 grid grid-flow-col grid-cols-8 items-center justify-items-center">
          <label
            htmlFor="title"
            className="col-span-1 pr-2 w-fit text-xl font-semibold text-gray-900 dark:text-white"
          >
            Bình luận
          </label>
          <input
            name="title"
            id="title"
            className="col-span-6 font-medium mt-2 bg-gray-50 w-full border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleInputCommentChange}
            value={inputComment}
          />
          <button className="col-span-1 pl-2 pt-2" onClick={handleSubmitComment}>
            <FaRegPaperPlane size={28}/>
          </button>
          
        </div>
        {comments.map((comment, index) => (
          <span
            key={index}
            className="rounded-lg py-4 flex place-items-start gap-3  even:bg-slate-100"
          >
            <a
              className="pl-6 pt-1 hover:cursor-pointer"
              href="/users/details/65bbbc5ba574c00b4528e600"
            >
              <img
                className="h-10 w-10 rounded-full"
                src={comment.userComment.image}
                alt="user_avatar"
              />
            </a>
            <section className="w-96">
              <section className="grid grid-flow-row justify-start">
                <h3 className="text-sm font-semibold w-fit">
                  {comment.userComment.fullName}
                </h3>
                <h2 className="text-xs font-light">
                  {DateTimeFormat(comment.createdAt)}
                </h2>
              </section>
              <p className="text-sm">{comment.content}</p>
            </section>
          </span>
        ))}
      </div>
    </>
  );
};

export default ShowBlog;
