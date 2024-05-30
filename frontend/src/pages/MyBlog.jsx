import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const MyBlog = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [chooseModal, setChooseModal] = useState("");
  const [chooseBlog, setChooseBlog] = useState(null);
  const [modalDisplay, setModalDisplay] = useState([
    {
      title: "",
      content: ""
    }
  ]);

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(sessionStorage.getItem("user"));

    axios
      .get(`http://localhost:8080/users/posts/${user.id}`)
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [chooseModal]);

  const handleConfirmModal = async () => {
    setShowModal(false);
    if (chooseModal === "delete") {
      try {
        await axios.delete(`http://localhost:8080/posts/${chooseBlog}`);
        setLoading(false);
      } catch (error) {
        console.error("Error deleting post:", error);
        setLoading(false);
      } finally {    
        setChooseModal("");
      }
    } 
    else if (chooseModal === "update") {
      navigate("post/details/edit-blog", {
        state: { chooseBlog }
      })
    }
    else {
      setChooseBlog(null);
      setChooseModal("");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdate = (id) => {
    setModalDisplay({title: "Are you want to update", content: "After updated your blog will change and cannot be redo"})
    setShowModal(true);
    setChooseModal("update");
    setChooseBlog(id);
  };

  const handleDelete = (id) => {
    setModalDisplay({title: "Are you want to delete", content: "Once you delete this blog is they gone forever"})
    setShowModal(true);
    setChooseModal("delete");
    setChooseBlog(id);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-row flex-wrap place-content-evenly gap-5 w-3/5">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="flex h-auto w-72 flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <img
                className="w-80 h-52 rounded-t-lg object-cover"
                src={blog.image}
                alt=""
              />
              <h5 className="h-24 text-center mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog.title}
              </h5>
              <div className="flex flex-row justify-between m-2">
                <button
                  onClick={() => handleUpdate(blog.id)}
                  className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-800"
                >
                  Delete
                </button>
                <button className="inline-flex items-center rounded-lg bg-slate-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-slate-800">
                  <Link to={`/posts/details/${blog.id}`}>View details</Link>
                </button>
              </div>
              <Modal
                title={modalDisplay.title}
                content={modalDisplay.content}
                showModal={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmModal}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyBlog;
