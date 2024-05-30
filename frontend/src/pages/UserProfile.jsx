import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import parse from 'html-react-parser';

const AuthorProfile = () => {
  const [user, setUser] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    Promise.all([
      axios.get(`${import.meta.env.VITE_BACKEND_API}/users/details/${id}`),
      axios.get(`${import.meta.env.VITE_BACKEND_API}/users/posts/${id}`),
    ])
      .then(([detailsResponse, postsResponse]) => {
        setUser(detailsResponse.data);

        setUserPosts(postsResponse.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          key={user.id}
          className="container flex flex-col place-items-center mt-5 w-3/4"
        >
          <div className="user-header flex w-full flex-col items-center text-center">
            <img
              className="w-60 rounded-full"
              src={user.image}
              alt="user_avatar"
            />
            <article>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <h4 className="text-sm text-gray-500">Email: {user.email}</h4>
              <small className="text-xs italic text-gray-400">
                Đã tham gia từ {user.createdAt}
              </small>
              <p>{user.bio}</p>
              <ul className="social mt-2 flex items-center justify-center gap-10">
                <li>
                  <a href="">
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a href="">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="">
                    <FaLinkedin />
                  </a>
                </li>
              </ul>
            </article>
          </div>
          <div className="user-body flex flex-col place-items-center">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="mt-4 flex h-40 w-9/12 gap-4 rounded-lg"
              >
                <img className="m-2 h-36 w-36 object-cover" src={post.image} alt="" />
                <span>
                  <Link to={`/posts/details/${post.id}`}>
                    <h3 className="text-2xl font-semibold">{post.title}</h3>
                  </Link>
                  <h2 className="text-xs italic text-gray-500">
                    Create at {post.createdAtString}
                  </h2>
                  <div>
                    {post.content
                      ? post.content.length > 250
                        ? parse(post.content.substr(0, 250).concat("... "))
                        : parse(post.content)
                      : null}
                  </div>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthorProfile;
