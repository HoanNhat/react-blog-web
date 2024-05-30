import React, { useContext } from "react";
import { UserContext } from "../Context";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className="fixed pt-16 left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-auto overflow-y-auto bg-white px-3 py-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={"/user/notifications"}
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">
                  Notification
                </span>
                <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">Friends</span>
              </a>
            </li>
            <li>
              <Link
                to={`/users/posts/new-blog`}
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 32 32"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m25.9586964 2.84798668 2.8284271 2.82842713c.7810486.78104858.7810486 2.04737854 0 2.82842712l-16.732367 16.73236707c-.4554.4553999-1.0140285.7941045-1.628395.9873196l-6.19049386 1.9468775c-.31610681.0994139-.65295291-.0762504-.75236683-.3923572-.03814987-.1213053-.03677286-.2515946.00393232-.3720665l2.20922707-6.5384738c.19700958-.5830736.52591015-1.112822.96110414-1.548016l16.47250496-16.47250492c.7810486-.78104858 2.0473785-.78104858 2.8284271 0zm-15.7628336 15.76221352-2.1238849 2.124505c-.17407759.1740776-.31414129.3784126-.41363812.6024503l-.06691395.1715577-1.32644251 3.9275114 3.5613621-1.1195704c.24574658-.077286.47365708-.2011287.67157378-.3641567l.1426237-.1295031 2.3833199-2.3847942zm10.25-10.24999995-8.836 8.83499995 2.828 2.829 8.836-8.836zm4.09862-4.098-2.68462 2.683 2.829 2.829 2.6840472-2.68357288z"
                  />
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">
                  Write blog
                </span>
              </Link>
            </li>
            <li className={`${user ? "block" : "hidden"}`}>
              <Link to={`/users/details/${user ? user.id : null}`} className="group flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <img
                  className="h-7 w-7 rounded"
                  src={user ? user.image : null}
                  alt="user_avatar"
                />
                <h3 className="ms-3 flex-1 whitespace-nowrap">
                  {user ? user.fullName : ""}
                </h3>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className={`${user ? "flex" : "hidden"} justify-center rounded-lg w-full p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}>             
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
