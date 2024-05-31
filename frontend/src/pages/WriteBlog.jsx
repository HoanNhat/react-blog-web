import React, { useState, useContext, useEffect } from "react";
import TextEditor from "../components/TextEditor";
import { UserContext } from "../Context";
import { storage, getImage } from "../Firebase.jsx";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const WriteBlog = ({ pageTitle, buttonTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { chooseBlog } = location.state || {};
  const { user } = useContext(UserContext);

  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Uncategorized");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUploadURL, setImageUploadURL] = useState("");

  const listTag = [
    "Uncategorized",
    "Technology",
    "Coding",
    "Web",
    "Database",
    "DevOps",
    "Security",
    "AI",
    "Mobile",
    "Network",
    "News",
    "Internet"
  ];

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTitle(value);
    setBlog((prevBlog) => ({
      ...prevBlog,
      title: value,
    }));
  };

  useEffect(() => {
    if (!chooseBlog) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/posts/details/${chooseBlog}`)
      .then((response) => {
        setBlog(response.data);
        setTitle(blog.title);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chooseBlog]);

  useEffect(() => {
    if (imageUpload) {
      const imageName = "blog-cover-" + imageUpload.name;
      const imageRef = ref(storage, `image/blog-cover/${imageName}`);

      uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          alert("Image uploaded");
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setImageUploadURL(url);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image: ", error);
        });
    }
  }, [imageUpload]);

  const uploadImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file == null) {
      console.log("No image upload");
    } else {
      setImageUpload(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chooseBlog) {
      const updatedBlog = {
        ...blog,
        userId: blog.user.id,
        content: content ? content : blog.content,
        title: title ? title : blog.title,
        updatedAt: new Date(),
      };
      console.log("updated blog", updatedBlog);

      axios
        .put(`${import.meta.env.VITE_BACKEND_API}/posts`, updatedBlog)
        .then((response) => {
          navigate("/my-blog");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const newBlog = {
        content,
        title,
        tags: tag,
        userIdString: user.id,
        image: imageUploadURL,
      };
      console.log(newBlog);

      axios
        .post(`${import.meta.env.VITE_BACKEND_API}/posts`, newBlog)
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <section className="w-1/2">
      <h1 className="font-bold text-4xl">{pageTitle}</h1>
      <div className="mt-4">
        <label
          htmlFor="title"
          className="mb-2 text-xl font-semibold text-gray-900 dark:text-white"
        >
          Blog title
        </label>
        <input
          name="title"
          id="title"
          className="font-medium mt-2 bg-gray-50 w-full border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={chooseBlog ? blog.title : title}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="category"
          className="mb-2 text-xl font-semibold text-gray-900 dark:text-white"
        >
          Category
        </label>
        {/* <input
          name="category"
          id="category"
          type=""
          className="mt-2 bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={chooseBlog ? blog.tags : tags}
        /> */}
        <select 
          onChange={handleTagChange}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {listTag.map((tag, index) => (
            <option key={index} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          Select blog cover image
        </h3>
        <div className="flex items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload image</span>
              </p>
            </div>
            {/* <img className="h-96" src={imageUploadURL}/> */}
            <input
              id="dropzone-file"
              type="file"
              accept=".png, .jpg, .jpeg"
              className="hidden"
              onChange={uploadImage}
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col min-h-96">
        <TextEditor
          initialContent={blog.content}
          name="content"
          id="content"
          onChange={handleEditorChange}
          className="w-full h-full" // Ensure the TextEditor takes full width and height
          h="h-full"
        />
        <button
          onClick={handleSubmit}
          type="button"
          className="w-32 mt-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
        >
          {buttonTitle}
        </button>
      </div>
    </section>
  );
};

export default WriteBlog;
