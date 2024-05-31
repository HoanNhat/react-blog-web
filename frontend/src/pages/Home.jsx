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
      .get(`${import.meta.env.VITE_BACKEND_API}/posts`)
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleClickLike = (id) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_API}/posts/likes/${id}`)
      .then((response) => {
        setBlogs(blogs.map(blog => 
          blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
        ));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mx-auto w-2/3 p-5 sm:p-10 md:p-16">
          <div className="mb-5 flex justify-between border-b text-sm">
            <div className="flex items-center border-b-2 border-indigo-600 pb-2 pr-2 uppercase text-indigo-600">
              <svg
                className="mr-3 h-6"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 455.005 455.005"
                xmlSpace="preserve"
              >
                <g>
                  <path d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z"></path>
                  <path d="M353.664,232.676c2.492,0,4.928-1.241,6.354-3.504c2.207-3.505,1.155-8.136-2.35-10.343l-173.3-109.126 c-3.506-2.207-8.136-1.154-10.343,2.35c-2.207,3.505-1.155,8.136,2.35,10.343l173.3,109.126 C350.916,232.303,352.298,232.676,353.664,232.676z"></path>
                  <path d="M323.68,252.58c2.497,0,4.938-1.246,6.361-3.517c2.201-3.509,1.14-8.138-2.37-10.338L254.46,192.82 c-3.511-2.202-8.139-1.139-10.338,2.37c-2.201,3.51-1.14,8.138,2.37,10.338l73.211,45.905 C320.941,252.21,322.318,252.58,323.68,252.58z"></path>
                  <path d="M223.903,212.559c-3.513-2.194-8.14-1.124-10.334,2.39c-2.194,3.514-1.124,8.14,2.39,10.334l73.773,46.062 c1.236,0.771,2.608,1.139,3.965,1.139c2.501,0,4.947-1.251,6.369-3.529c2.194-3.514,1.124-8.14-2.39-10.334L223.903,212.559z"></path>
                  <path d="M145.209,129.33l-62.33,39.254c-2.187,1.377-3.511,3.783-3.503,6.368s1.345,4.983,3.54,6.348l74.335,46.219 c1.213,0.754,2.586,1.131,3.96,1.131c1.417,0,2.833-0.401,4.071-1.201l16.556-10.7c3.479-2.249,4.476-6.891,2.228-10.37 c-2.248-3.479-6.891-4.475-10.37-2.228l-12.562,8.119l-60.119-37.38l48.2-30.355l59.244,37.147l-6.907,4.464 c-3.479,2.249-4.476,6.891-2.228,10.37c2.249,3.479,6.894,4.476,10.37,2.228l16.8-10.859c2.153-1.392,3.446-3.787,3.429-6.351 c-0.018-2.563-1.344-4.94-3.516-6.302l-73.218-45.909C150.749,127.792,147.647,127.795,145.209,129.33z"></path>
                  <path d="M270.089,288.846c2.187-3.518,1.109-8.142-2.409-10.329l-74.337-46.221c-3.518-2.188-8.143-1.109-10.329,2.409 c-2.187,3.518-1.109,8.142,2.409,10.329l74.337,46.221c1.232,0.767,2.601,1.132,3.953,1.132 C266.219,292.387,268.669,291.131,270.089,288.846z"></path>
                  <path d="M53.527,192.864c-2.187,3.518-1.109,8.142,2.409,10.329l183.478,114.081c1.232,0.767,2.601,1.132,3.953,1.132 c2.506,0,4.956-1.256,6.376-3.541c2.187-3.518,1.109-8.142-2.409-10.329L63.856,190.455 C60.338,188.266,55.714,189.346,53.527,192.864z"></path>
                </g>
              </svg>
              <a href="#" className="inline-block font-semibold">
                New BLog
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded shadow-lg"
              >
                <div className="relative">
                  <img
                    className="h-60 w-full object-cover"
                    src={blog.image}
                    alt="blog-image"
                  />
                  <div className="absolute right-0 top-0 mr-3 mt-3 rounded-full border bg-violet-300 px-4 py-2 text-xs font-bold transition duration-500 ease-in-out hover:text-indigo-600 hover:cursor-pointer">
                    {blog.tags}
                  </div>
                </div>
                <div className="mb-auto px-6 pt-4">
                  <Link
                    to={`/posts/details/${blog.id}`}
                    className="mb-2 inline-block text-lg font-medium transition duration-500 ease-in-out hover:text-indigo-600"
                  >
                    {blog.title}
                  </Link>
                  {/* <article className="text-sm text-gray-500">
                    {blog.content
                      ? blog.content.length > 20
                        ? parse(blog.content.substr(0, 50).concat("... "))
                        : blog.content
                      : null
                    }
                  </article> */}
                </div>
                <Link
                  to={`/users/details/${blog.user.id}`}
                  className="mb-2 px-6 hover:cursor-pointer"
                >
                  <span className="mt-4 flex place-items-start gap-3">
                    <img
                      className="h-11 w-11 rounded-full"
                      src={blog.user.image}
                      alt="user_avatar"
                    />
                    <h3 className="mt-3 font-semibold">{blog.user.fullName}</h3>
                  </span>
                </Link>
                <div className="flex flex-row items-center justify-between bg-gray-100 px-6 py-3">
                  <span
                    href="#"
                    className="font-regular mr-1 flex flex-row items-center py-1 text-xs text-gray-900"
                  >
                    <svg
                      height="13px"
                      width="13px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                        </g>
                      </g>
                    </svg>
                    <span className="ml-1">{blog.createdAtString}</span>
                  </span>

                  <span className="flex h-8 items-center gap-1 rounded-md px-3 py-1.5 text-center text-sm hover:scale-105 hover:cursor-pointer hover:text-red-600 lg:gap-2">
                    <button onClick={() => handleClickLike(blog.id)}>
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-2 -2 24 24"
                        strokeWidth="1.8"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          xmlns="http://www.w3.org/2000/svg"
                          d="M 9.5 17.09375 C 5.042969 12.710938 0.792969 8.941406 0.792969 5.691406 C 0.792969 2.691406 3.21875 1.582031 4.972656 1.582031 C 6.011719 1.582031 8.257812 1.980469 9.5 5.113281 C 10.757812 1.96875 13.035156 1.589844 14.03125 1.589844 C 16.042969 1.589844 18.207031 2.875 18.207031 5.691406 C 18.207031 8.914062 14.140625 12.519531 9.5 17.09375 M 14.03125 0.800781 C 12.289062 0.800781 10.511719 1.625 9.5 3.363281 C 8.484375 1.617188 6.710938 0.792969 4.972656 0.792969 C 2.453125 0.792969 0 2.523438 0 5.691406 C 0 9.382812 4.410156 13.15625 9.5 18.207031 C 14.589844 13.15625 19 9.382812 19 5.691406 C 19 2.515625 16.550781 0.800781 14.03125 0.800781"
                        />

                        {/* <path
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        ></path> */}
                      </svg>
                    </button>

                    <span>{blog.likes}</span>
                  </span>

                  <span
                    href="#"
                    className="font-regular mr-1 flex flex-row items-center py-1 text-xs text-gray-900 hover:scale-105 hover:cursor-pointer hover:text-blue-600"
                  >
                    <svg
                      className="h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      ></path>
                    </svg>
                    <span className="ml-1">39</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
